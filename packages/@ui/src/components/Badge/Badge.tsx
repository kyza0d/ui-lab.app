"use client";

import * as React from "react";

import { useFocusRing } from "@react-aria/focus";
import { mergeProps, } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { useButton } from "@react-aria/button";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Badge.module.css";

import { X } from "lucide-react";

type BadgeVariant = "default" | 'secondary' | "success" | "warning" | "danger" | "info";
type BadgeSize = "sm" | "md" | "lg";

export interface BadgeStyleSlots {
  root?: StyleValue;
  iconWrapper?: StyleValue;
  dismissButton?: StyleValue;
}

export type BadgeStylesProp = StylesProp<BadgeStyleSlots>;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual color style of the badge */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Icon element displayed before the badge label */
  icon?: React.ReactNode;
  /** Whether to show a dismiss button */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Whether to render with a fully rounded pill shape */
  pill?: boolean;
  /** Numeric count to display; replaces children when provided */
  count?: number;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: BadgeStylesProp;
}

const variantMap = {
  default: css["default"],
  secondary: css["secondary"],
  success: css["success"],
  warning: css["warning"],
  danger: css["danger"],
  info: css["info"],
} as const;

const sizeMap = {
  sm: css["sm"],
  md: css["md"],
  lg: css["lg"],
} as const;

interface DismissButtonProps {
  onDismiss?: () => void;
  size: BadgeSize;
  className?: StyleValue;
}

function DismissButton({ onDismiss, size, className }: DismissButtonProps) {
  const buttonRef = React.useRef<HTMLDivElement>(null);

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
    <div
      {...mergeProps(buttonProps, focusProps, hoverProps)}
      ref={buttonRef}
      role="button"
      tabIndex={0}
      className={cn(css.dismissButton, className)}
      data-pressed={isPressed || undefined}
      data-hovered={isHovered || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      <X size={14} />
    </div>
  );
}

const resolveBadgeBaseStyles = createStylesResolver(['root', 'iconWrapper', 'dismissButton'] as const);

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "sm",
      icon,
      dismissible = false,
      onDismiss,
      pill = false,
      count,
      children,
      className,
      styles,
      ...props
    },
    ref
  ) => {
    const resolved = resolveBadgeBaseStyles(styles);
    return (
      <span
        ref={ref}
        className={cn(
          "badge",
          variant,
          size,
          css.badge,
          variantMap[variant],
          sizeMap[size],
          pill && css.pill,
          dismissible && css.dismissible,
          className,
          resolved.root
        )}
        data-variant={variant}
        data-size={size}
        data-pill={pill ? "true" : undefined}
        data-dismissible={dismissible || undefined}
        {...props}
      >
        {icon && (
          <span className={cn(css.iconWrapper, resolved.iconWrapper)} aria-hidden="true">
            {icon}
          </span>
        )}
        {count !== undefined ? count : children}
        {dismissible && <DismissButton onDismiss={onDismiss} size={size} className={resolved.dismissButton} />}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
