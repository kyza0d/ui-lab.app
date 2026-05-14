"use client";

import * as React from "react";

import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useToggleState, type ToggleState } from "react-stately";
import { ChevronDown } from "lucide-react";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { Divider, type DividerProps } from "@/components/Divider";
import { useFocus } from "@/hooks/useFocus";
import { useMergeRefs } from "@/hooks/useMergeRefs";
import styles from "./Expand.module.css";

type ExpandDirection = "below" | "above" | "left" | "right";

interface ExpandIconStyles {
  collapsed?: StyleValue;
  expanded?: StyleValue;
}

export interface ExpandStyleSlots {
  root?: StyleValue;
  trigger?: StyleValue;
  icon?: StyleValue | ExpandIconStyles;
  title?: StyleValue;
  content?: StyleValue;
  contentInner?: StyleValue;
  divider?: StyleValue;
}

export type ExpandStylesProp = StylesProp<ExpandStyleSlots>;

const resolveExpandBaseStyles = createStylesResolver([
  "root",
  "trigger",
  "icon",
  "iconCollapsed",
  "iconExpanded",
  "title",
  "content",
  "contentInner",
  "divider",
] as const);

function resolveExpandStyles(stylesProp: ExpandStylesProp | undefined) {
  if (!stylesProp || typeof stylesProp === "string" || Array.isArray(stylesProp)) {
    return resolveExpandBaseStyles(stylesProp);
  }

  const { root, trigger, icon, title, content, contentInner, divider } = stylesProp;

  let iconClassName: StyleValue | undefined;
  let iconCollapsed: StyleValue | undefined;
  let iconExpanded: StyleValue | undefined;

  if (icon) {
    if (typeof icon === "string" || Array.isArray(icon)) {
      iconClassName = icon;
      iconCollapsed = icon;
      iconExpanded = icon;
    } else {
      iconCollapsed = icon.collapsed;
      iconExpanded = icon.expanded;
    }
  }

  return resolveExpandBaseStyles({
    root,
    trigger,
    icon: iconClassName,
    iconCollapsed,
    iconExpanded,
    title,
    content,
    contentInner,
    divider,
  });
}

interface ExpandContextValue {
  state: ToggleState;
  isDisabled: boolean;
  resolvedStyles: ReturnType<typeof resolveExpandStyles>;
}

const ExpandContext = React.createContext<ExpandContextValue | null>(null);

function useExpandContext() {
  const context = React.useContext(ExpandContext);
  if (!context) {
    throw new Error("Expand compound components must be used within Expand");
  }

  return context;
}

export interface ExpandIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Custom icon element rendered inside the icon wrapper */
  children?: React.ReactNode;
}

const ExpandIcon = React.forwardRef<HTMLSpanElement, ExpandIconProps>(
  ({ children, className, ...props }, ref) => {
    const { state, resolvedStyles } = useExpandContext();

    return (
      <span
        ref={ref}
        className={cn(
          "icon",
          styles.icon,
          resolvedStyles.icon,
          state.isSelected ? resolvedStyles.iconExpanded : resolvedStyles.iconCollapsed,
          className,
        )}
        data-selected={state.isSelected ? "true" : undefined}
        data-expanded={state.isSelected ? "true" : undefined}
        aria-hidden="true"
        {...props}
      >
        {children ?? <ChevronDown size={16} />}
      </span>
    );
  },
);
ExpandIcon.displayName = "Expand.Icon";

interface ExpandTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  /** Label or content rendered inside the trigger */
  children?: React.ReactNode;
  /** Optional title element rendered in the trigger's text slot */
  title?: React.ReactNode;
}

const ExpandTrigger = React.forwardRef<HTMLButtonElement, ExpandTriggerProps>(
  ({ children, className, title, ...props }, ref) => {
    const { state, isDisabled, resolvedStyles } = useExpandContext();
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const mergedRef = useMergeRefs(triggerRef, ref);

    const { buttonProps, isPressed } = useButton(
      {
        isDisabled,
        onPress: () => state.toggle(),
      },
      triggerRef,
    );
    const { focusProps, isFocused, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled });

    const hasElementChildren = React.Children.toArray(children).some(
      (child) => React.isValidElement(child),
    );
    const shouldRenderCompositeLabel = title !== undefined || !hasElementChildren;

    return (
      <button
        ref={mergedRef}
        {...mergeProps(buttonProps, focusProps, hoverProps, props)}
        className={cn(
          "trigger",
          styles.trigger,
          resolvedStyles.trigger,
          className,
        )}
        type="button"
        aria-expanded={state.isSelected}
        data-selected={state.isSelected ? "true" : undefined}
        data-expanded={state.isSelected ? "true" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
        data-focused={isFocused ? "true" : undefined}
        data-focus-visible={isFocusVisible ? "true" : undefined}
        data-pressed={isPressed ? "true" : undefined}
        data-hovered={isHovered ? "true" : undefined}
        data-expand-focus-surface="true"
      >
        {shouldRenderCompositeLabel ? (
          <>
            <span
              className={cn("title", styles.title, resolvedStyles.title)}
            >
              {title ?? children}
            </span>
            <ExpandIcon />
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);
ExpandTrigger.displayName = "Expand.Trigger";

export interface ExpandContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content shown when the expand is open */
  children: React.ReactNode;
  /** Direction the content reveals from the trigger */
  from?: ExpandDirection;
}

const ExpandContent = React.forwardRef<HTMLDivElement, ExpandContentProps>(
  ({ children, className, from, ...props }, ref) => {
    const { state, resolvedStyles } = useExpandContext();

    return (
      <div
        ref={ref}
        className={cn(
          "content",
          styles.content,
          resolvedStyles.content,
          className,
        )}
        data-selected={state.isSelected ? "true" : undefined}
        data-expanded={state.isSelected ? "true" : undefined}
        data-from={from && from !== "below" ? from : undefined}
        aria-hidden={!state.isSelected}
        {...props}
      >
        <div
          className={cn(
            "content-inner",
            styles["content-inner"],
            resolvedStyles.contentInner,
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);
ExpandContent.displayName = "Expand.Content";

const ExpandDivider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, spacing = "none", styles: dividerStyles, ...props }, ref) => {
    const { resolvedStyles } = useExpandContext();

    return (
      <Divider
        ref={ref}
        spacing={spacing}
        styles={dividerStyles}
        className={cn("divider", styles.divider, resolvedStyles.divider, className)}
        {...props}
      />
    );
  },
);
ExpandDivider.displayName = "Expand.Divider";

function isExpandDivider(child: React.ReactNode): child is React.ReactElement<DividerProps> {
  return React.isValidElement(child) && child.type === ExpandDivider;
}

function isExpandContent(child: React.ReactNode): child is React.ReactElement<ExpandContentProps> {
  return React.isValidElement(child) && child.type === ExpandContent;
}

function prependContentChildren(
  content: React.ReactElement<ExpandContentProps>,
  prefix: React.ReactNode,
) {
  return React.cloneElement(content, undefined, (
    <>
      {prefix}
      {content.props.children}
    </>
  ));
}

function moveDividersIntoContent(childrenArray: React.ReactNode[]) {
  const normalizedChildren: React.ReactNode[] = [];

  for (let index = 0; index < childrenArray.length; index += 1) {
    const child = childrenArray[index];
    const nextChild = childrenArray[index + 1];

    if (isExpandDivider(child) && isExpandContent(nextChild)) {
      normalizedChildren.push(prependContentChildren(nextChild, child));
      index += 1;
      continue;
    }

    normalizedChildren.push(child);
  }

  return normalizedChildren;
}

export interface ExpandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  /** Header content rendered in preset mode */
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
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: ExpandStylesProp;
}

const ExpandRoot = React.forwardRef<HTMLDivElement, ExpandProps>(
  (
    {
      className,
      title,
      isExpanded,
      defaultExpanded = false,
      onExpandedChange,
      onChange,
      isDisabled = false,
      children,
      styles: stylesProp,
      ...props
    },
    ref,
  ) => {
    const state = useToggleState({
      isSelected: isExpanded,
      defaultSelected: defaultExpanded,
      onChange: onExpandedChange ?? onChange,
    });

    const resolvedStyles = resolveExpandStyles(stylesProp);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const scopeRef = React.useRef<HTMLDivElement>(null);
    const mergedRootRef = useMergeRefs(rootRef, ref);
    const childrenArray = React.Children.toArray(children);

    const { scopeProps, indicatorProps } = useFocus({
      scopeRef,
      containerRef: rootRef,
      surfaceSelector: '[data-expand-focus-surface="true"]',
      radiusSource: "surface",
      mode: "ring",
    });

    const contextValue = React.useMemo<ExpandContextValue>(
      () => ({
        state,
        isDisabled,
        resolvedStyles,
      }),
      [state, isDisabled, resolvedStyles],
    );

    return (
      <ExpandContext.Provider value={contextValue}>
        <div ref={scopeRef} className={cn("expand-scope", scopeProps.className, styles.scope)}>
          <div {...indicatorProps} data-focus-indicator="local" />
          <div
            ref={mergedRootRef}
            className={cn("expand", styles.expand, className, resolvedStyles.root)}
            data-selected={state.isSelected ? "true" : undefined}
            data-expanded={state.isSelected ? "true" : undefined}
            data-disabled={isDisabled ? "true" : undefined}
            {...props}
          >
            {title !== undefined ? (
              <>
                <ExpandTrigger>{title}</ExpandTrigger>
                <ExpandContent>
                  {childrenArray.find(isExpandDivider) ?? <ExpandDivider />}
                  {childrenArray.filter((child) => !isExpandDivider(child))}
                </ExpandContent>
              </>
            ) : (
              moveDividersIntoContent(childrenArray)
            )}
          </div>
        </div>
      </ExpandContext.Provider>
    );
  },
);
ExpandRoot.displayName = "Expand";

const Expand = Object.assign(ExpandRoot, {
  Trigger: ExpandTrigger,
  Content: ExpandContent,
  Divider: ExpandDivider,
  Icon: ExpandIcon,
});

Expand.displayName = "Expand";

export { Expand };
