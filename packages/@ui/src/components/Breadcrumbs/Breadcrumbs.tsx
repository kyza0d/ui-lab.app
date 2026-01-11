'use client';

import React, { ReactNode, forwardRef } from 'react';
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbItemProps {
  href?: string;
  onPress?: () => void;
  children: ReactNode;
  isCurrent?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export interface BreadcrumbsProps {
  children: ReactNode;
  className?: string;
  separator?: ReactNode;
}

const Breadcrumb = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ href, onPress, children, isCurrent = false, isDisabled = false, className }, ref) => {
    const isInteractive = !isCurrent && !isDisabled && (href || onPress);

    return (
      <li ref={ref} className={styles.breadcrumb}>
        {isInteractive ? (
          <a
            href={href}
            className={`${styles.breadcrumbLink} ${className || ''}`}
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
            className={`${styles.breadcrumbLink} ${className || ''}`}
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

Breadcrumb.displayName = 'Breadcrumb';

const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, className, separator }, ref) => {
    const childArray = React.Children.toArray(children);
    const childCount = childArray.length;

    return (
      <nav
        ref={ref}
        className={`${styles.breadcrumbs} ${className || ''}`}
        aria-label="Breadcrumb"
      >
        <ol className={`${styles.breadcrumbsList} ${separator ? styles.withCustomSeparator : ''}`}>
          {React.Children.map(childArray, (child, index) => {
            const isLastChild = index === childCount - 1;
            if (React.isValidElement(child)) {
              const element = React.cloneElement(child as React.ReactElement<BreadcrumbItemProps>, {
                isCurrent: isLastChild,
              });

              // Add separator after each item except the last
              if (separator && !isLastChild) {
                return (
                  <React.Fragment key={index}>
                    {element}
                    <li className={styles.separator} aria-hidden="true">
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

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs, Breadcrumb };
