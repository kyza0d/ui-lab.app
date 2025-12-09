"use client";

import React, { useState, useCallback, createContext, useContext } from "react";
import { CommandPalette } from "ui-lab-components";
import { useCommandPalette } from "@/hooks/use-command-palette";

interface CommandPaletteContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(
  undefined
);

export const CommandPaletteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { commands } = useCommandPalette();

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      <CommandPalette
        open={isOpen}
        onOpenChange={handleOpenChange}
        commands={commands}
        placeholder="Search commands, components, or pages..."
        emptyStateMessage="No commands found."
        showCategories={true}
        closeOnExecute={true}
        enableSmartSearch={true}
      />
    </CommandPaletteContext.Provider>
  );
};

export const useCommandPaletteControl = () => {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      "useCommandPaletteControl must be used within CommandPaletteProvider"
    );
  }
  return context;
};
