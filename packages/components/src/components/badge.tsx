import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-md",
  {
    variants: {
      variant: {
        default:
          "bg-background-700 text-background-300 border border-background-600",
        success:
          "bg-success-100 text-success-900 border border-success-300",
        warning:
          "bg-warning-100 text-warning-900 border border-warning-300",
        danger:
          "bg-danger-100 text-danger-900 border border-danger-300",
        info: "bg-info-100 text-info-900 border border-info-300",
      },
      size: {
        sm: "p-1 text-sm",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  pill?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant,
      size,
      icon,
      dismissible = false,
      onDismiss,
      pill = false,
      children,
      className, // ← this will now properly override padding, etc.
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        badgeVariants({ variant, size }),     // ← only variants here
        pill && "rounded-full",
        className                              // ← custom classes last = highest priority
      )}
      {...props}
    >
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
  )
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
