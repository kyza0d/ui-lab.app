import React from 'react'

export type PanelSpacing = 'none' | 'sm' | 'md' | 'lg'
export type PanelVariant = 'default' | 'compact'

export interface PanelContextValue {
  spacing: PanelSpacing
  isStacked: boolean
  variant: PanelVariant
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: PanelSpacing
  variant?: PanelVariant
  children: React.ReactNode
}

export interface PanelHeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean
}

export interface PanelContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface PanelFooterProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean
}
