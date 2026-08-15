import { getAllPosts } from '@/lib/posts';

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET() {
  const posts = getAllPosts();
  const items = posts.map((p) => {
    const link = `https://elora.day/blog/${p.slug}`;
    return `<item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>samrmccarthy6@gmail.com (Samuel McCarthy)</author>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Elora Blog</title>
  <link>https://elora.day/blog</link>
  <description>Guides and answers about AI journaling, voice journaling, and privacy.</description>
  <language>en-us</language>
  <atom:link href="https://elora.day/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}