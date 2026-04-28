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

type BadgeIconSlots = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

interface BadgeIconStyles {
  left?: StyleValue;
  right?: StyleValue;
}

export interface BadgeStyleSlots {
  root?: StyleValue;
  icon?: StyleValue | BadgeIconStyles;
  iconLeft?: StyleValue;
  iconRight?: StyleValue;
  dismiss?: StyleValue;
}

export type BadgeStylesProp = StylesProp<BadgeStyleSlots>;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual color style of the badge */
  variant?: string;
  /** Icon slots rendered before (left) or after (right) the badge label */
  icon?: React.ReactNode | BadgeIconSlots;
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

interface DismissButtonProps {
  onDismiss?: () => void;
  variant: string;
  className?: StyleValue;
}

function DismissButton({ onDismiss, variant, className }: DismissButtonProps) {
  const buttonRef = React.useRef<HTMLDivElement>(null);

  const { buttonProps, isPressed } = useButton(
    {
      "aria-label": "Dismiss",
      onPress: onDismiss,
    },
    buttonRef
  );

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({});

  return (
    <div
      {...mergeProps(buttonProps, focusProps, hoverProps)}
      ref={buttonRef}
      role="button"
      tabIndex={0}
      className={cn("badge", variant, "dismiss", css.dismiss, className)}
      data-pressed={isPressed ? "true" : "false"}
      data-hovered={isHovered ? "true" : "false"}
      data-focused={isFocused ? "true" : "false"}
      data-focus-visible={isFocusVisible ? "true" : "false"}
    >
      <X size={14} />
    </div>
  );
}

const resolveBadgeBaseStyles = createStylesResolver(['root', 'icon', 'iconLeft', 'iconRight', 'dismiss'] as const);

function resolveBadgeStyles(styles: BadgeStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveBadgeBaseStyles(styles);
  const { root, icon, iconLeft, iconRight, dismiss } = styles;
  if (!icon || typeof icon === "string" || Array.isArray(icon)) {
    return resolveBadgeBaseStyles({ root, icon: icon as StyleValue | undefined, iconLeft, iconRight, dismiss });
  }

  return resolveBadgeBaseStyles({
    root,
    iconLeft: icon.left ?? iconLeft,
    iconRight: icon.right ?? iconRight,
    dismiss,
  });
}

function isBadgeIconSlots(icon: BadgeProps["icon"]): icon is BadgeIconSlots {
  return typeof icon === "object" && icon !== null && !React.isValidElement(icon) && ("left" in icon || "right" in icon);
}

function resolveBadgeIcon(icon: BadgeProps["icon"]) {
  if (!icon) {
    return undefined;
  }

  if (isBadgeIconSlots(icon)) {
    return icon;
  }

  return { left: icon };
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
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
    const resolved = resolveBadgeStyles(styles);
    const resolvedIcon = resolveBadgeIcon(icon);
    return (
      <span
        ref={ref}
        className={cn(
          "badge",
          variant,
          css.badge,
          pill && css.pill,
          dismissible && css.dismissible,
          className,
          resolved.root
        )}
        data-variant={variant}
        data-pill={pill ? "true" : undefined}
        data-dismissible={dismissible || undefined}
        {...props}
      >
        {resolvedIcon?.left && (
          <span className={cn("badge", variant, "icon", css.icon, resolved.icon, resolved.iconLeft)} aria-hidden="true">
            {resolvedIcon.left}
          </span>
        )}
        {count !== undefined ? count : children}
        {resolvedIcon?.right && (
          <span className={cn("badge", variant, "icon", css.icon, resolved.icon, resolved.iconRight)} aria-hidden="true">
            {resolvedIcon.right}
          </span>
        )}
        {dismissible && <DismissButton onDismiss={onDismiss} variant={variant} className={resolved.dismiss} />}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
