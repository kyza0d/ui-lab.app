"use client";

import * as React from "react";
import { useToggleState, ToggleState } from "react-stately";
import { useButton, useFocusRing, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import { Divider, DividerProps } from "@/components/Divider";
import styles from "./Fold.module.css";
import { FaChevronDown } from "react-icons/fa6";

interface FoldContextValue {
  state: ToggleState;
  isDisabled: boolean;
}

const FoldContext = React.createContext<FoldContextValue | null>(null);

const useFoldContext = () => {
  const context = React.useContext(FoldContext);
  if (!context) {
    throw new Error(
      "Fold compound components must be used within a Fold component",
    );
  }
  return context;
};

// --- Sub-components ---

export interface FoldIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const FoldIcon = React.forwardRef<HTMLSpanElement, FoldIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(styles.icon, className)} {...props}>
        {children ?? (
          <FaChevronDown size={11} className="text-foreground-400" />
        )}
      </span>
    );
  },
);
FoldIcon.displayName = "Fold.Icon";

export interface FoldTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const FoldTrigger = React.forwardRef<HTMLButtonElement, FoldTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const { state, isDisabled } = useFoldContext();
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    React.useImperativeHandle(
      ref,
      () => triggerRef.current as HTMLButtonElement,
    );

    const { buttonProps, isPressed } = useButton(
      {
        isDisabled,
        onPress: () => state.toggle(),
        // Filter out form-related props that useButton doesn't support
        ...Object.fromEntries(
          Object.entries(props).filter(
            ([key]) =>
              ![
                "formAction",
                "formEncType",
                "formMethod",
                "formNoValidate",
                "formTarget",
              ].includes(key),
          ),
        ),
      },
      triggerRef,
    );

    const { focusProps, isFocused, isFocusVisible } = useFocusRing();

    return (
      <button
        ref={triggerRef}
        {...mergeProps(buttonProps, focusProps)}
        className={cn(styles.trigger, className)}
        aria-expanded={state.isSelected}
        data-expanded={state.isSelected || undefined}
        data-disabled={isDisabled || undefined}
        data-focused={isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-pressed={isPressed || undefined}
      >
        <span className={styles.title}>{children}</span>
        <FoldIcon />
      </button>
    );
  },
);
FoldTrigger.displayName = "Fold.Trigger";

export interface FoldContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FoldContent = React.forwardRef<HTMLDivElement, FoldContentProps>(
  ({ children, className, ...props }, ref) => {
    const { state } = useFoldContext();

    return (
      <div
        ref={ref}
        className={cn(styles.content, className)}
        data-expanded={state.isSelected || undefined}
        aria-hidden={!state.isSelected}
        {...props}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>
    );
  },
);
FoldContent.displayName = "Fold.Content";

// Updated FoldDivider to allow customization
const FoldDivider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, spacing = "none", ...props }, ref) => {
    return (
      <Divider
        ref={ref}
        className={cn("mt-2", className)}
        spacing={spacing}
        {...props}
      />
    );
  },
);
FoldDivider.displayName = "Fold.Divider";

// --- Main Fold Component ---

export interface FoldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  title?: React.ReactNode; // Made optional for compound usage
  isExpanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (isExpanded: boolean) => void;
  onChange?: (isExpanded: boolean) => void;
  isDisabled?: boolean;
  children?: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
}

const FoldRoot = React.forwardRef<HTMLDivElement, FoldProps>(
  (
    {
      isExpanded,
      defaultExpanded = false,
      onExpandedChange,
      onChange,
      isDisabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const state = useToggleState({
      isSelected: isExpanded,
      defaultSelected: defaultExpanded,
      onChange: onExpandedChange || onChange,
    });

    const { title, ...divProps } = props;

    return (
      <FoldContext.Provider value={{ state, isDisabled }}>
        <div
          ref={ref}
          className={cn("fold", styles.fold, className)}
          data-disabled={isDisabled || undefined}
          {...divProps}
        >
          {children}
        </div>
      </FoldContext.Provider>
    );
  },
);
FoldRoot.displayName = "Fold";

// Compatibility wrapper to support both old API and new Compound API
const Fold = React.forwardRef<
  HTMLDivElement,
  FoldProps & {
    Trigger?: typeof FoldTrigger;
    Content?: typeof FoldContent;
    Divider?: typeof FoldDivider;
    Icon?: typeof FoldIcon;
  }
>((props, ref) => {
  const { title, children, triggerClassName, contentClassName, ...rootProps } =
    props;

  // If title is provided, use the "Preset" structure (Backward Compatibility)
  if (title !== undefined) {
    const childrenArray = React.Children.toArray(children);
    const customDivider = childrenArray.find(
      (child) => React.isValidElement(child) && child.type === FoldDivider,
    );
    const filteredChildren = childrenArray.filter(
      (child) => !(React.isValidElement(child) && child.type === FoldDivider),
    );

    return (
      <FoldRoot ref={ref} {...rootProps}>
        <FoldTrigger className={triggerClassName}>{title}</FoldTrigger>
        {customDivider || <FoldDivider />}
        <FoldContent className={contentClassName}>
          {filteredChildren}
        </FoldContent>
      </FoldRoot>
    );
  }

  // Otherwise, use Compound structure (children are expected to include Trigger/Content/Divider)
  return (
    <FoldRoot ref={ref} {...rootProps}>
      {children}
    </FoldRoot>
  );
}) as React.ForwardRefExoticComponent<
  FoldProps & React.RefAttributes<HTMLDivElement>
> & {
  Trigger: typeof FoldTrigger;
  Content: typeof FoldContent;
  Divider: typeof FoldDivider;
  Icon: typeof FoldIcon;
};

Fold.displayName = "Fold";

// Attach sub-components
Fold.Trigger = FoldTrigger;
Fold.Content = FoldContent;
Fold.Divider = FoldDivider;
Fold.Icon = FoldIcon;

export { Fold };
