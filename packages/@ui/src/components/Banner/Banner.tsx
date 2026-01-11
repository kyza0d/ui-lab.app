"use client";

import * as React from "react";
import { useHover, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import styles from "./Banner.module.css";
import { FaCircleInfo, FaCircleCheck, FaTriangleExclamation, FaCircleExclamation } from "react-icons/fa6";

type BannerVariant = "note" | "info" | "success" | "warning" | "danger";
type BannerSize = "sm" | "md" | "lg";

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BannerVariant;
  size?: BannerSize;
  isDismissible?: boolean;
  onDismiss?: () => void;
}

export interface BannerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface BannerBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const variantMap = {
  note: styles["note"],
  info: styles["info"],
  success: styles["success"],
  warning: styles["warning"],
  danger: styles["danger"],
} as const;

const getBannerIcon = (variant: BannerVariant) => {
  const iconProps = { className: styles.icon };
  const icons = {
    note: <FaCircleInfo {...iconProps} />,
    info: <FaCircleInfo {...iconProps} />,
    success: <FaCircleCheck {...iconProps} />,
    warning: <FaTriangleExclamation {...iconProps} />,
    danger: <FaCircleExclamation {...iconProps} />,
  };
  return icons[variant];
};

const sizeMap = {
  sm: styles["sm"],
  md: styles["md"],
  lg: styles["lg"],
} as const;

const BannerTitle = React.forwardRef<HTMLHeadingElement, BannerTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("banner-title", styles.title, className)}
      {...props}
    />
  )
);

BannerTitle.displayName = "Banner.Title";

const BannerBody = React.forwardRef<HTMLParagraphElement, BannerBodyProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("banner-body", styles.body, className)}
      {...props}
    />
  )
);

BannerBody.displayName = "Banner.Body";

const BannerRoot = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = "note",
      size = "md",
      isDismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const { hoverProps, isHovered } = useHover({});

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) {
      return null;
    }

    const icon = getBannerIcon(variant);

    return (
      <div
        {...mergeProps(hoverProps, props)}
        ref={ref}
        className={cn("banner", styles.banner, variantMap[variant], sizeMap[size], className)}
        data-variant={variant}
        data-size={size}
        data-hovered={isHovered ? "true" : "false"}
      >
        {icon && <div className={cn("banner-icon", styles.iconContainer)}>{icon}</div>}
        <div className={cn("banner-content", styles.content)}>
          {children}
        </div>
        {isDismissible && (
          <button
            onClick={handleDismiss}
            className={cn("banner-dismiss", styles.dismiss)}
            aria-label="Dismiss banner"
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

BannerRoot.displayName = "Banner";

interface BannerComponent extends React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>> {
  Title: typeof BannerTitle;
  Body: typeof BannerBody;
}

const Banner = Object.assign(BannerRoot, {
  Title: BannerTitle,
  Body: BannerBody,
}) as BannerComponent;

export { Banner };
