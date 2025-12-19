"use client";

import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  onPress?: (e: { target: EventTarget | null }) => void;
}

const variantMap = {
  primary: styles["primary"],
  secondary: styles["secondary"],
  outline: styles["outline"],
  ghost: styles["ghost"],
} as const;

const sizeMap = {
  sm: styles["sm"],
  md: styles["md"],
  lg: styles["lg"],
} as const;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, onClick, onPress, isDisabled, disabled, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const mergedRef = useMergedRef(ref, buttonRef);
    const isButtonDisabled = isDisabled ?? disabled ?? false;

    const { buttonProps, isPressed } = useButton({
      isDisabled: isButtonDisabled,
      onPress: onPress ? (e) => onPress({ target: e.target }) : undefined,
      onPressStart: undefined,
      onPressEnd: undefined,
      onPressChange: undefined,
      onPressUp: undefined,
    }, buttonRef);

    const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus: props.autoFocus });
    const { hoverProps, isHovered } = useHover({ isDisabled: isButtonDisabled });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);
    };

    return (
      <button
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        ref={mergedRef}
        onClick={handleClick}
        className={cn("button", variant, size, styles.button, variantMap[variant], sizeMap[size], className)}
        data-variant={variant}
        data-size={size}
        data-disabled={isButtonDisabled || undefined}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        data-focused={isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}
        {...props}
      >
        {children}
      </button>
    );
  }
);

function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return React.useCallback((value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = value;
    });
  }, refs);
}

Button.displayName = "Button";

export { Button };
