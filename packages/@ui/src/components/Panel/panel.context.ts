'use client'

import React, { useContext } from 'react'
import { PanelContextValue, PanelGroupContextValue } from './panel.types'

export const PanelContext = React.createContext<PanelContextValue | undefined>(undefined)
export const PanelGroupContext = React.createContext<PanelGroupContextValue | undefined>(undefined)

export function usePanelContext() {
  const context = useContext(PanelContext)
  if (!context) {
    throw new Error('usePanelContext must be used within a Panel component')
  }
  return context
}

export function usePanelGroupContext() {
  const context = useContext(PanelGroupContext)
  if (!context) {
    throw new Error('usePanelGroupContext must be used within a Panel.Group component')
  }
  return context
}
