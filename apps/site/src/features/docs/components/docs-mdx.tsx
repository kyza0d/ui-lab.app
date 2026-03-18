import { MDXRemote } from 'next-mdx-remote-client/rsc'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'

import { Code } from './code-display/code'
import { CodeWithPackageManager } from './code-display/code-with-package-manager'
import { InstallationFlow } from './code-display/installation-flow'
import Timeline from './timeline'
import ColorPaletteGrid from '@/features/theme/components/color-palette-grid'
import { Banner, BannerTitle, BannerBody } from './mdx/client-banner'
import { Anchor } from './mdx/client-anchor'
import { Divider } from './mdx/client-divider'
import { MermaidDiagramWrapper as MermaidDiagram } from './mdx/mermaid-diagram-wrapper'
import Icon from '@/shared/components/Icon'
import { highlightCode } from '../lib/shiki-server'
import rehypeSlug from 'rehype-slug'

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
}

const components = {
  h1: ({ children, id }: any) => <h1 id={id} className="font-bold my-8 scroll-mt-20">{children}</h1>,
  h2: ({ children, id }: any) => <h2 id={id} className="my-6 scroll-mt-20">{children}</h2>,
  h3: ({ children, id }: any) => <h3 id={id} className="my-4 scroll-mt-20">{children}</h3>,
  h4: ({ children, id }: any) => <h4 id={id} className="my-3 scroll-mt-20">{children}</h4>,
  p: ({ children }: any) => <p className="my-2">{children}</p>,
  a: ({ children, href }: any) => <Anchor href={href} target={href?.startsWith('http') ? '_blank' : '_self'}>{children}</Anchor>,
  ul: ({ children }: any) => <ul className="list-disc list-inside space-y-2 my-4 text-foreground-300">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 my-4 text-foreground-300">{children}</ol>,
  li: ({ children }: any) => <li className="ml-4">{children}</li>,
  hr: () => <Divider variant="dashed" size='sm' spacing="lg" />,
  thead: ({ children }: any) => <thead className="bg-background-900 border-b border-background-800">{children}</thead>,
  tbody: ({ children }: any) => <tbody>{children}</tbody>,
  tr: ({ children }: any) => <tr className="border-background-800 not-last:border-b">{children}</tr>,
  th: ({ children }: any) => <th className="px-4 py-3 text-left font-semibold text-foreground-200">{children}</th>,
  td: ({ children }: any) => <td className="px-4 text-xs py-3 text-foreground-300">{children}</td>,
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6 border border-background-800 rounded-sm">
      <table className="w-full text-xs">{children}</table>
    </div>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-2 border-background-500 pl-4 my-2 italic text-foreground-400">
      {children}
    </blockquote>
  ),
  Code,
  CodeWithPackageManager,
  InstallationFlow,
  Timeline,
  ColorPaletteGrid,
  Banner: Object.assign(Banner, { Title: BannerTitle, Body: BannerBody }),
  Divider,
  MermaidDiagram,
  pre: async ({ children }: any) => {
    if (typeof children === 'object' && children !== null && 'props' in children) {
      const code = children.props?.children as string || ''
      const language = children.props?.className?.replace('language-', '') || 'text'
      const highlighted = await highlightCode(code, language)
      return (
        <Code className='mb-4' language={language} preHighlightedLight={highlighted.light} preHighlightedDark={highlighted.dark}>
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
  Icon: ({ name, ...props }: any) => {
    const IconComponent = (LucideIcons as any)[name]
    if (!IconComponent) return null
    return <Icon IconComponent={IconComponent} {...props} />
  },
}

export async function DocsMDX({ source }: { source: string }) {
  'use cache'
  return <MDXRemote source={source} components={components} options={options} />
}
