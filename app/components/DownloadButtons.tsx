import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface DownloadButtonsProps {
  layout?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  className?: string;
}

export default function DownloadButtons({
  layout = 'horizontal',
  showLabels = false,
  className = '',
}: DownloadButtonsProps) {
  const appStoreUrl = 'https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.elora.ai';

  const containerClass = layout === 'horizontal'
    ? 'flex flex-row gap-3 sm:gap-4 items-center justify-center md:justify-start flex-wrap'
    : 'flex flex-col gap-3 items-center md:items-start';

  return (
    <div className={`${containerClass} ${className}`}>
      {showLabels && (
        <p className="w-full text-sm text-secondary-text text-center md:text-left mb-1">
          Download now:
        </p>
      )}
      <motion.a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        <Image
          src="/app-store-badge.svg"
          alt="Download on the App Store"
          width={120}
          height={40}
          className="h-auto w-auto"
          priority
          unoptimized
        />
      </motion.a>
      <motion.a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        <Image
          src="/play-store-badge.svg"
          alt="Get it on Google Play"
          width={135}
          height={40}
          className="w-auto"
          priority
          unoptimized
        />
      </motion.a>
    </div>
  );
}
