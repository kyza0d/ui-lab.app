"use client";

import * as React from "react";

import { mergeProps, } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus"
import { useButton } from "@react-aria/button";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Button.module.css";

type ButtonVariant = "primary" | "default" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonIconStyles {
  left?: StyleValue;
  right?: StyleValue;
}

export interface ButtonStyleSlots {
  root?: StyleValue;
  icon?: StyleValue | ButtonIconStyles;
}

export type ButtonStylesProp = StylesProp<ButtonStyleSlots>;

const resolveButtonBaseStyles = createStylesResolver(['root', 'iconLeft', 'iconRight'] as const);

function resolveButtonStyles(styles: ButtonStylesProp | undefined) {
  if (!styles || typeof styles === 'string' || Array.isArray(styles)) return resolveButtonBaseStyles(styles)
  const { root, icon } = styles;

  let iconLeft: StyleValue | undefined;
  let iconRight: StyleValue | undefined;

  if (icon) {
    if (typeof icon === 'string' || Array.isArray(icon)) {
      iconLeft = icon;
      iconRight = icon;
    } else {
      iconLeft = icon.left;
      iconRight = icon.right;
    }
  }

  return resolveButtonBaseStyles({ root, iconLeft, iconRight });
}

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
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: ButtonStylesProp;
}

const variantMap = {
  primary: css["primary"],
  default: css["default"],
  secondary: css["secondary"],
  outline: css["outline"],
  ghost: css["ghost"],
  danger: css["danger"],
} as const;

const sizeMap = {
  sm: css["sm"],
  md: css["md"],
  lg: css["lg"],
} as const;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, styles, variant = "default", size = "md", children, onClick, onPress, isDisabled, disabled, icon, href, ...props }, ref) => {
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

    const resolved = resolveButtonStyles(styles);
    const buttonClassName = cn("button", variant, size, css.button, variantMap[variant], sizeMap[size], className, resolved.root);

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
          {icon?.left && <span className={cn((css as any)[`icon-${size}`], resolved.iconLeft)}>{icon.left}</span>}
          {children}
          {icon?.right && <span className={cn((css as any)[`icon-${size}`], resolved.iconRight)}>{icon.right}</span>}
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
        {icon?.left && <span className={cn((css as any)[`icon-${size}`], resolved.iconLeft)}>{icon.left}</span>}
        {children}
        {icon?.right && <span className={cn((css as any)[`icon-${size}`], resolved.iconRight)}>{icon.right}</span>}
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
