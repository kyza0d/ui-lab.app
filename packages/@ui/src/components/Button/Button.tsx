"use client";

import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "default" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href"> {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Disables interaction and applies disabled styling */
  isDisabled?: boolean;
  /** React Aria press handler — preferred over onClick for accessibility */
  onPress?: (e: { target: EventTarget | null }) => void;
  /** Icon slots rendered before (left) or after (right) the button label */
  icon?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
  /** Renders the button as an anchor element when provided */
  href?: string;
}

const variantMap = {
  primary: styles["primary"],
  default: styles["default"],
  secondary: styles["secondary"],
  outline: styles["outline"],
  ghost: styles["ghost"],
  danger: styles["danger"],
} as const;

const sizeMap = {
  sm: styles["sm"],
  md: styles["md"],
  lg: styles["lg"],
} as const;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, onClick, onPress, isDisabled, disabled, icon, href, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const mergedRef = useMergedRef(ref, buttonRef);
    const isButtonDisabled = isDisabled ?? disabled ?? false;
    const [isPressed, setIsPressed] = React.useState(false);
    const isAnchor = !!href;

    const handlePress = React.useCallback((e: any) => {
      if (onPress) onPress({ target: e.target });
      if (onClick) onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }, [onPress, onClick]);

    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!isButtonDisabled) {
        setIsPressed(true);
      }
      props.onMouseDown?.(e as any);
    }, [isButtonDisabled, props]);

    const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      setIsPressed(false);
      props.onMouseUp?.(e as any);
    }, [props]);

    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      setIsPressed(false);
      props.onMouseLeave?.(e as any);
    }, [props]);

    const { buttonProps } = useButton({
      isDisabled: isButtonDisabled,
      onPress: handlePress,
    }, buttonRef as React.RefObject<HTMLButtonElement>);

    const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus: props.autoFocus });
    const { hoverProps, isHovered } = useHover({ isDisabled: isButtonDisabled });

    const buttonClassName = cn("button", variant, size, styles.button, variantMap[variant], sizeMap[size], className);

    if (isAnchor) {
      return (
        <a
          {...mergeProps(focusProps, hoverProps, props as any)}
          ref={mergedRef as unknown as React.RefObject<HTMLAnchorElement>}
          href={href}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={buttonClassName}
          data-disabled={isButtonDisabled ? "true" : undefined}
          data-pressed={isPressed ? "true" : "false"}
          data-hovered={isHovered ? "true" : "false"}
          data-focused={isFocused ? "true" : "false"}
          data-focus-visible={isFocusVisible ? "true" : "false"}
        >
          {icon?.left && <span className={cn((styles as any)[`icon-${size}`])}>{icon.left}</span>}
          {children}
          {icon?.right && <span className={cn((styles as any)[`icon-${size}`])}>{icon.right}</span>}
        </a>
      );
    }

    return (
      <button
        {...mergeProps(buttonProps, focusProps, hoverProps, props)}
        ref={mergedRef as unknown as React.RefObject<HTMLButtonElement>}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={buttonClassName}
        data-disabled={isButtonDisabled ? "true" : undefined}
        data-pressed={isPressed ? "true" : "false"}
        data-hovered={isHovered ? "true" : "false"}
        data-focused={isFocused ? "true" : "false"}
        data-focus-visible={isFocusVisible ? "true" : "false"}
      >
        {icon?.left && <span className={cn((styles as any)[`icon-${size}`])}>{icon.left}</span>}
        {children}
        {icon?.right && <span className={cn((styles as any)[`icon-${size}`])}>{icon.right}</span>}
      </button>
    );
  }
);

function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

Button.displayName = "Button";

export { Button };
