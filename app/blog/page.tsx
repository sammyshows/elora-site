import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: "Elora Blog — AI Journaling Guides & Answers",
  description: "Guides and answers about AI journaling, voice journaling, and privacy. Learn how AI journaling works, whether it is private, and how to get started.",
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Elora Blog",
    "description": "Guides and answers about AI journaling, voice journaling, and privacy.",
    "url": "https://elora.day/blog",
    "publisher": { "@id": "https://elora.day/#org" },
    "blogPost": posts.map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "description": p.description,
      "url": `https://elora.day/blog/${p.slug}`,
      "datePublished": p.date,
      "author": { "@id": "https://elora.day/#founder" },
      "publisher": { "@id": "https://elora.day/#org" },
    })),
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: '1.6',
      color: 'var(--foreground)',
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <h1 style={{ fontSize: '36px', marginBottom: '8px', fontWeight: '700' }}>
        Elora Blog
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '40px' }}>
        Guides and answers about AI journaling, voice journaling, and privacy.
      </p>

      <div style={{ display: 'grid', gap: '20px' }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '24px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              {post.title}
            </h2>
            <p style={{ margin: '0 0 12px', color: 'var(--foreground)' }}>
              {post.description}
            </p>
            <div style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {post.readingTime}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}