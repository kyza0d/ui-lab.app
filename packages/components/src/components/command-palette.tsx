"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { Command } from "cmdk";
import { cn } from "@/lib/utils";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Card } from "./card";
import { inputVariants } from "./input";
import { Badge } from "./badge";
import { Divider } from "./divider";

export interface Command {
  id: string;
  label: string;
  description?: string;
  category?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  keywords?: string[];
  action: () => void | Promise<void>;
}

export interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  commands?: Command[];
  onCommandExecute?: (command: Command) => void;
  placeholder?: string;
  emptyStateMessage?: string;
  showCategories?: boolean;
  closeOnExecute?: boolean;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  enableSmartSearch?: boolean;
}

/**
 * Command Palette component that provides keyboard-accessible command execution
 * with search, categories, and keyboard navigation.
 */
const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      open = false,
      onOpenChange,
      commands = [],
      onCommandExecute,
      placeholder = "Type a command or search...",
      emptyStateMessage = "No commands found.",
      showCategories = true,
      closeOnExecute = true,
      className,
      contentClassName,
      overlayClassName,
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(open);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const paletteRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Use combined refs
    React.useImperativeHandle(ref, () => paletteRef.current as HTMLDivElement);

    // Sync open prop with internal state and clear search when closing
    useEffect(() => {
      setIsOpen(open);
      if (!open) {
        setSearchQuery("");
      }
    }, [open]);

    /**
     * Handle mount to prevent hydration issues
     */
    useEffect(() => {
      setMounted(true);
    }, []);

    /**
     * Reset scroll position when search query changes
     */
    useEffect(() => {
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
    }, [searchQuery]);

    /**
     * Global keyboard shortcut listener (Cmd+K / Ctrl+K)
     */
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const isMac =
          navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
          navigator.userAgent.indexOf("Mac") !== -1;
        const isCommandKey = isMac ? event.metaKey : event.ctrlKey;

        if (isCommandKey && event.key === "k") {
          event.preventDefault();
          setIsOpen(true);
          onOpenChange?.(true);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [onOpenChange]);

    /**
     * Handle escape key to close palette
     */
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          setSearchQuery("");
          onOpenChange?.(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onOpenChange]);

    /**
     * Prevent body scroll when palette is open
     */
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "unset";
        };
      }
    }, [isOpen]);

    /**
     * Handle click outside to close palette
     */
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          paletteRef.current &&
          !paletteRef.current.contains(target)
        ) {
          setIsOpen(false);
          setSearchQuery("");
          onOpenChange?.(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [isOpen, onOpenChange]);

    /**
     * Handle command execution
     */
    const handleExecuteCommand = useCallback(
      async (command: Command) => {
        try {
          setLoading(true);
          onCommandExecute?.(command);
          await command.action();
          if (closeOnExecute) {
            setIsOpen(false);
            setSearchQuery("");
            onOpenChange?.(false);
          }
        } catch (error) {
          console.error(`Error executing command ${command.id}:`, error);
        } finally {
          setLoading(false);
        }
      },
      [closeOnExecute, onCommandExecute, onOpenChange]
    );

    /**
     * Calculate match score for better search relevance
     */
    const getMatchScore = useCallback((command: Command, searchQuery: string): number => {
      if (!searchQuery.trim()) return 0;

      const query = searchQuery.toLowerCase().trim();
      const label = command.label.toLowerCase();
      const description = (command.description || "").toLowerCase();
      const id = command.id.toLowerCase();

      let score = 0;

      // Exact match on label (highest priority)
      if (label === query) return 1000;

      // Label starts with query
      if (label.startsWith(query)) return 900;

      // Exact word match in label
      if (label.split(/\s+/).some((word: string) => word === query)) return 800;

      // Partial match in label (substring)
      const labelIndex = label.indexOf(query);
      if (labelIndex >= 0) {
        // Earlier matches are better
        score += 700 - labelIndex * 10;
      }

      // Exact word match in description
      if (description.split(/\s+/).some((word: string) => word === query)) score += 300;

      // Partial match in description
      if (description.includes(query)) score += 200;

      // Partial match in ID
      if (id.includes(query)) score += 100;

      return score;
    }, []);

    /**
     * Filter and sort commands based on search query with intelligent ranking
     */
    const filteredAndGroupedCommands = useMemo(() => {
      const query = searchQuery.toLowerCase().trim();

      if (!query) {
        // No search, return grouped by category
        const groups: Record<string, Command[]> = {};
        commands.forEach((cmd) => {
          const category = cmd.category || "Other";
          if (!groups[category]) {
            groups[category] = [];
          }
          groups[category].push(cmd);
        });
        return groups;
      }

      // Filter and rank commands
      const scored = commands
        .map((command) => {
          const label = command.label.toLowerCase();
          const description = (command.description || "").toLowerCase();
          const id = command.id.toLowerCase();
          let score = 0;

          // Exact match on label (highest priority - 1000)
          if (label === query) {
            score = 1000;
          }
          // Label starts with query (900)
          else if (label.startsWith(query)) {
            score = 900;
          }
          // Exact word match in label (800)
          else if (label.split(/\s+/).some((word: string) => word === query)) {
            score = 800;
          }
          // Partial match in label, earlier is better (700-710)
          else if (label.includes(query)) {
            const index = label.indexOf(query);
            score = 710 - Math.min(index, 10);
          }
          // Exact word match in description (300)
          else if (description.split(/\s+/).some((word: string) => word === query)) {
            score = 300;
          }
          // Partial match in description (200)
          else if (description.includes(query)) {
            score = 200;
          }
          // Partial match in ID (100)
          else if (id.includes(query)) {
            score = 100;
          }

          return { command, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ command }) => command);

      // Group the filtered/sorted commands
      const groups: Record<string, Command[]> = {};
      scored.forEach((cmd) => {
        const category = cmd.category || "Other";
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(cmd);
      });

      return groups;
    }, [commands, searchQuery]);

    /**
     * Close palette handler
     */
    const handleClose = useCallback(() => {
      setIsOpen(false);
      onOpenChange?.(false);
    }, [onOpenChange]);

    if (!mounted || !isOpen) {
      return null;
    }

    return createPortal(
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-start justify-center overflow-hidden pt-[20vh]",
          overlayClassName
        )}
        onClick={handleClose}
      >
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Command Palette content */}
        <Card
          ref={paletteRef}
          className={cn(
            "relative w-full mx-4 shadow-2xl max-w-xl animate-in fade-in zoom-in-95 duration-200",
            className
          )}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <Command
            label="Command Palette"
            shouldFilter={false}
            className={cn("overflow-hidden", contentClassName)}
          >
            {/* Search Input */}
            <div className="border-b border-background-700 p-2">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-500 flex items-center pointer-events-none">
                  <FaMagnifyingGlass className="w-4 h-4" />
                </div>
                <Command.Input
                  ref={inputRef}
                  placeholder={placeholder}
                  className={cn(
                    inputVariants({ size: "md", variant: "ghost" }),
                    "pl-10"
                  )}
                  autoFocus
                  onValueChange={setSearchQuery}
                />
              </div>
            </div>

            {/* Results List */}
            <Command.List ref={listRef} className="h-[44dvh] overflow-y-auto">
              {Object.keys(filteredAndGroupedCommands).length === 0 ? (
                <Command.Empty className="px-4 py-6 text-center text-sm text-foreground-500">
                  {emptyStateMessage}
                </Command.Empty>
              ) : null}

              {Object.entries(filteredAndGroupedCommands).map(([category, categoryCommands]) => (
                <Command.Group
                  key={category}
                  heading={category && showCategories ? category : undefined}
                  className="overflow-hidden px-2 py-3 [&_[cmdk-group-heading]]:text-md [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-foreground-300 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
                >
                  {showCategories && category && <Divider className="h-px mt-0 mb-1" />}
                  {categoryCommands.map((command) => (
                    <Command.Item
                      key={command.id}
                      value={`${command.id} ${command.label} ${command.description || ""}`}
                      onSelect={() => handleExecuteCommand(command)}
                      className="px-3 py-2.5 flex rounded-md items-center justify-between cursor-pointer hover:bg-background-800 transition-colors aria-selected:bg-background-700"
                      disabled={loading}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {command.icon && (
                          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-foreground-400">
                            {command.icon}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-foreground-50 font-medium truncate">
                            {command.label}
                          </div>
                          {command.description && (
                            <div className="text-foreground-500 text-sm truncate">
                              {command.description}
                            </div>
                          )}
                        </div>
                      </div>
                      {command.shortcut && (
                        <Badge size="sm" variant="default" className="ml-3 flex-shrink-0 font-mono">
                          {command.shortcut}
                        </Badge>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>

            {/* Footer hint */}
            {commands.length > 0 && (
              <div className="border-t border-background-700 px-1 py-2 flex items-center justify-start gap-2">
                <Badge variant="default"><span className="pr-2">↑↓</span>Navigate</Badge>
                <Badge variant="default"><span className="pr-2">↵</span> Select</Badge>
                <Badge className="ml-auto" variant="default"><span className="pr-2">Esc</span> Close</Badge>
              </div>
            )}
          </Command>
        </Card>
      </div>,
      document.body
    );
  }
);

CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
