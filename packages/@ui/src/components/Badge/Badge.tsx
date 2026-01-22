"use client";

import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import styles from "./Badge.module.css";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";
type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  pill?: boolean;
  count?: number;
}

const variantMap = {
  default: styles["default"],
  success: styles["success"],
  warning: styles["warning"],
  danger: styles["danger"],
  info: styles["info"],
} as const;

const sizeMap = {
  sm: styles["sm"],
  md: styles["md"],
  lg: styles["lg"],
} as const;

interface DismissButtonProps {
  onDismiss?: () => void;
  size: BadgeSize;
}

function DismissButton({ onDismiss, size }: DismissButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(
    {
      "aria-label": "Dismiss",
      onPress: onDismiss,
    },
    buttonRef
  );

  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({});

  const iconSize = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4";

  return (
    <button
      {...mergeProps(buttonProps, focusProps, hoverProps)}
      ref={buttonRef}
      type="button"
      className={styles.dismissButton}
      data-pressed={isPressed || undefined}
      data-hovered={isHovered || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      icon,
      dismissible = false,
      onDismiss,
      pill = false,
      count,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "badge",
          variant,
          size,
          styles.badge,
          variantMap[variant],
          sizeMap[size],
          pill && styles.pill,
          className
        )}
        data-variant={variant}
        data-size={size}
        data-pill={pill ? "true" : undefined}
        {...props}
      >
        {icon && (
          <span className={styles.iconWrapper} aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{count !== undefined ? count : children}</span>
        {dismissible && <DismissButton onDismiss={onDismiss} size={size} />}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
