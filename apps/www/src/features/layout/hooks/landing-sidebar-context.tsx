'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LandingSidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const LandingSidebarContext = createContext<LandingSidebarContextType | undefined>(undefined);

export function LandingSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <LandingSidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
      {children}
    </LandingSidebarContext.Provider>
  );
}

export function useLandingSidebarToggle() {
  const context = useContext(LandingSidebarContext);
  if (context === undefined) {
    throw new Error('useLandingSidebarToggle must be used within LandingSidebarProvider');
  }
  return context;
}
