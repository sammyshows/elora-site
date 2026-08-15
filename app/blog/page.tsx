import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: "Elora Blog — AI Journaling Guides & Answers",
  description: "Guides and answers about AI journaling, voice journaling, and privacy. Learn how AI journaling works, whether it is private, and how to get started.",
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/blog/rss.xml' },
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
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Elora Blog</h1>
        <p className="text-lg text-secondary-text mb-10">Guides and answers about AI journaling, voice journaling, and privacy.</p>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-border bg-surface p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <h2 className="text-lg font-semibold text-text mb-2">{post.title}</h2>
              <p className="text-sm text-secondary-text mb-3">{post.description}</p>
              <div className="text-xs text-muted">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {' · '}
                {post.readingTime}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}