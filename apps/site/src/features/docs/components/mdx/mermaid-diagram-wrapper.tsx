'use client'

import dynamic from 'next/dynamic'
import React from 'react'

export const MermaidDiagramWrapper = dynamic(
  () => import('./mermaid-diagram').then((mod) => mod.MermaidDiagram),
  {
    ssr: false,
    loading: () => <div className="h-64 animate-pulse bg-background-800 rounded-lg" />,
  }
)
