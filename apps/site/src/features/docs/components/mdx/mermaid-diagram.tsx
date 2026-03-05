import { renderMermaidSVG } from 'beautiful-mermaid'

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const svg = renderMermaidSVG(chart, {
    bg: 'var(--background-950)',
    fg: 'var(--foreground-300)',
    line: 'var(--background-700)',
    accent: 'var(--background-500)',
    surface: 'var(--background-800)',
    border: 'var(--background-600)',
    muted: 'var(--foreground-100)',
    font: 'Karla',
    padding: 48,
  })

  return (
    <div
      className="my-8 overflow-x-auto rounded-lg [&>svg]:max-w-full [&>svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
