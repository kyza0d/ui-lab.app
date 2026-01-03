"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { useDialog } from "@react-aria/dialog";
import { useSearchField } from "@react-aria/searchfield";
import { useSearchFieldState } from "@react-stately/searchfield";
import { FocusScope } from "@react-aria/focus";
import { filterDOMProps } from "@react-aria/utils";
import { cn } from "@/lib/utils";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Card } from "../Card";
import { Badge } from "../Badge";
import styles from "./CommandPalette.module.css";

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
 * Search ranking utility: Scores command relevance to query
 */
function scoreCommandRelevance(command: Command, query: string): number {
  const label = command.label.toLowerCase();
  const description = (command.description || "").toLowerCase();
  const id = command.id.toLowerCase();

  // Exact match on label (highest priority - 1000)
  if (label === query) {
    return 1000;
  }
  // Label starts with query (900)
  if (label.startsWith(query)) {
    return 900;
  }
  // Exact word match in label (800)
  if (label.split(/\s+/).some((word: string) => word === query)) {
    return 800;
  }
  // Partial match in label, earlier is better (700-710)
  if (label.includes(query)) {
    const index = label.indexOf(query);
    return 710 - Math.min(index, 10);
  }
  // Exact word match in description (300)
  if (description.split(/\s+/).some((word: string) => word === query)) {
    return 300;
  }
  // Partial match in description (200)
  if (description.includes(query)) {
    return 200;
  }
  // Partial match in ID (100)
  if (id.includes(query)) {
    return 100;
  }

  return 0;
}

/**
 * Search Field component using react-aria useSearchField
 */
function PaletteSearchInput({
  searchValue,
  onSearchChange,
  placeholder,
  inputRef,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const state = useSearchFieldState({
    value: searchValue,
    onChange: onSearchChange,
  });

  const { inputProps, clearButtonProps } = useSearchField(
    {
      "aria-label": "Search commands",
      value: state.value,
      onClear: () => {
        onSearchChange("");
      },
      placeholder,
    },
    state,
    inputRef,
  );

  // Handle input change directly to ensure filtering works
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      onSearchChange(value);
    },
    [onSearchChange],
  );

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-icon"]}>
        <FaMagnifyingGlass className="w-4 h-4" />
      </div>
      <input
        {...filterDOMProps(inputProps)}
        ref={inputRef}
        value={searchValue}
        onChange={handleInputChange}
        className={styles["search-input"]}
      />
      <button
        {...filterDOMProps(clearButtonProps)}
        aria-label="Clear search"
        className={styles["search-clear"]}
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Command List Item component
 */
function CommandListItemSimple({
  command,
  isSelected,
  onSelect,
}: {
  command: Command;
  isSelected: boolean;
  onSelect: (command: Command) => void;
}) {
  return (
    <div
      onClick={() => onSelect(command)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSelect(command);
        }
      }}
      role="option"
      aria-selected={isSelected ? "true" : "false"}
      tabIndex={isSelected ? 0 : -1}
      className={cn("item", styles["item"])}
    >
      <div className={cn("item-content", styles["item-content"])}>
        {command.icon && (
          <div className={styles["item-icon"]}>{command.icon}</div>
        )}
        <div className={styles["item-labels"]}>
          <div className={styles["item-label"]}>{command.label}</div>
          {command.description && (
            <div className={styles["item-description"]}>
              {command.description}
            </div>
          )}
        </div>
      </div>
      {command.shortcut && (
        <Badge
          size="sm"
          variant="default"
          className="ml-3 flex-shrink-0 font-mono"
        >
          {command.shortcut}
        </Badge>
      )}
    </div>
  );
}

/**
 * Command List component - renders filtered commands
 */
function CommandList({
  commands,
  selectedIndex,
  onSelect,
  loading,
  emptyMessage,
}: {
  commands: Command[];
  selectedIndex: number;
  onSelect: (command: Command) => void;
  loading: boolean;
  emptyMessage: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.children;
      if (items[selectedIndex]) {
        (items[selectedIndex] as HTMLElement).scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div
      ref={listRef}
      className={cn("list", styles["list"])}
      role="listbox"
      aria-label="Commands"
    >
      {commands.length === 0 ? (
        <div className={styles["empty"]}>{emptyMessage}</div>
      ) : (
        commands.map((command, idx) => (
          <CommandListItemSimple
            key={command.id}
            command={command}
            isSelected={idx === selectedIndex}
            onSelect={onSelect}
          />
        ))
      )}
    </div>
  );
}

/**
 * Command Palette component that provides keyboard-accessible command execution
 * with search, categories, and keyboard navigation using react-aria hooks.
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
    ref,
  ) => {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal state management
    const overlayState = useOverlayTriggerState({
      isOpen: open,
      onOpenChange: (newOpen) => {
        if (!newOpen) {
          setSearchQuery("");
        }
        onOpenChange?.(newOpen);
      },
    });

    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const paletteRef = useRef<HTMLDivElement>(null);

    // Use combined refs
    React.useImperativeHandle(ref, () => paletteRef.current as HTMLDivElement);

    // Handle mount to prevent hydration issues
    useEffect(() => {
      setMounted(true);
    }, []);

    // Global keyboard shortcut listener (Cmd+K / Ctrl+K)
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const isMac =
          navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
          navigator.userAgent.indexOf("Mac") !== -1;
        const isCommandKey = isMac ? event.metaKey : event.ctrlKey;

        if (isCommandKey && event.key === "k") {
          event.preventDefault();
          overlayState.open();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [overlayState]);

    // Handle command execution
    const handleExecuteCommand = useCallback(
      async (command: Command) => {
        try {
          setLoading(true);
          onCommandExecute?.(command);
          await command.action();
          if (closeOnExecute) {
            overlayState.close();
          }
        } catch (error) {
          console.error(`Error executing command ${command.id}:`, error);
        } finally {
          setLoading(false);
        }
      },
      [closeOnExecute, onCommandExecute, overlayState],
    );

    // Filter and sort commands based on search query
    const filteredCommands = useMemo(() => {
      const query = searchQuery.toLowerCase().trim();

      if (!query) {
        return commands;
      }

      return commands
        .map((command) => ({
          command,
          score: scoreCommandRelevance(command, query),
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ command }) => command);
    }, [commands, searchQuery]);

    // Manage keyboard navigation state manually
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!overlayState.isOpen) return;

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            setSelectedIndex((prev) =>
              prev < filteredCommands.length - 1 ? prev + 1 : 0,
            );
            break;
          case "ArrowUp":
            event.preventDefault();
            setSelectedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredCommands.length - 1,
            );
            break;
          case "Enter":
            event.preventDefault();
            if (filteredCommands[selectedIndex]) {
              handleExecuteCommand(filteredCommands[selectedIndex]);
            }
            break;
          case "Escape":
            event.preventDefault();
            overlayState.close();
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [
      overlayState.isOpen,
      filteredCommands,
      selectedIndex,
      handleExecuteCommand,
      overlayState,
    ]);

    // Reset selection when search changes
    useEffect(() => {
      setSelectedIndex(0);
    }, [searchQuery]);

    // Auto-focus the search input when palette opens
    useEffect(() => {
      if (overlayState.isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [overlayState.isOpen]);

    // Dialog behavior for accessibility
    const { dialogProps } = useDialog(
      { "aria-label": "Command palette" },
      modalRef,
    );

    // Handle click outside to dismiss (without scroll locking)
    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        // Only close if clicking directly on the overlay, not on children
        if (e.target === e.currentTarget) {
          overlayState.close();
        }
      },
      [overlayState],
    );

    if (!mounted || !overlayState.isOpen) {
      return null;
    }

    return createPortal(
      <FocusScope contain restoreFocus>
        <div
          className={cn(styles["palette"], styles["overlay"], overlayClassName)}
          onClick={handleOverlayClick}
        >
          {/* Command Palette content */}
          <Card
            {...filterDOMProps(dialogProps)}
            ref={modalRef}
            className={cn("content", styles["content"], className)}
            role="dialog"
            aria-modal="true"
          >
            <Card.Header className={styles["search"]}>
              {/* Search Input */}
              <PaletteSearchInput
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder={placeholder}
                inputRef={inputRef}
              />
            </Card.Header>

            <div className={cn(styles["inner"], contentClassName)}>
              {/* Results List */}
              <CommandList
                commands={filteredCommands}
                selectedIndex={selectedIndex}
                onSelect={handleExecuteCommand}
                loading={loading}
                emptyMessage={emptyStateMessage}
              />
            </div>
            <Card.Footer className={styles["footer"]}>
              {/* Footer hint */}
              {commands.length > 0 && (
                <>
                  <Badge variant="default">
                    <span className="pr-2">↑↓</span>Navigate
                  </Badge>
                  <Badge variant="default">
                    <span className="pr-2">↵</span> Select
                  </Badge>
                  <Badge className="ml-auto" variant="default">
                    <span className="pr-2">Esc</span> Close
                  </Badge>
                </>
              )}
            </Card.Footer>
          </Card>
        </div>
      </FocusScope>,
      document.body,
    );
  },
);

CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
