'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { PanelProps, PanelHeaderProps, PanelContentProps, PanelFooterProps } from './panel.types'
import { PanelContext } from './panel.context'
import styles from './Panel.module.css'

const PanelRoot = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ spacing = 'md', variant = 'default', className, children, ...props }, ref) => {
    const [isStacked, setIsStacked] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const container = containerRef.current || (ref && 'current' in ref ? ref.current : null)
      if (!container) return

      // Initial check
      const checkViewport = () => {
        setIsStacked(window.innerWidth < 768)
      }

      checkViewport()

      // Setup ResizeObserver to detect viewport changes
      const observer = new ResizeObserver(() => {
        checkViewport()
      })

      observer.observe(document.documentElement)

      // Also listen to window resize as fallback
      window.addEventListener('resize', checkViewport)

      return () => {
        observer.disconnect()
        window.removeEventListener('resize', checkViewport)
      }
    }, [ref])

    const contextValue = useMemo(
      () => ({
        spacing,
        isStacked,
        variant,
      }),
      [spacing, isStacked, variant]
    )

    const spacingClass =
      {
        none: styles.spacingNone,
        sm: styles.spacingSm,
        md: styles.spacingMd,
        lg: styles.spacingLg,
      }[spacing] || styles.spacingMd

    const variantClass = variant === 'compact' ? styles.compact : ''
    const stackedClass = isStacked ? styles.stacked : ''

    const panelRef = ref && 'current' in ref ? ref : containerRef

    return (
      <div
        ref={panelRef}
        className={`${styles.panel} ${spacingClass} ${variantClass} ${stackedClass} ${className || ''}`}
        data-spacing={spacing}
        data-variant={variant}
        data-stacked={isStacked}
        {...props}
      >
        <PanelContext.Provider value={contextValue}>{children}</PanelContext.Provider>
      </div>
    )
  }
)

PanelRoot.displayName = 'Panel'

const PanelHeader = React.forwardRef<HTMLElement, PanelHeaderProps>(
  ({ sticky = true, className, ...props }, ref) => {
    const stickyClass = sticky ? styles.sticky : ''

    return (
      <header ref={ref} className={`${styles.header} ${stickyClass} ${className || ''}`} {...props} />
    )
  }
)

PanelHeader.displayName = 'Panel.Header'

const PanelContent = React.forwardRef<HTMLDivElement, PanelContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} role="main" className={`${styles.content} ${className || ''}`} {...props} />
  }
)

PanelContent.displayName = 'Panel.Content'

const PanelFooter = React.forwardRef<HTMLElement, PanelFooterProps>(
  ({ fixed = false, className, ...props }, ref) => {
    const fixedClass = fixed ? styles.fixed : ''

    return (
      <footer ref={ref} className={`${styles.footer} ${fixedClass} ${className || ''}`} {...props} />
    )
  }
)

PanelFooter.displayName = 'Panel.Footer'

export const Panel = Object.assign(PanelRoot, {
  Header: PanelHeader,
  Content: PanelContent,
  Footer: PanelFooter,
})

export { PanelContext }
export type { PanelContextValue } from './panel.types'
