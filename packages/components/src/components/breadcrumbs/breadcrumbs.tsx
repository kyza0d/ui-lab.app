'use client';

import React, { ReactNode, forwardRef } from 'react';
import styles from './breadcrumbs.module.css';

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
  ({ children, className }, ref) => {
    const childArray = React.Children.toArray(children);
    const childCount = childArray.length;

    return (
      <nav
        ref={ref}
        className={`${styles.breadcrumbs} ${className || ''}`}
        aria-label="Breadcrumb"
      >
        <ol className={styles.breadcrumbsList}>
          {React.Children.map(childArray, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<BreadcrumbItemProps>, {
                isCurrent: index === childCount - 1,
              });
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
