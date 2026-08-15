import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/components/SiteHeader';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Elora`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://elora.day/blog/${post.slug}`,
      type: 'article',
      images: [{ url: '/og.jpeg', width: 1200, height: 630 }],
    },
  };
}

const markdownStyles = `
  .markdown-body { color: var(--foreground); }
  .markdown-body h2 { font-size: 24px; font-weight: 600; margin: 32px 0 12px; color: var(--foreground); }
  .markdown-body h3 { font-size: 20px; font-weight: 600; margin: 24px 0 8px; color: var(--foreground); }
  .markdown-body p { margin: 0 0 16px; }
  .markdown-body ul, .markdown-body ol { margin: 0 0 16px; padding-left: 24px; }
  .markdown-body li { margin-bottom: 8px; }
  .markdown-body strong { color: var(--foreground); }
  .markdown-body a { color: #007bff; text-decoration: none; }
  .markdown-body table { width: 100%; border-collapse: collapse; margin: 0 0 16px; font-size: 15px; }
  .markdown-body th { text-align: left; padding: 8px 10px; border-bottom: 2px solid var(--border); }
  .markdown-body td { padding: 8px 10px; border-bottom: 1px solid var(--border); }
`;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.tags, 3);

  const blogPosting = {
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": `https://elora.day/blog/${post.slug}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": { "@id": "https://elora.day/#founder" },
    "publisher": { "@id": "https://elora.day/#org" },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://elora.day/blog/${post.slug}`
    },
    "articleSection": post.tags.join(", "),
    "keywords": post.tags.join(", "),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#post-answer"]
    },
    "wordCount": post.contentHtml.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length
  };

  const graph: Record<string, unknown>[] = [blogPosting];

  graph.push({
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://elora.day" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://elora.day/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://elora.day/blog/${post.slug}` }
    ]
  });

  if (post.faqs && post.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "mainEntity": post.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    });
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <style dangerouslySetInnerHTML={{ __html: markdownStyles }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <Link href="/blog" className="text-sm text-primary hover:underline">
          &#8592; All articles
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-text mt-4 mb-3 leading-tight">
          {post.title}
        </h1>
        <div className="text-sm text-muted mb-8">
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          {' · '}
          {post.readingTime}
        </div>
        <div className="markdown-body">
          <div id="post-answer" />
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>

        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t-2 border-border">
            <h3 className="text-lg font-semibold text-text mb-4">
              Related articles
            </h3>
            <div className="space-y-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="block rounded-2xl border border-border bg-surface p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="font-semibold text-text mb-1">{r.title}</div>
                  <div className="text-sm text-secondary-text">{r.description}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}