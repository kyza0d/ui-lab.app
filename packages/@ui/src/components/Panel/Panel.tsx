'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  PanelProps,
  PanelHeaderProps,
  PanelContentProps,
  PanelFooterProps,
  PanelSidebarProps,
  PanelToggleProps,
  PanelGroupProps,
  PanelResizeProps,
  PanelGroupContextValue,
} from './panel.types'
import { PanelContext, PanelGroupContext } from './panel.context'
import styles from './Panel.module.css'

/** Flexible multi-panel layout with header, content, footer, and sidebar */
const PanelRoot = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ spacing = 'md', variant = 'default', className, children, ...props }, ref) => {
    const [isStacked, setIsStacked] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)
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
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen((prev) => !prev),
      }),
      [spacing, isStacked, variant, sidebarOpen]
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

/** Top bar of the panel, typically for a title and actions */
const PanelHeader = React.forwardRef<HTMLElement, PanelHeaderProps>(
  ({ sticky = true, className, ...props }, ref) => {
    const stickyClass = sticky ? styles.sticky : ''

    return (
      <header ref={ref} className={`${styles.header} ${stickyClass} ${className || ''}`} {...props} />
    )
  }
)

PanelHeader.displayName = 'Panel.Header'

/** Main scrollable body area of the panel */
const PanelContent = React.forwardRef<HTMLDivElement, PanelContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} role="main" className={`${styles.content} ${className || ''}`} {...props} />
  }
)

PanelContent.displayName = 'Panel.Content'

/** Bottom bar of the panel, typically for controls or status */
const PanelFooter = React.forwardRef<HTMLElement, PanelFooterProps>(
  ({ fixed = false, className, ...props }, ref) => {
    const fixedClass = fixed ? styles.fixed : ''

    return (
      <footer ref={ref} className={`${styles.footer} ${fixedClass} ${className || ''}`} {...props} />
    )
  }
)

PanelFooter.displayName = 'Panel.Footer'

/** Collapsible side panel that slides in from left or right */
const PanelSidebar = React.forwardRef<HTMLElement, PanelSidebarProps>(
  ({ side = 'left', defaultOpen = true, width = '240px', collapsedWidth = '0', className, ...props }, ref) => {
    const { sidebarOpen } = usePanelContext()
    const isOpen = defaultOpen && sidebarOpen

    const sidebarStyle: React.CSSProperties = {
      width: isOpen ? width : collapsedWidth,
      transition: 'width 0.2s ease',
      overflow: 'hidden',
      flexShrink: 0,
      [side === 'right' ? 'marginLeft' : 'marginRight']: 'auto',
    }

    return (
      <aside
        ref={ref}
        className={`${styles['sidebar']} ${className || ''}`}
        data-open={isOpen}
        data-side={side}
        style={sidebarStyle}
        {...props}
      />
    )
  }
)

PanelSidebar.displayName = 'Panel.Sidebar'

/** Button that shows/hides the Panel.Sidebar */
const PanelToggle = React.forwardRef<HTMLDivElement, PanelToggleProps>(
  ({ children, ...props }, ref) => {
    const { toggleSidebar } = usePanelContext()

    const handleClick = () => {
      toggleSidebar()
    }

    const clonedChild = React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        handleClick()
        ;(children as any).props?.onClick?.(e)
      },
    })

    return (
      <div ref={ref} className={styles['toggle']} {...props}>
        {clonedChild}
      </div>
    )
  }
)

PanelToggle.displayName = 'Panel.Toggle'

/** Container that manages side-by-side resizable panel columns */
const PanelGroup = React.forwardRef<HTMLDivElement, PanelGroupProps>(
  ({ direction = 'horizontal', className, children, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [sizes, setSizes] = useState<number[]>([])
    const resizeIndexRef = useRef(0)

    // Extract panel children (skip Resize handles)
    const panelChildren = React.Children.toArray(children).filter(
      (child) =>
        React.isValidElement(child) &&
        child.type !== PanelResize &&
        (child.props as any).children !== undefined
    )

    const panelCount = panelChildren.length

    useEffect(() => {
      // Initialize sizes as equal percentages
      if (panelCount > 0) {
        setSizes(Array(panelCount).fill(100 / panelCount))
      }
    }, [panelCount])

    const handleSetSize = useCallback(
      (resizeIndex: number, delta: number) => {
        setSizes((prev) => {
          if (prev.length === 0) return prev
          const newSizes = [...prev]
          const containerSize =
            direction === 'horizontal'
              ? containerRef.current?.clientWidth || 1
              : containerRef.current?.clientHeight || 1

          const deltaPercent = (delta / containerSize) * 100
          const minSize = 10

          if (resizeIndex + 1 < newSizes.length) {
            // For paired panels: maintain total, apply min/max constraints
            const totalSize = newSizes[resizeIndex] + newSizes[resizeIndex + 1]
            const maxSize = totalSize - minSize

            let newSizeA = Math.max(minSize, Math.min(maxSize, newSizes[resizeIndex] + deltaPercent))
            let newSizeB = totalSize - newSizeA

            newSizes[resizeIndex] = newSizeA
            newSizes[resizeIndex + 1] = Math.max(minSize, newSizeB)
          } else {
            // Single panel, just apply min constraint
            newSizes[resizeIndex] = Math.max(minSize, newSizes[resizeIndex] + deltaPercent)
          }

          return newSizes
        })
      },
      [direction]
    )

    const contextValue = useMemo(
      () => ({
        sizes,
        setSize: handleSetSize,
        direction,
        containerRef: containerRef as React.RefObject<HTMLDivElement>,
      }),
      [sizes, direction, handleSetSize]
    )

    const groupRef = ref && 'current' in ref ? ref : containerRef

    // Render children, injecting sizes into panels and tracking resize indices
    let panelIndex = 0
    let resizeIndex = 0
    const renderedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child

      if (child.type === PanelResize) {
        const currentResizeIndex = resizeIndex
        resizeIndex++
        return React.cloneElement(child as React.ReactElement<any>, {
          'data-resize-index': currentResizeIndex,
        })
      }

      if (child.type !== PanelResize && (child.props as any).children !== undefined) {
        const currentPanelIndex = panelIndex
        const size = sizes[currentPanelIndex] ?? 100 / panelCount
        panelIndex++

        const style: React.CSSProperties = {
          ...((child.props as any).style || {}),
          flex: `0 0 ${size}%`,
          overflow: 'hidden',
        }

        return React.cloneElement(child as React.ReactElement<any>, {
          style,
        })
      }

      return child
    })

    return (
      <div
        ref={groupRef}
        className={`${styles['group']} ${className || ''}`}
        data-direction={direction}
        {...props}
      >
        <PanelGroupContext.Provider value={contextValue}>{renderedChildren}</PanelGroupContext.Provider>
      </div>
    )
  }
)

PanelGroup.displayName = 'Panel.Group'

/** Drag handle between Panel.Group columns for resizing */
const PanelResize = React.forwardRef<HTMLDivElement, PanelResizeProps & { 'data-resize-index'?: number }>(
  ({ className, 'data-resize-index': resizeIndexProp, ...props }, ref) => {
    const { direction, setSize } = usePanelGroupContext()
    const [isDragging, setIsDragging] = useState(false)
    const startPosRef = useRef(0)
    const resizeIndexRef = useRef(resizeIndexProp ?? 0)

    // Update index if it changes
    useEffect(() => {
      resizeIndexRef.current = resizeIndexProp ?? 0
    }, [resizeIndexProp])

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentPos = direction === 'horizontal' ? moveEvent.clientX : moveEvent.clientY
        const delta = currentPos - startPosRef.current
        setSize(resizeIndexRef.current, delta)
        startPosRef.current = currentPos
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return (
      <div
        ref={ref}
        className={`${styles['resize']} ${className || ''}`}
        data-resizing={isDragging}
        data-direction={direction}
        onMouseDown={handleMouseDown}
        {...props}
      />
    )
  }
)

PanelResize.displayName = 'Panel.Resize'

// Helper function for internal use
function usePanelContext() {
  const context = React.useContext(PanelContext)
  if (!context) {
    throw new Error('usePanelContext must be used within a Panel component')
  }
  return context
}

function usePanelGroupContext() {
  const context = React.useContext(PanelGroupContext)
  if (!context) {
    throw new Error('usePanelGroupContext must be used within a Panel.Group component')
  }
  return context
}

export const Panel = Object.assign(PanelRoot, {
  Header: PanelHeader,
  Content: PanelContent,
  Footer: PanelFooter,
  Sidebar: PanelSidebar,
  Toggle: PanelToggle,
  Group: PanelGroup,
  Resize: PanelResize,
})

export {
  PanelRoot,
  PanelHeader,
  PanelContent,
  PanelFooter,
  PanelSidebar,
  PanelToggle,
  PanelGroup,
  PanelResize,
  PanelContext,
  PanelGroupContext,
}
export type { PanelContextValue } from './panel.types'
