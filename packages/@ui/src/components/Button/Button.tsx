"use client";

import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "default" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  onPress?: (e: { target: EventTarget | null }) => void;
  icon?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, onClick, onPress, isDisabled, disabled, icon, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const mergedRef = useMergedRef(ref, buttonRef);
    const isButtonDisabled = isDisabled ?? disabled ?? false;
    const [isPressed, setIsPressed] = React.useState(false);

    const handlePress = React.useCallback((e: any) => {
      if (onPress) onPress({ target: e.target });
      if (onClick) onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }, [onPress, onClick]);

    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isButtonDisabled) {
        setIsPressed(true);
      }
      props.onMouseDown?.(e);
    }, [isButtonDisabled, props]);

    const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      props.onMouseUp?.(e);
    }, [props]);

    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      props.onMouseLeave?.(e);
    }, [props]);

    const { buttonProps } = useButton({
      isDisabled: isButtonDisabled,
      onPress: handlePress,
    }, buttonRef);

    const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus: props.autoFocus });
    const { hoverProps, isHovered } = useHover({ isDisabled: isButtonDisabled });

    return (
      <button
        {...mergeProps(buttonProps, focusProps, hoverProps, props)}
        ref={mergedRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={cn("button", variant, size, styles.button, variantMap[variant], sizeMap[size], className)}
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
