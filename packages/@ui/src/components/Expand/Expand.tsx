"use client";

import * as React from "react";
import { useToggleState, ToggleState } from "react-stately";
import { useButton, useFocusRing, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import { Divider, DividerProps } from "@/components/Divider";
import styles from "./Expand.module.css";
import { FaChevronDown } from "react-icons/fa6";

interface ExpandContextValue {
  state: ToggleState;
  isDisabled: boolean;
}

const ExpandContext = React.createContext<ExpandContextValue | null>(null);

const useExpandContext = () => {
  const context = React.useContext(ExpandContext);
  if (!context) {
    throw new Error(
      "Expand compound components must be used within an Expand component",
    );
  }
  return context;
};

// --- Sub-components ---

export interface ExpandIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Custom icon element; defaults to a chevron */
  children?: React.ReactNode;
}

const ExpandIcon = React.forwardRef<HTMLSpanElement, ExpandIconProps>(
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
ExpandIcon.displayName = "Expand.Icon";

export interface ExpandTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  /** Label or content of the trigger button */
  children?: React.ReactNode;
  /** ReactNode label rendered in the title span (overrides HTML title tooltip) */
  title?: React.ReactNode;
}

const ExpandTrigger = React.forwardRef<HTMLButtonElement, ExpandTriggerProps>(
  ({ children, className, title, ...props }, ref) => {
    const { state, isDisabled } = useExpandContext();
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

    // If children contains React elements, render as a transparent div wrapper.
    // The child element (e.g. <Group.Button>) owns its own toggle logic and styling.
    const hasElementChildren = React.Children.toArray(children).some(
      (child) => React.isValidElement(child),
    );

    if (hasElementChildren) {
      return (
        <div
          className={cn(styles.trigger, className)}
          data-expanded={state.isSelected || undefined}
        >
          {children}
        </div>
      );
    }

    // Default: styled button with title span + auto-injected chevron
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
        <span className={styles.title}>{title ?? children}</span>
        <ExpandIcon />
      </button>
    );
  },
);
ExpandTrigger.displayName = "Expand.Trigger";

export interface ExpandContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content shown when the expand is open */
  children: React.ReactNode;
  /** Direction the content reveals from the trigger */
  from?: "below" | "above" | "left" | "right";
}

const ExpandContent = React.forwardRef<HTMLDivElement, ExpandContentProps>(
  ({ children, className, from, ...props }, ref) => {
    const { state } = useExpandContext();

    return (
      <div
        ref={ref}
        className={cn(styles.content, className)}
        data-expanded={state.isSelected || undefined}
        data-from={from && from !== "below" ? from : undefined}
        aria-hidden={!state.isSelected}
        {...props}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>
    );
  },
);
ExpandContent.displayName = "Expand.Content";

// Updated ExpandDivider to allow customization
const ExpandDivider = React.forwardRef<HTMLDivElement, DividerProps>(
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
ExpandDivider.displayName = "Expand.Divider";

// --- Main Expand Component ---

export interface ExpandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  /** Header text or element for the trigger button in preset (non-compound) mode */
  title?: React.ReactNode;
  /** Controlled expanded state */
  isExpanded?: boolean;
  /** Initial expanded state for uncontrolled usage */
  defaultExpanded?: boolean;
  /** Called when the expanded state changes */
  onExpandedChange?: (isExpanded: boolean) => void;
  /** Alias for onExpandedChange */
  onChange?: (isExpanded: boolean) => void;
  /** Whether the expand is disabled */
  isDisabled?: boolean;
  /** Compound sub-components or content nodes */
  children?: React.ReactNode;
  /** Additional CSS class for the trigger button */
  triggerClassName?: string;
  /** Additional CSS class for the content area */
  contentClassName?: string;
}

const ExpandRoot = React.forwardRef<HTMLDivElement, ExpandProps>(
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

    const { title, triggerClassName, contentClassName, ...divProps } = props;

    return (
      <ExpandContext.Provider value={{ state, isDisabled }}>
        <div
          ref={ref}
          className={cn("expand", styles.expand, className)}
          data-disabled={isDisabled || undefined}
          {...divProps}
        >
          {children}
        </div>
      </ExpandContext.Provider>
    );
  },
);
ExpandRoot.displayName = "Expand";

// Compatibility wrapper to support both old API and new Compound API
const Expand = React.forwardRef<
  HTMLDivElement,
  ExpandProps & {
    Trigger?: typeof ExpandTrigger;
    Content?: typeof ExpandContent;
    Divider?: typeof ExpandDivider;
    Icon?: typeof ExpandIcon;
  }
>((props, ref) => {
  const { title, children, triggerClassName, contentClassName, ...rootProps } =
    props;

  // If title is provided, use the "Preset" structure (Backward Compatibility)
  if (title !== undefined) {
    const childrenArray = React.Children.toArray(children);
    const customDivider = childrenArray.find(
      (child) => React.isValidElement(child) && child.type === ExpandDivider,
    );
    const filteredChildren = childrenArray.filter(
      (child) => !(React.isValidElement(child) && child.type === ExpandDivider),
    );

    return (
      <ExpandRoot ref={ref} {...rootProps}>
        <ExpandTrigger className={triggerClassName}>{title}</ExpandTrigger>
        {customDivider || <ExpandDivider />}
        <ExpandContent className={contentClassName}>
          {filteredChildren}
        </ExpandContent>
      </ExpandRoot>
    );
  }

  // Otherwise, use Compound structure (children are expected to include Trigger/Content/Divider)
  return (
    <ExpandRoot ref={ref} {...rootProps}>
      {children}
    </ExpandRoot>
  );
}) as React.ForwardRefExoticComponent<
  ExpandProps & React.RefAttributes<HTMLDivElement>
> & {
  Trigger: typeof ExpandTrigger;
  Content: typeof ExpandContent;
  Divider: typeof ExpandDivider;
  Icon: typeof ExpandIcon;
};

Expand.displayName = "Expand";

// Attach sub-components
Expand.Trigger = ExpandTrigger;
Expand.Content = ExpandContent;
Expand.Divider = ExpandDivider;
Expand.Icon = ExpandIcon;

export { Expand };
