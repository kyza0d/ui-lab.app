"use client";

import * as React from "react";
import { useToggleState } from "react-stately";
import { useButton, useFocusRing, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import { Divider } from "@/components/Divider";
import styles from "./Fold.module.css";

export interface FoldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  isExpanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (isExpanded: boolean) => void;
  isDisabled?: boolean;
  children?: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
}

const Fold = React.forwardRef<HTMLDivElement, FoldProps>(
  (
    {
      title,
      isExpanded,
      defaultExpanded = false,
      onExpandedChange,
      isDisabled = false,
      children,
      triggerClassName,
      contentClassName,
      className,
      ...props
    },
    ref
  ) => {
    const state = useToggleState({
      isSelected: isExpanded,
      defaultSelected: defaultExpanded,
      onChange: onExpandedChange,
    });

    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const { buttonProps, isPressed } = useButton(
      {
        isDisabled,
        onPress: () => state.toggle(),
      },
      triggerRef
    );

    const { focusProps, isFocused, isFocusVisible } = useFocusRing();

    return (
      <div
        ref={ref}
        className={cn("fold", styles.fold, className)}
        data-disabled={isDisabled || undefined}
        {...props}
      >
        <button
          ref={triggerRef}
          {...mergeProps(buttonProps, focusProps)}
          className={cn(styles.trigger, triggerClassName)}
          aria-expanded={state.isSelected}
          data-expanded={state.isSelected || undefined}
          data-disabled={isDisabled || undefined}
          data-focused={isFocused || undefined}
          data-focus-visible={isFocusVisible || undefined}
          data-pressed={isPressed || undefined}
        >
          <span className={styles.title}>{title}</span>
          <span className={styles.icon}>
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M4.47 6.47a.75.75 0 000 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 00-1.06-1.06L8 9.44 5.53 6.97a.75.75 0 00-1.06 0z" />
            </svg>
          </span>
        </button>

        <Divider className="mt-2" spacing="none" color="default" />

        <div
          className={cn(styles.content, contentClassName)}
          data-expanded={state.isSelected || undefined}
          aria-hidden={!state.isSelected}
        >
          <div className={styles.contentInner}>{children}</div>
        </div>
      </div>

    );
  }
);

Fold.displayName = "Fold";

export { Fold };
