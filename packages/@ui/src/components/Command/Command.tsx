"use client";

import * as React from "react"

import { createPortal } from "react-dom";

import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";

import { useOverlayTriggerState } from "@react-stately/overlays";

import { filterDOMProps } from "@react-aria/utils";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useScrollLock } from "../../hooks/useScrollLock";

import { Card } from "../Card";
import { Scroll } from "../Scroll";
import { Badge } from "../Badge";

import type { Key } from "react-aria";
import styles from "./Command.module.css";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  category?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  keywords?: string[];
  action: () => void | Promise<void>;
  hint?: string;
}

export interface CommandGroupedItems {
  category: string | undefined;
  items: CommandItem[];
}

interface CommandContextValue {
  isOpen: boolean;
  close: () => void;
  focusedKey: Key | null;
  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>;
  registerItem: (key: Key, textValue: string) => void;
  unregisterItem: (key: Key) => void;
  actionRef: React.MutableRefObject<Map<Key, () => void | Promise<void>>>;
  searchInputRef: React.MutableRefObject<HTMLInputElement | null>;
  scrollableRef: React.MutableRefObject<HTMLDivElement | null>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  filteredItems: CommandItem[];
  groupedItems: CommandGroupedItems[];
}

const CommandContext = React.createContext<CommandContextValue | undefined>(
  undefined,
);

function useCommandContext() {
  const ctx = React.useContext(CommandContext);
  if (!ctx) {
    throw new Error("Command sub-components must be used within Command");
  }
  return ctx;
}

function scoreCommandRelevance(
  text: string,
  query: string,
): number {
  const t = text.toLowerCase();
  const q = query.toLowerCase();

  if (t === q) return 1000;
  if (t.startsWith(q)) return 900;
  if (t.split(/\s+/).some((word) => word === q)) return 800;
  if (t.includes(q)) {
    const index = t.indexOf(q);
    return 710 - Math.min(index, 10);
  }
  return 0;
}

export interface CommandProps {
  /** Whether the command palette is open */
  open?: boolean;
  /** Called when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS class for the palette dialog */
  className?: string;
  /** Additional CSS class for the backdrop overlay */
  overlayClassName?: string;
  /** List of command items to display */
  items?: CommandItem[];
  /** Custom filter function for commands against the query */
  filter?: (command: CommandItem, query: string) => boolean;
  /** Child elements rendered inside the palette */
  children?: React.ReactNode;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  (
    { open = false, onOpenChange, className, overlayClassName, items = [], filter, children },
    ref,
  ) => {
    const [mounted, setMounted] = React.useState(false);
    const overlayState = useOverlayTriggerState({
      isOpen: open,
      onOpenChange,
    });

    const modalRef = React.useRef<HTMLDivElement>(null);
    const paletteRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const scrollableRef = React.useRef<HTMLDivElement>(null);

    useScrollLock(overlayState.isOpen, scrollableRef.current);
    const itemsRef = React.useRef<Map<Key, string>>(new Map());
    const actionRef = React.useRef<Map<Key, () => void | Promise<void>>>(
      new Map(),
    );
    const focusedKeyRef = React.useRef<Key | null>(null);

    const [focusedKey, setFocusedKey] = React.useState<Key | null>(null);
    const [itemCount, setItemCount] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState("");

    const filteredItems = items.filter((cmd) => !filter || filter(cmd, searchValue));

    const groupedItems = React.useMemo(() => {
      const groups = new Map<string | undefined, CommandItem[]>();
      filteredItems.forEach((cmd) => {
        const cat = cmd.category;
        if (!groups.has(cat)) {
          groups.set(cat, []);
        }
        groups.get(cat)!.push(cmd);
      });

      // Maintain category order from original items
      const categoryOrder = new Map<string | undefined, number>();
      let idx = 0;
      items.forEach((cmd) => {
        if (!categoryOrder.has(cmd.category)) {
          categoryOrder.set(cmd.category, idx++);
        }
      });

      return Array.from(groups.entries())
        .sort(
          ([a], [b]) =>
            (categoryOrder.get(a) ?? Infinity) - (categoryOrder.get(b) ?? Infinity),
        )
        .map(([category, items]) => ({ category, items }));
    }, [filteredItems, items]);

    React.useImperativeHandle(ref, () => paletteRef.current as HTMLDivElement);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Sync focusedKeyRef with focusedKey
    React.useEffect(() => {
      focusedKeyRef.current = focusedKey;
    }, [focusedKey]);

    // Auto-focus search input when opening
    React.useEffect(() => {
      if (overlayState.isOpen && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    }, [overlayState.isOpen]);

    // Cleanup state when overlay closes
    React.useEffect(() => {
      if (!overlayState.isOpen) {
        scrollableRef.current = null;
        setSearchValue("");
      }
    }, [overlayState.isOpen]);

    // Cmd+K global listener
    React.useEffect(() => {
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

    // Auto-focus first item when items change (filtering, opening)
    React.useEffect(() => {
      if (!overlayState.isOpen) return;

      if (!searchValue) {
        setFocusedKey(null);
        return;
      }

      const keys = Array.from(itemsRef.current.keys());
      if (keys.length > 0) {
        setFocusedKey(keys[0]);
      } else {
        setFocusedKey(null);
      }
    }, [itemCount, overlayState.isOpen, searchValue]);

    // Keyboard navigation
    React.useEffect(() => {
      if (!overlayState.isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowDown": {
            event.preventDefault();
            const keys = Array.from(itemsRef.current.keys());
            if (keys.length === 0) return;
            if (focusedKey === null) {
              setFocusedKey(keys[0]);
            } else {
              const idx = keys.indexOf(focusedKey);
              setFocusedKey(keys[(idx + 1) % keys.length]);
            }
            break;
          }
          case "ArrowUp": {
            event.preventDefault();
            const keys = Array.from(itemsRef.current.keys());
            if (keys.length === 0) return;
            if (focusedKey === null) {
              setFocusedKey(keys[keys.length - 1]);
            } else {
              const idx = keys.indexOf(focusedKey);
              setFocusedKey(keys[idx === 0 ? keys.length - 1 : idx - 1]);
            }
            break;
          }
          case "Enter": {
            event.preventDefault();
            if (focusedKey !== null) {
              const action = actionRef.current.get(focusedKey);
              if (action) {
                action();
                overlayState.close();
              }
            }
            break;
          }
          case "Escape": {
            event.preventDefault();
            overlayState.close();
            break;
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [overlayState.isOpen, focusedKey]);

    const registerItem = React.useCallback((key: Key, textValue: string) => {
      itemsRef.current.set(key, textValue);
      setItemCount((c) => c + 1);
    }, []);

    const unregisterItem = React.useCallback((key: Key) => {
      itemsRef.current.delete(key);
      setItemCount((c) => c + 1);
    }, []);

    // Click outside to close
    const handleOverlayClick = React.useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          overlayState.close();
        }
      },
      [overlayState],
    );

    const { dialogProps } = useDialog(
      { "aria-label": "Command palette" },
      modalRef,
    );

    if (!mounted || !overlayState.isOpen) {
      return null;
    }

    return createPortal(
      <FocusScope contain restoreFocus>
        <div
          className={cn(
            styles["palette"],
            styles["overlay"],
            overlayClassName,
          )}
          onClick={handleOverlayClick}
        >
          <Card
            {...filterDOMProps(dialogProps)}
            ref={modalRef}
            className={cn("content", styles["content"], className)}
            role="dialog"
            aria-modal="true"
          >
            <CommandContext.Provider
              value={{
                isOpen: overlayState.isOpen,
                close: overlayState.close,
                focusedKey,
                setFocusedKey,
                registerItem,
                unregisterItem,
                actionRef,
                searchInputRef,
                scrollableRef,
                searchValue,
                setSearchValue,
                filteredItems,
                groupedItems,
              }}
            >
              {children}
            </CommandContext.Provider>
          </Card>
        </div>
      </FocusScope>,
      document.body,
    );
  },
);

Command.displayName = "Command";

interface CommandSearchInputProps {
  /** Controlled search text value */
  value?: string;
  /** Called when the search text changes */
  onChange?: (value: string) => void;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Additional CSS class for the search input */
  className?: string;
}

const CommandSearchInput = React.forwardRef<
  HTMLInputElement,
  CommandSearchInputProps
>(({ value: externalValue, onChange: externalOnChange, placeholder = "Search..." }, ref) => {
  const { searchInputRef, searchValue, setSearchValue } = useCommandContext();

  // Use external value/onChange if provided, otherwise use internal context state
  const value = externalValue !== undefined ? externalValue : searchValue;
  const onChange = externalOnChange || setSearchValue;

  // Use internal Command ref for auto-focus, or user-provided ref
  const inputRef = (ref || searchInputRef) as React.RefObject<HTMLInputElement>;

  return (
    <Card.Header className={styles["search"]}>
      <div className={styles["search-container"]}>
        <div className={styles["search-icon"]}>
          <Search className="w-4 h-4" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles["search-input"]}
          aria-label="Search commands"
        />
        {value && (
          <button
            aria-label="Clear search"
            onClick={() => onChange("")}
            className={styles["search-clear"]}
          >
            ✕
          </button>
        )}
      </div>
    </Card.Header>
  );
});

CommandSearchInput.displayName = "Command.SearchInput";

interface CommandListProps {
  /** Child elements rendered inside the list */
  children?: React.ReactNode;
  /** Message shown when no items match the search */
  emptyMessage?: string;
  /** Additional CSS class for the list container */
  className?: string;
}

/** Scrollable container that renders the filtered command items */
const CommandListComponent = React.forwardRef<
  HTMLDivElement,
  CommandListProps
>(({ children, emptyMessage = "No items found.", className }, ref) => {
  const { scrollableRef } = useCommandContext();

  return (
    <div className={cn(styles["inner"], className)}>
      <Scroll
        ref={(el) => {
          if (ref) {
            if (typeof ref === "function") {
              ref(el);
            } else {
              ref.current = el;
            }
          }
          scrollableRef.current = el;
        }}
        className={styles["list"]}
        maxHeight="44dvh"
        fadeY={true}
      >
        <div role="listbox" aria-label="Commands">
          {!children ? (
            <div className={styles["empty"]}>{emptyMessage}</div>
          ) : (
            children
          )}
        </div>
      </Scroll>
    </div>
  );
});

CommandListComponent.displayName = "Command.List";

interface CommandItemProps {
  /** Unique key identifying this command item */
  value: Key;
  /** Plain-text label used for keyboard navigation lookup */
  textValue: string;
  /** Called when the item is selected */
  action: () => void | Promise<void>;
  /** Child elements rendered inside the item */
  children?: React.ReactNode;
  /** Additional CSS class for the item */
  className?: string;
  /** Keyboard shortcut or hint text rendered as a Badge at the end of the command item */
  hint?: string;
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ value, textValue, action, children, className, hint }, ref) => {
    const { focusedKey, registerItem, unregisterItem, actionRef } =
      useCommandContext();

    React.useEffect(() => {
      registerItem(value, textValue);
      actionRef.current.set(value, action);
      return () => {
        unregisterItem(value);
        actionRef.current.delete(value);
      };
    }, [value, textValue, action, registerItem, unregisterItem, actionRef]);

    const isHighlighted = focusedKey === value;

    return (
      <div
        ref={ref}
        data-highlighted={isHighlighted}
        role="option"
        aria-selected={isHighlighted}
        onClick={() => action()}
        className={cn("item", styles["item"], className)}
      >
        <div className={styles["item-content"]}>{children}</div>
        {hint && (
          <Badge variant="secondary" size="sm" className={styles["hint-wrapper"]}>
            {hint}
          </Badge>
        )}
      </div>
    );
  },
);

CommandItem.displayName = "Command.Item";

interface CommandCategoryProps {
  /** Child elements rendered inside the category header */
  children?: React.ReactNode;
  /** Additional CSS class for the category */
  className?: string;
}

/** Labeled section grouping related commands */
const CommandCategory = React.forwardRef<
  HTMLDivElement,
  CommandCategoryProps
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(styles["category-header"], className)}
    >
      {children}
    </div>
  );
});

CommandCategory.displayName = "Command.Category";

interface CommandFooterProps {
  /** Child elements rendered inside the footer */
  children?: React.ReactNode;
  /** Additional CSS class applied to the footer */
  className?: string;
}

/** Fixed bottom bar in the command palette for hints or actions */
const CommandFooter = React.forwardRef<HTMLDivElement, CommandFooterProps>(
  ({ children, className }, ref) => {
    return (
      <Card.Footer ref={ref} className={cn(styles["footer"], className)}>
        {children}
      </Card.Footer>
    );
  },
);

CommandFooter.displayName = "Command.Footer";

export interface CommandGroupsProps {
  /** Renders a category header for the given category name */
  renderCategory?: (category: string | undefined) => React.ReactNode;
  /** Renders a single command item row */
  renderItem: (command: CommandItem, hint?: string) => React.ReactNode;
  /** Additional CSS class for the groups container */
  className?: string;
}

/** Wrapper that renders multiple Command.Category sections */
const CommandGroups = React.forwardRef<HTMLDivElement, CommandGroupsProps>(
  ({ renderCategory, renderItem, className }, ref) => {
    const { groupedItems } = useCommandContext();

    return (
      <div ref={ref} className={className}>
        {groupedItems.map(({ category, items }) => (
          <div key={category || "uncategorized"}>
            {renderCategory && renderCategory(category)}
            {items.map((cmd) => (
              <React.Fragment key={cmd.id}>{renderItem(cmd, cmd.hint)}</React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  },
);

CommandGroups.displayName = "Command.Groups";

interface CommandComponent
  extends React.ForwardRefExoticComponent<
    CommandProps & React.RefAttributes<HTMLDivElement>
  > {
  SearchInput: typeof CommandSearchInput;
  List: typeof CommandListComponent;
  Item: typeof CommandItem;
  Category: typeof CommandCategory;
  Footer: typeof CommandFooter;
  Groups: typeof CommandGroups;
}

const CommandWithSubcomponents = Object.assign(Command, {
  SearchInput: CommandSearchInput,
  List: CommandListComponent,
  Item: CommandItem,
  Category: CommandCategory,
  Footer: CommandFooter,
  Groups: CommandGroups,
}) as CommandComponent;

export { CommandWithSubcomponents as Command };
export { CommandSearchInput as CommandInput };
export { CommandListComponent as CommandListComponent };
export { CommandCategory };
export { CommandFooter };
export { CommandGroups };
export { scoreCommandRelevance };
export { useCommandContext };
