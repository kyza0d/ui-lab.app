import React from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { CodeBlockWithPackageManager } from '@/components/CodeBlockWithPackageManager'
import { InstallationFlow } from '@/components/InstallationFlow'
import { MarkdownTable } from '@/components/MarkdownTable'
import { ColorSwatch } from '@/components/ColorSwatch'
import { ColorScale } from '@/components/ColorScale'
import { ColorPaletteGrid } from '@/components/ColorPaletteGrid'
import { Timeline } from '@/components/Timeline'
import Image from 'next/image'

export const mdxComponents = {
  h1: ({ children, id }: any) => (
    <h1 id={id} className="text-5xl font-bold my-8 scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ children, id }: any) => (
    <h2 id={id} className="text-3xl font-semibold my-6 scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children, id }: any) => (
    <h3 id={id} className="text-2xl font-medium my-4 scroll-mt-20">
      {children}
    </h3>
  ),
  h4: ({ children, id }: any) => (
    <h4 id={id} className="text-xl font-medium my-3 scroll-mt-20">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-base leading-7 my-4 text-foreground-300">
      {children}
    </p>
  ),
  a: ({ children, href }: any) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
    >
      {children}
    </a>
  ),
  pre: ({ children }: any) => {
    if (typeof children === 'object' && children !== null && 'props' in children) {
      const code = children.props?.children as string || ''
      const language = children.props?.className?.replace('language-', '') || 'text'
      return (
        <CodeBlock language={language}>
          {code}
        </CodeBlock>
      )
    }
    return <pre className="bg-background-900 p-4 rounded overflow-x-auto">{children}</pre>
  },
  code: ({ children, className }: any) => {
    const isInline = !className
    return isInline ? (
      <code className="bg-background-800 px-2 py-1 rounded font-mono text-sm text-foreground-200">
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
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-background-700">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="border border-background-700 bg-background-800 px-4 py-2 text-left font-bold text-foreground-100">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-background-700 px-4 py-2 text-foreground-300">
      {children}
    </td>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-foreground-400">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-8 border-t border-background-700" />
  ),

  CodeBlock,
  CodeBlockWithPackageManager,
  InstallationFlow,
  MarkdownTable,
  ColorSwatch,
  ColorScale,
  ColorPaletteGrid,
  Timeline,
}
