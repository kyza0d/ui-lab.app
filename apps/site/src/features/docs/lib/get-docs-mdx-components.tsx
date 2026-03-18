import Image from 'next/image';
import Link from 'next/link';
import { Info } from 'lucide-react';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { Code } from '../components/code-display/code';
import { highlightCode } from './shiki-server';

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

function MdxAnchor({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const className = 'trigger inline-flex items-end gap-1 text-foreground-200 underline decoration-background-500 underline-offset-4 transition-colors hover:text-foreground-50';

  if (!href) {
    return <span className={className}>{children}</span>;
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
    </a>
  );
}

function MdxDivider() {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className="my-4 h-0.5 w-full shrink-0"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, var(--background-700) 0 8px, transparent 8px 12px)',
      }}
    />
  );
}

function MdxBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="banner mt-12 mb-4 flex gap-3 rounded-sm border border-background-700 bg-background-900/70 p-4">
      <div className="icon pt-0.5 text-foreground-300">
        <Info className="h-4 w-4" />
      </div>
      <div className="content flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function MdxBannerTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="title text-sm font-medium text-foreground-100">{children}</h3>;
}

function MdxBannerBody({ children }: { children: React.ReactNode }) {
  return <div className="body font-medium text-foreground-300">{children}</div>;
}

function createBaseMdxComponents() {
  return {
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
    p: ({ children }: any) => <p className="my-4">{children}</p>,
    a: ({ children, href }: any) => <MdxAnchor href={href}>{children}</MdxAnchor>,
    pre: async ({ children }: any) => {
      if (typeof children === 'object' && children !== null && 'props' in children) {
        const code = children.props?.children as string || '';
        const language = children.props?.className?.replace('language-', '') || 'text';
        const highlighted = await highlightCode(code, language);

        return (
          <Code
            className="mb-4"
            language={language}
            preHighlightedLight={highlighted.light}
            preHighlightedDark={highlighted.dark}
          >
            {code}
          </Code>
        );
      }

      return <pre className="bg-background-900 rounded-sm">{children}</pre>;
    },
    code: ({ children, className }: any) => {
      const isInline = !className;

      return isInline ? (
        <code className="bg-background-800 text-xs px-2 py-1 rounded-sm font-mono text-foreground-200">
          {children}
        </code>
      ) : (
        <code className={className}>{children}</code>
      );
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
    li: ({ children }: any) => <li className="ml-4">{children}</li>,
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
      <tr className="border-background-800 not-last:border-b">{children}</tr>
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
    hr: MdxDivider,
    Code,
    Banner: Object.assign(MdxBanner, { Title: MdxBannerTitle, Body: MdxBannerBody }),
    Divider: MdxDivider,
  };
}

export async function getDocsMdxComponents(source: string) {
  const components = createBaseMdxComponents() as Record<string, any>;

  if (source.includes('<CodeWithPackageManager')) {
    const { CodeWithPackageManager } = await import('../components/code-display/code-with-package-manager');
    components.CodeWithPackageManager = CodeWithPackageManager;
  }

  if (source.includes('<InstallationFlow')) {
    const { InstallationFlow } = await import('../components/code-display/installation-flow');
    components.InstallationFlow = InstallationFlow;
  }

  if (source.includes('<Timeline')) {
    const timelineModule = await import('../components/timeline');
    components.Timeline = timelineModule.default;
  }

  if (source.includes('<ColorPaletteGrid')) {
    const colorPaletteGridModule = await import('@/features/theme/components/color-palette-grid');
    components.ColorPaletteGrid = colorPaletteGridModule.default;
  }

  if (source.includes('<MermaidDiagram')) {
    const { MermaidDiagramWrapper } = await import('../components/mdx/mermaid-diagram-wrapper');
    components.MermaidDiagram = MermaidDiagramWrapper;
  }

  if (source.includes('<Icon')) {
    const [iconModule, lucideIcons] = await Promise.all([
      import('@/shared/components/Icon'),
      import('lucide-react'),
    ]);

    components.Icon = ({ name, ...props }: any) => {
      const IconComponent = (lucideIcons as any)[name];
      if (!IconComponent) return null;
      return <iconModule.default IconComponent={IconComponent} {...props} />;
    };
  }

  return components;
}
