import React from 'react'

export type PanelSpacing = 'none' | 'sm' | 'md' | 'lg'
export type PanelVariant = 'default' | 'compact'
export type PanelSide = 'left' | 'right'

export interface PanelContextValue {
  spacing: PanelSpacing
  isStacked: boolean
  variant: PanelVariant
  sidebarOpen: boolean
  toggleSidebar: () => void
}

export interface PanelGroupContextValue {
  sizes: number[]
  setSize: (index: number, delta: number) => void
  direction: 'horizontal' | 'vertical'
  containerRef: React.RefObject<HTMLDivElement | null>
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls the internal spacing between panel sections */
  spacing?: PanelSpacing
  /** Controls the visual density of the panel */
  variant?: PanelVariant
  children: React.ReactNode
}

export interface PanelHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the header sticks to the top while scrolling */
  sticky?: boolean
}

export interface PanelContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface PanelFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the footer is fixed to the bottom of the panel */
  fixed?: boolean
}

export interface PanelSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Which side of the panel the sidebar appears on */
  side?: PanelSide
  /** Whether the sidebar is open on initial render */
  defaultOpen?: boolean
  /** Width of the sidebar when open */
  width?: string | number
  /** Width of the sidebar when collapsed */
  collapsedWidth?: string | number
}

export interface PanelToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Button element that triggers sidebar open/close */
  children: React.ReactElement
}

export interface PanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls the axis panels are arranged along */
  direction?: 'horizontal' | 'vertical'
  children: React.ReactNode
}

export interface PanelResizeProps extends React.HTMLAttributes<HTMLDivElement> {}
