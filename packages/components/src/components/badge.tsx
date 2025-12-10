import { cn } from "@/lib/utils";
import React from "react";

import styles from "./badge.module.css";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  pill?: boolean;
}

const variantMap = {
  default: styles["default"],
  success: styles["success"],
  warning: styles["warning"],
  danger: styles["danger"],
  info: styles["info"],
};

const sizeMap = {
  sm: styles["sm"],
  md: styles["md"],
  lg: styles["lg"],
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      icon,
      dismissible = false,
      onDismiss,
      pill = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "badge",
      `${variant}`,
      `${size}`,
      variantMap[variant],
      sizeMap[size],
      styles.badge,
      pill && "rounded-full",
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {icon && <span className="flex items-center">{icon}</span>}
        <span>{children}</span>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="ml-1 flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
            aria-label="Dismiss"
            type="button"
          >
            <svg
              className={cn(
                size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
