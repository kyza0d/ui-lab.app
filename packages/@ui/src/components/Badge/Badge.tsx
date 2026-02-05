"use client";

import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import styles from "./Badge.module.css";
import { HiX } from "react-icons/hi";

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
      <HiX size={14} />
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
          dismissible && styles.dismissible,
          className
        )}
        data-variant={variant}
        data-size={size}
        data-pill={pill ? "true" : undefined}
        data-dismissible={dismissible || undefined}
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
