"use client";

import * as React from "react";

import { mergeProps, } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus"
import { useButton } from "@react-aria/button";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Button.module.css";

type ButtonSize = "sm" | "md" | "lg" | (string & {});
type ButtonIconSlots = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

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

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href" | "target"> {
  /** Variant class appended to the root element. Accepts any string. */
  variant?: string;
  /** Size class appended to the root element. Accepts any string. */
  size?: ButtonSize;
  /** Disables interaction and applies disabled styling */
  isDisabled?: boolean;
  /** React Aria press handler — preferred over onClick for accessibility */
  onPress?: (e: { target: EventTarget | null }) => void;
  /** Icon slots rendered before (left) or after (right) the button label */
  icon?: React.ReactNode | ButtonIconSlots;
  /** Renders the button as an anchor element when provided */
  href?: string;
  /** Browsing context for the anchor variant (e.g. "_blank") */
  target?: React.HTMLAttributeAnchorTarget;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: ButtonStylesProp;
}

function isButtonIconSlots(icon: ButtonProps["icon"]): icon is ButtonIconSlots {
  return typeof icon === "object" && icon !== null && !React.isValidElement(icon) && ('left' in icon || 'right' in icon);
}

function resolveButtonIcon(icon: ButtonProps["icon"]) {
  if (!icon) {
    return undefined;
  }

  if (isButtonIconSlots(icon)) {
    return icon;
  }

  return { left: icon };
}

function resolveButtonIconSizeClass(size: ButtonSize | undefined) {
  if (!size) {
    return undefined;
  }

  return (css as unknown as Record<string, string | undefined>)[`icon-${size}`];
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, styles, variant = "default", size = "md", children, onClick, onPress, isDisabled, disabled, icon, href, target, rel, ...props }, ref) => {
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
    const resolvedIcon = resolveButtonIcon(icon);
    const iconSizeClassName = resolveButtonIconSizeClass(size);
    const buttonClassName = cn("button", variant, size, css.button, className, resolved.root);

    if (isAnchor) {
      return (
        <a
          {...mergeProps(focusProps, hoverProps, props as any)}
          ref={mergedRef as unknown as React.RefObject<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
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
          {resolvedIcon?.left && <span className={cn(iconSizeClassName, resolved.iconLeft)}>{resolvedIcon.left}</span>}
          {children}
          {resolvedIcon?.right && <span className={cn(iconSizeClassName, resolved.iconRight)}>{resolvedIcon.right}</span>}
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
        {resolvedIcon?.left && <span className={cn(iconSizeClassName, resolved.iconLeft)}>{resolvedIcon.left}</span>}
        {children}
        {resolvedIcon?.right && <span className={cn(iconSizeClassName, resolved.iconRight)}>{resolvedIcon.right}</span>}
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
