'use client'

import React, { useContext } from 'react'
import { PanelContextValue } from './panel.types'

export const PanelContext = React.createContext<PanelContextValue | undefined>(undefined)

export function usePanelContext() {
  const context = useContext(PanelContext)
  if (!context) {
    throw new Error('usePanelContext must be used within a Panel component')
  }
  return context
}
