'use client';

import React, { ReactNode, forwardRef } from 'react';
import { cn, type StyleValue } from '@/lib/utils';
import { type StylesProp, createStylesResolver } from '@/lib/styles';
import css from "./Path.module.css";

export interface PathItemProps {
  /** URL this path item links to */
  href?: string;
  /** Called when the path item is pressed */
  onPress?: () => void;
  children: ReactNode;
  /** Whether this is the current/active page */
  isCurrent?: boolean;
  /** Whether the item is non-interactive */
  isDisabled?: boolean;
  /** Additional CSS class names */
  className?: string;
}

export interface PathStyleSlots {
  root?: StyleValue;
  list?: StyleValue;
  separator?: StyleValue;
}

export type PathStylesProp = StylesProp<PathStyleSlots>;

export interface PathProps {
  children: ReactNode;
  /** Additional CSS class for the path container */
  className?: string;
  /** Custom separator element between path items */
  separator?: ReactNode;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: PathStylesProp;
}

const resolvePathBaseStyles = createStylesResolver(['root', 'list', 'separator'] as const);

const PathItem = forwardRef<HTMLLIElement, PathItemProps>(
  ({ href, onPress, children, isCurrent = false, isDisabled = false, className }, ref) => {
    const isInteractive = !isCurrent && !isDisabled && (href || onPress);

    return (
      <li ref={ref} className={css['path-item']}>
        {isInteractive ? (
          <a
            href={href}
            className={cn(css['path-item-link'], className || '')}
            data-disabled={isDisabled || undefined}
            data-current={isCurrent || undefined}
            aria-current={isCurrent ? 'page' : undefined}
            onClick={(e) => {
              if (onPress) {
                e.preventDefault();
                onPress();
              }
            }}
          >
            {children}
          </a>
        ) : (
          <span
            className={`${css['path-item-link']} ${className || ''}`}
            data-disabled={isDisabled || undefined}
            data-current={isCurrent || undefined}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {children}
          </span>
        )}
      </li>
    );
  }
);

PathItem.displayName = 'Path.Item';

const Path = forwardRef<HTMLElement, PathProps>(
  ({ children, className, separator, styles }, ref) => {
    const childArray = React.Children.toArray(children);
    const childCount = childArray.length;

    const resolved = resolvePathBaseStyles(styles);

    return (
      <nav
        ref={ref}
        className={cn(css.path, className, resolved.root)}
        aria-label="Path"
      >
        <ol className={cn(
          css['path-list'],
          resolved.list,
          separator && css['with-custom-separator']
        )}>
          {React.Children.map(childArray, (child, index) => {
            const isLastChild = index === childCount - 1;
            if (React.isValidElement(child)) {
              const element = React.cloneElement(child as React.ReactElement<PathItemProps>, {
                isCurrent: isLastChild,
              });

              // Add separator after each item except the last
              if (separator && !isLastChild) {
                return (
                  <React.Fragment key={index}>
                    {element}
                    <li className={cn(css.separator, resolved.separator)} aria-hidden="true">
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
    );
  }
);

Path.displayName = 'Path';

export { Path, PathItem };
