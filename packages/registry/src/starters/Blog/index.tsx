import React from 'react';
import { FaPen } from 'react-icons/fa6';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'blog-platform',
  name: 'Blog Platform Starter',
  description: 'Blogging platform template with markdown content, categories, and social sharing',
  category: 'documentation' as const,
  tags: ['blog', 'astro', 'markdown', 'content'],
  layout: {
    layoutClass: 'starter',
    columnSpan: 8,
    rowSpan: 8,
  },
  componentDependencies: [],
  fullPageLayout: true,
};

const starterMetadata: StarterMetadata = {
  ...baseMetadata,
  variants: [
    {
      name: 'Simple Blog',
      description: 'Minimal markdown-based blog with posts and archives',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "blog-starter",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}`,
          isEntryPoint: true,
        },
        {
          filename: 'astro.config.mjs',
          language: 'javascript',
          code: `import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yourblog.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});`,
          isEntryPoint: false,
        },
        {
          filename: 'tsconfig.json',
          language: 'json',
          code: `{
  "extends": "astro/tsconfigs/strict"
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/layouts/BlogLayout.astro',
          language: 'html',
          code: `---
interface Props {
  title: string;
  author: string;
  date: string;
  image?: string;
  description: string;
}

const { title, author, date, image, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Georgia, serif;
        line-height: 1.8;
        color: #333;
        background: #fafbfc;
      }
      header {
        background: white;
        padding: 4rem 2rem;
        border-bottom: 1px solid #e0e0e0;
      }
      header h1 {
        max-width: 800px;
        margin: 0 auto 1rem;
        font-size: 2.5rem;
      }
      .meta {
        max-width: 800px;
        margin: 0 auto;
        color: #666;
        font-size: 0.95rem;
      }
      .meta span {
        margin-right: 1rem;
      }
      main {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        background: white;
      }
      article h2 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }
      article p {
        margin-bottom: 1.5rem;
      }
      code {
        background: #f5f5f5;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
      }
      pre {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 6px;
        overflow-x: auto;
        margin: 1.5rem 0;
      }
      a {
        color: #0066cc;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>{title}</h1>
      <div class="meta">
        <span>By {author}</span>
        <span>{date}</span>
      </div>
    </header>
    <main>
      <article>
        <slot />
      </article>
    </main>
  </body>
</html>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/index.astro',
          language: 'html',
          code: `---
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My Blog</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 2rem;
      }
      .hero {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        color: white;
        margin-bottom: 3rem;
      }
      .hero h1 {
        font-size: 3rem;
        margin-bottom: 0.5rem;
      }
      .hero p {
        font-size: 1.2rem;
        opacity: 0.9;
      }
      .posts {
        max-width: 800px;
        margin: 0 auto;
        display: grid;
        gap: 1.5rem;
      }
      .post-card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s;
      }
      .post-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }
      .post-card h2 {
        margin-bottom: 0.5rem;
        color: #333;
      }
      .post-meta {
        color: #999;
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }
      .post-excerpt {
        color: #555;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <div class="hero">
      <h1>📝 My Blog</h1>
      <p>Thoughts, stories, and ideas</p>
    </div>

    <div class="posts">
      <a href="/blog/first-post" class="post-card">
        <h2>Getting Started with Astro</h2>
        <div class="post-meta">January 15, 2024 • 5 min read</div>
        <p class="post-excerpt">
          Discover how Astro can help you build faster websites with less JavaScript...
        </p>
      </a>

      <a href="/blog/second-post" class="post-card">
        <h2>Web Performance Tips</h2>
        <div class="post-meta">January 10, 2024 • 7 min read</div>
        <p class="post-excerpt">
          Learn practical techniques to improve your website's performance and user experience...
        </p>
      </a>
    </div>
  </body>
</html>`,
          isEntryPoint: true,
        },
        {
          filename: 'src/pages/blog/first-post.md',
          language: 'markdown',
          code: `---
layout: ../../layouts/BlogLayout.astro
title: "Getting Started with Astro"
author: "Your Name"
date: "January 15, 2024"
description: "Learn how to build your first Astro site"
---

## What is Astro?

Astro is a modern static site generator that enables you to build faster websites with less JavaScript.

## Key Features

- 🚀 Lightning-fast performance
- 🎯 Zero JavaScript by default
- 📝 Markdown support
- ⚡ Island architecture
- 🔧 Easy to customize

## Getting Started

To create your first Astro site, follow these steps:

1. Install Node.js
2. Run \`npm create astro@latest\`
3. Follow the interactive setup
4. Start building!

## Next Steps

Explore the [Astro documentation](https://docs.astro.build) to learn more.`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/blog/second-post.md',
          language: 'markdown',
          code: `---
layout: ../../layouts/BlogLayout.astro
title: "Web Performance Tips"
author: "Your Name"
date: "January 10, 2024"
description: "Practical tips to improve your website performance"
---

## Why Performance Matters

Website performance directly impacts user experience and SEO rankings.

## Essential Tips

### 1. Optimize Images

Use modern image formats like WebP and serve appropriately sized images.

### 2. Minimize JavaScript

Only load JavaScript where absolutely necessary. Static content should be truly static.

### 3. Implement Caching

Leverage browser caching and CDNs to serve content faster.

### 4. Measure Performance

Use tools like Lighthouse and WebPageTest to identify bottlenecks.

## Tools to Help

- Lighthouse for performance audits
- PageSpeed Insights for recommendations
- WebPageTest for detailed analysis

Remember: A faster website is a better website!`,
          isEntryPoint: false,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Simple Blog Starter

A minimal blogging platform built with Astro, featuring markdown content and static generation.

## Features

- 📝 Markdown-based content
- 🚀 Fast static generation
- 📱 Responsive design
- 🎨 Clean, elegant design
- 🔍 SEO optimized
- ⚡ Zero JavaScript overhead

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Adding Posts

Create new markdown files in \`src/pages/blog/\` with the following frontmatter:

\`\`\`yaml
---
layout: ../../layouts/BlogLayout.astro
title: "Your Post Title"
author: "Your Name"
date: "January 1, 2024"
description: "Post description"
---

Your content here...
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\``,
          isEntryPoint: false,
        },
      ],
    },
    {
      name: 'Full-Featured Blog',
      description: 'Advanced blog with categories, tags, search, and comment support',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "advanced-blog",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@astrojs/react": "^3.0.0",
    "typescript": "^5"
  }
}`,
          isEntryPoint: true,
        },
        {
          filename: 'astro.config.mjs',
          language: 'javascript',
          code: `import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://yourblog.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});`,
          isEntryPoint: false,
        },
        {
          filename: 'tsconfig.json',
          language: 'json',
          code: `{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsxImportSource": "react"
  }
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/layouts/BlogLayout.astro',
          language: 'html',
          code: `---
interface Props {
  title: string;
  author: string;
  date: string;
  image?: string;
  description: string;
  category: string;
  tags: string[];
}

const { title, author, date, category, tags, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Georgia, serif;
        line-height: 1.8;
        color: #333;
        background: #fafbfc;
      }
      header {
        background: white;
        padding: 3rem 2rem;
        border-bottom: 1px solid #e0e0e0;
      }
      .header-content {
        max-width: 800px;
        margin: 0 auto;
      }
      header h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      .meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.95rem;
        color: #666;
        flex-wrap: wrap;
      }
      .category-tag {
        background: #e8f0f7;
        color: #0066cc;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 600;
      }
      .tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .tag {
        background: #f0f0f0;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.85rem;
        color: #666;
      }
      main {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        background: white;
      }
      article h2 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }
      article p {
        margin-bottom: 1.5rem;
      }
      code {
        background: #f5f5f5;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
      }
      pre {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 6px;
        overflow-x: auto;
        margin: 1.5rem 0;
      }
    </style>
  </head>
  <body>
    <header>
      <div class="header-content">
        <h1>{title}</h1>
        <div class="meta">
          <span>By {author}</span>
          <span>{date}</span>
          <span class="category-tag">{category}</span>
        </div>
        {tags.length > 0 && (
          <div class="tags">
            {tags.map(tag => (
              <a href={\`/tags/\${tag}\`} class="tag">{tag}</a>
            ))}
          </div>
        )}
      </div>
    </header>
    <main>
      <article>
        <slot />
      </article>
    </main>
  </body>
</html>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/components/BlogSearch.tsx',
          language: 'typescript',
          code: `import { useState } from 'react';

interface Post {
  title: string;
  url: string;
  excerpt: string;
}

const SAMPLE_POSTS: Post[] = [
  { title: 'Getting Started', url: '/blog/first-post', excerpt: 'Learn the basics...' },
  { title: 'Advanced Topics', url: '/blog/second-post', excerpt: 'Deep dive into...' },
];

export default function BlogSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);

    if (q.length > 0) {
      const filtered = SAMPLE_POSTS.filter(post =>
        post.title.toLowerCase().includes(q.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <input
        type="search"
        placeholder="Search posts..."
        value={query}
        onChange={handleSearch}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />
      {results.length > 0 && (
        <ul style={{
          listStyle: 'none',
          padding: '0.5rem 0',
          marginTop: '0.5rem'
        }}>
          {results.map(post => (
            <li key={post.url}>
              <a href={post.url} style={{ color: '#0066cc', textDecoration: 'none' }}>
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/components/CommentSection.tsx',
          language: 'typescript',
          code: `import { useState } from 'react';

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author && text) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author,
        text,
        date: new Date().toLocaleDateString(),
      };
      setComments([...comments, newComment]);
      setAuthor('');
      setText('');
    }
  };

  return (
    <div style={{
      marginTop: '2rem',
      padding: '1.5rem',
      background: '#f9fafb',
      borderRadius: '6px'
    }}>
      <h3>Comments</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <textarea
          placeholder="Your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontFamily: 'inherit'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Post Comment
        </button>
      </form>

      <div>
        {comments.map(comment => (
          <div
            key={comment.id}
            style={{
              padding: '1rem',
              background: 'white',
              borderRadius: '4px',
              marginBottom: '0.75rem'
            }}
          >
            <strong>{comment.author}</strong>
            <span style={{ color: '#999', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
              {comment.date}
            </span>
            <p style={{ marginTop: '0.5rem' }}>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/index.astro',
          language: 'html',
          code: `---
import BlogSearch from '../components/BlogSearch';
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Advanced Blog</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
      }
      .hero {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        color: white;
        padding: 4rem 2rem 2rem;
      }
      .hero h1 { font-size: 3rem; margin-bottom: 0.5rem; }
      .hero p { font-size: 1.2rem; opacity: 0.9; }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }
      .search-wrapper {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <div class="hero">
      <h1>📚 Advanced Blog</h1>
      <p>Stories, insights, and conversations</p>
    </div>

    <div class="container">
      <div class="search-wrapper">
        <BlogSearch client:load />
      </div>
    </div>
  </body>
</html>`,
          isEntryPoint: true,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Full-Featured Blog Starter

A comprehensive blogging platform built with Astro and React.

## Features

- 📝 Markdown content with categories and tags
- 🔍 Post search functionality
- 💬 Comment system
- 🎨 Beautiful responsive design
- ⚡ Fast static generation
- 🏷️ Tag and category organization
- 🚀 Optimized performance

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Creating Posts

Create markdown files with frontmatter:

\`\`\`yaml
---
layout: ../../layouts/BlogLayout.astro
title: "Post Title"
author: "Author Name"
date: "January 1, 2024"
category: "Technology"
tags: ["astro", "blog", "tutorial"]
description: "Post description"
---

Content here...
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\``,
          isEntryPoint: false,
        },
      ],
    },
  ],
};

export function getPreview(): React.ReactNode {
  return (
    <div className="flex items-center justify-center gap-3 w-full h-full">
      <FaPen size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
