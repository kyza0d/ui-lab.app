import { Code, CodeWithPackageManager, InstallationFlow } from '../components/code-display/index'
import Image from 'next/image'
import Timeline from '../components/timeline'
import MarkdownTable from '../components/markdown-table'
import ColorPaletteGrid from '@/features/theme/components/color-palette-grid'
import { Banner, BannerTitle, BannerBody } from '../components/mdx/client-banner'
import { Anchor, AnchorPreview, AnchorUnderline } from '../components/mdx/client-anchor'
import { Divider } from '../components/mdx/client-divider'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
}

export const mdxComponents = {
  h1: ({ children, id }: any) => (
    <h1 id={id} className="font-bold my-8 scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ children, id }: any) => (
    <h2 id={id} className="my-6 scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children, id }: any) => (
    <h3 id={id} className="my-4 scroll-mt-20">
      {children}
    </h3>
  ),
  h4: ({ children, id }: any) => (
    <h4 id={id} className="my-3 scroll-mt-20">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-md my-4">
      {children}
    </p>
  ),
  a: ({ children, href }: any) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:underline"
    >
      {children}
    </a>
  ),
  pre: ({ children }: any) => {
    if (typeof children === 'object' && children !== null && 'props' in children) {
      const code = children.props?.children as string || ''
      const language = children.props?.className?.replace('language-', '') || 'text'
      return (
        <Code className='mb-4' language={language}>
          {code}
        </Code>
      )
    }
    return <pre className="bg-background-900 rounded-sm">{children}</pre>
  },
  code: ({ children, className }: any) => {
    const isInline = !className
    return isInline ? (
      <code className="bg-background-800 text-xs px-2 py-1 rounded-sm font-mono text-foreground-200">
        {children}
      </code>
    ) : (
      <code className={className}>{children}</code>
    )
  },
  img: (props: any) => (
    <Image
      {...props}
      width={800}
      height={600}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      alt={props.alt || ''}
    />
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside space-y-2 my-4 text-foreground-300">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside space-y-2 my-4 text-foreground-300">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="ml-4">
      {children}
    </li>
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6 border border-background-800 rounded-sm">
      <table className="w-full text-xs">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-background-900 border-b border-background-800">{children}</thead>
  ),
  tbody: ({ children }: any) => <tbody>{children}</tbody>,
  tr: ({ children }: any) => (
    <tr className="border-b border-background-800 last:border-b-0">{children}</tr>
  ),
  th: ({ children }: any) => (
    <th className="px-4 py-3 text-left font-semibold text-foreground-200">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 text-xs py-3 text-foreground-300">{children}</td>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-foreground-400">
      {children}
    </blockquote>
  ),
  hr: () => (
    <Divider variant="dashed" spacing="lg" />
  ),
  Code,
  CodeWithPackageManager,
  InstallationFlow,
  Timeline,
  MarkdownTable,
  ColorPaletteGrid,
  Anchor: Object.assign(Anchor, { Preview: AnchorPreview, Underline: AnchorUnderline }),
  Banner: Object.assign(Banner, { Title: BannerTitle, Body: BannerBody }),
  Divider,
}
