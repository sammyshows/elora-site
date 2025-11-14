const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'public', 'screenshots');
const images = fs.readdirSync(screenshotsDir).filter(file => file.endsWith('.png'));

async function optimizeImages() {
  console.log('🖼️  Optimizing images...\n');

  for (const image of images) {
    const inputPath = path.join(screenshotsDir, image);
    const outputPath = path.join(screenshotsDir, image.replace('.png', '.webp'));

    const inputStats = fs.statSync(inputPath);
    const inputSizeKB = (inputStats.size / 1024).toFixed(2);

    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(2);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log(`✅ ${image}`);
    console.log(`   ${inputSizeKB}KB → ${outputSizeKB}KB (${savings}% smaller)\n`);
  }

  console.log('✨ All images optimized!');
}

optimizeImages().catch(console.error);
