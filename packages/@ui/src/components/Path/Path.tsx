"use client";

import * as React from "react";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { useFocusIndicator } from "@/hooks/useFocusIndicator";
import { useMergeRefs } from "@/hooks/useMergeRefs";
import css from "./Path.module.css";

export interface PathItemStyleSlots {
  root?: StyleValue;
  link?: StyleValue;
}

export type PathItemStylesProp = StylesProp<PathItemStyleSlots>;

export interface PathStyleSlots {
  root?: StyleValue;
  list?: StyleValue;
  separator?: StyleValue;
}

export type PathStylesProp = StylesProp<PathStyleSlots>;

function focusPathSibling(
  currentTarget: HTMLElement,
  direction: "next" | "previous" | "first" | "last"
) {
  const listElement = currentTarget.closest('[data-path-list="true"]');
  if (!listElement) {
    return;
  }

  const focusableItems = Array.from(
    listElement.querySelectorAll('[data-path-item-focus-surface="true"]:not([data-disabled="true"])')
  ) as HTMLElement[];

  if (!focusableItems.length) {
    return;
  }

  const currentIndex = focusableItems.indexOf(currentTarget);
  if (currentIndex === -1) {
    return;
  }

  let nextIndex = currentIndex;

  if (direction === "next") {
    nextIndex = (currentIndex + 1) % focusableItems.length;
  } else if (direction === "previous") {
    nextIndex = currentIndex === 0 ? focusableItems.length - 1 : currentIndex - 1;
  } else if (direction === "first") {
    nextIndex = 0;
  } else if (direction === "last") {
    nextIndex = focusableItems.length - 1;
  }

  focusableItems[nextIndex]?.focus();
}

const resolvePathBaseStyles = createStylesResolver(["root", "list", "separator"] as const);
const resolvePathItemBaseStyles = createStylesResolver(["root", "link"] as const);

function resolvePathStyles(styles: PathStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolvePathBaseStyles(styles);
  const { root, list, separator } = styles;
  return resolvePathBaseStyles({ root, list, separator });
}

function resolvePathItemStyles(styles: PathItemStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolvePathItemBaseStyles(styles);
  const { root, link } = styles;
  return resolvePathItemBaseStyles({ root, link });
}

export interface PathItemProps {
  /** Content rendered inside the path item. */
  children: React.ReactNode;
  /** URL this path item navigates to. */
  href?: string;
  /** Called when the item is activated. */
  onPress?: () => void;
  /** Whether this item represents the current page. */
  isCurrent?: boolean;
  /** Whether the item is non-interactive. */
  isDisabled?: boolean;
  /** Additional CSS class names applied to the item root. */
  className?: string;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: PathItemStylesProp;
}

export interface PathProps {
  /** Path items rendered inside the ordered list. */
  children: React.ReactNode;
  /** Additional CSS class names applied to the path root. */
  className?: string;
  /** Custom separator rendered between path items. */
  separator?: React.ReactNode;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: PathStylesProp;
}

const PathItem = React.forwardRef<HTMLLIElement, PathItemProps>(
  (
    {
      href,
      onPress,
      children,
      isCurrent = false,
      isDisabled = false,
      className,
      styles,
    },
    ref
  ) => {
    const itemRef = React.useRef<HTMLLIElement>(null);
    const mergedRef = useMergeRefs(ref, itemRef);
    const isInteractive = !isCurrent && !isDisabled && Boolean(href || onPress);
    const [isPressed, setIsPressed] = React.useState(false);
    const { focusProps, isFocused, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled: !isInteractive });
    const resolved = resolvePathItemStyles(styles);

    const handleMouseDown = React.useCallback(() => {
      if (isInteractive) {
        setIsPressed(true);
      }
    }, [isInteractive]);

    const handleMouseUp = React.useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          focusPathSibling(event.currentTarget, "next");
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          focusPathSibling(event.currentTarget, "previous");
          return;
        }

        if (event.key === "Home") {
          event.preventDefault();
          focusPathSibling(event.currentTarget, "first");
          return;
        }

        if (event.key === "End") {
          event.preventDefault();
          focusPathSibling(event.currentTarget, "last");
          return;
        }

        if (!isInteractive) {
          return;
        }

        if (event.key === " " || event.key === "Enter") {
          setIsPressed(true);
        }
      },
      [isInteractive]
    );

    const handleKeyUp = React.useCallback((event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === " " || event.key === "Enter") {
        setIsPressed(false);
      }
    }, []);

    const mergedInteractionProps = mergeProps(focusProps, hoverProps, {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    }) as unknown as Record<string, unknown>;

    const {
      onChange: _onChange,
      onChangeCapture: _onChangeCapture,
      ...interactionProps
    } = mergedInteractionProps;

    const stateProps = {
      "data-selected": isCurrent ? "true" : undefined,
      "data-disabled": isDisabled ? "true" : undefined,
      "data-focused": isFocused ? "true" : undefined,
      "data-focus-visible": isFocusVisible ? "true" : undefined,
      "data-hovered": isHovered ? "true" : undefined,
      "data-pressed": isPressed ? "true" : undefined,
      "data-path-item-focus-surface": "true" as const,
      "aria-current": isCurrent ? ("page" as const) : undefined,
    };

    const surfaceClassName = cn("path-link", css.link, resolved.link);
    const focusableTabIndex = isDisabled ? -1 : isCurrent ? 0 : undefined;

    return (
      <li
        ref={mergedRef}
        className={cn("path-item", css.item, className, resolved.root)}
        data-selected={isCurrent ? "true" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
      >
        {isInteractive && href ? (
          <a
            {...(interactionProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            href={href}
            className={surfaceClassName}
            tabIndex={focusableTabIndex}
            {...stateProps}
            onClick={(event) => {
              if (onPress) {
                event.preventDefault();
                onPress();
              }
            }}
          >
            {children}
          </a>
        ) : isInteractive ? (
          <button
            {...(interactionProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            type="button"
            className={surfaceClassName}
            tabIndex={focusableTabIndex}
            onClick={onPress}
            {...stateProps}
          >
            {children}
          </button>
        ) : (
          <span
            {...(interactionProps as React.HTMLAttributes<HTMLSpanElement>)}
            className={surfaceClassName}
            tabIndex={focusableTabIndex}
            {...stateProps}
          >
            {children}
          </span>
        )}
      </li>
    );
  }
);

PathItem.displayName = "Path.Item";

export interface PathComponent
  extends React.ForwardRefExoticComponent<PathProps & React.RefAttributes<HTMLElement>> {
  Item: typeof PathItem;
}

const Path = Object.assign(
  React.forwardRef<HTMLElement, PathProps>(
    ({ children, className, separator, styles }, ref) => {
      const scopeRef = React.useRef<HTMLDivElement>(null);
      const navRef = React.useRef<HTMLElement>(null);
      const mergedRef = useMergeRefs(ref, navRef);
      const childArray = React.Children.toArray(children);
      const childCount = childArray.length;
      const resolved = resolvePathStyles(styles);
      const { scopeProps, indicatorProps } = useFocusIndicator({
        scopeRef,
        containerRef: navRef,
        surfaceSelector: '[data-path-item-focus-surface="true"]',
        radiusSource: "surface",
        dependencies: [childCount, Boolean(separator)],
      });

      return (
        <div ref={scopeRef} className={cn("path-scope", scopeProps.className)}>
          <div {...indicatorProps} data-focus-indicator="local" />
          <nav
            ref={mergedRef}
            className={cn("path", css.path, className, resolved.root)}
            aria-label="Path"
          >
            <ol
              className={cn("path-list", css.list, resolved.list)}
              data-path-list="true"
              data-separator={separator ? "custom" : undefined}
            >
              {React.Children.map(childArray, (child, index) => {
                const isLastChild = index === childCount - 1;

                if (React.isValidElement(child)) {
                  const element = React.cloneElement(
                    child as React.ReactElement<PathItemProps>,
                    { isCurrent: isLastChild }
                  );

                  if (separator && !isLastChild) {
                    return (
                      <React.Fragment key={child.key ?? index}>
                        {element}
                        <li
                          className={cn("path-separator", css.separator, resolved.separator)}
                          aria-hidden="true"
                        >
                          {separator}
                        </li>
                      </React.Fragment>
                    );
                  }

                  return element;
                }

                return child;
              })}
            </ol>
          </nav>
        </div>
      );
    }
  ),
  {
    Item: PathItem,
  }
) as PathComponent;

Path.displayName = "Path";

export { Path, PathItem };
