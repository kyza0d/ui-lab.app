"use client";

import * as React from "react";
import { useHover, mergeProps } from "react-aria";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Banner.module.css";
import { Info, CircleCheck, TriangleAlert, CircleAlert } from "lucide-react";

type BannerSize = "sm" | "md" | "lg";

interface BannerStyleSlots {
  root?: StyleValue;
  "icon-container"?: StyleValue;
  content?: StyleValue;
  dismiss?: StyleValue;
}

type BannerStylesProp = StylesProp<BannerStyleSlots>;

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant class appended to the root element. Accepts any string. */
  variant?: string;
  /** Controls the padding and font size of the banner */
  size?: BannerSize;
  /** When true, renders a dismiss button that hides the banner on click */
  isDismissible?: boolean;
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: BannerStylesProp;
}

interface BannerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: StyleValue;
}

interface BannerBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: StyleValue;
}

const bannerIcons = {
  note: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
} as const;

type PresetBannerVariant = keyof typeof bannerIcons;

function isPresetBannerVariant(variant: string): variant is PresetBannerVariant {
  return Object.prototype.hasOwnProperty.call(bannerIcons, variant);
}

const getBannerIcon = (variant: string) => {
  const Icon = bannerIcons[isPresetBannerVariant(variant) ? variant : "note"];
  return <Icon className={css.icon} />;
};

const sizeMap = {
  sm: css["sm"],
  md: css["md"],
  lg: css["lg"],
} as const;

const resolveBannerBaseStyles = createStylesResolver(['root', 'icon-container', 'content', 'dismiss'] as const);

/** Heading text for the banner message */
const BannerTitle = React.forwardRef<HTMLHeadingElement, BannerTitleProps>(
  ({ className, styles, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("title", css.title, className, styles)}
      {...props}
    />
  )
);

BannerTitle.displayName = "Banner.Title";

/** Body text content of the banner */
const BannerBody = React.forwardRef<HTMLParagraphElement, BannerBodyProps>(
  ({ className, styles, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("body", css.body, className, styles)}
      {...props}
    />
  )
);

BannerBody.displayName = "Banner.Body";

/** Full-width notification strip for system messages and alerts */
const BannerRoot = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      styles,
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
    const resolved = resolveBannerBaseStyles(styles);

    return (
      <div
        {...mergeProps(hoverProps, props)}
        ref={ref}
        className={cn("banner", variant, css.banner, sizeMap[size], className, resolved.root)}
        data-variant={variant}
        data-size={size}
        data-hovered={isHovered ? "true" : "false"}
      >
        {icon && <div className={cn("icon", css.icon, resolved["icon-container"])}>{icon}</div>}
        <div className={cn("content", css.content, resolved.content)}>
          {children}
        </div>
        {isDismissible && (
          <button
            onClick={handleDismiss}
            className={cn("dismiss", css.dismiss, resolved.dismiss)}
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
