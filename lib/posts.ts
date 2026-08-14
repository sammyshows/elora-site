import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function computeReadingTime(md: string): string {
  const words = md.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const fileContents = fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        readingTime: computeReadingTime(fileContents),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: computeReadingTime(fileContents),
    contentHtml: marked.parse(content) as string,
  };
}
