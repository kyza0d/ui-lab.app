"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Popover } from "@/components/Popover";
import styles from "./Anchor.module.css";

// --- Sub-components ---

export interface AnchorPreviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AnchorPreview = React.forwardRef<HTMLDivElement, AnchorPreviewProps>(
  ({ children }, ref) => {
    // This component just holds the preview content
    // It renders nothing itself
    return <div ref={ref} style={{ display: "none" }}>{children}</div>;
  },
);
AnchorPreview.displayName = "Anchor.Preview";

// --- Main Anchor Component ---

export interface AnchorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  children?: React.ReactNode;
  className?: string;
}

const AnchorRoot = React.forwardRef<HTMLDivElement, AnchorProps>(
  ({ className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    let previewContent: React.ReactNode = null;
    const childrenArray = React.Children.toArray(children);

    // Extract preview content and filter it out from rendered children
    const filteredChildren = childrenArray.filter((child) => {
      if (
        React.isValidElement<AnchorPreviewProps>(child) &&
        child.type === AnchorPreview
      ) {
        previewContent = child.props.children;
        return false;
      }
      return true;
    });

    return (
      <Popover
        ref={ref || triggerRef}
        content={previewContent}
        showArrow={true}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        position="bottom"
        className={cn('preview', styles.preview, className)}
        {...props}
      >
        <span className={cn('trigger', styles.trigger)}>{filteredChildren}</span>
      </Popover>
    );
  },
);
AnchorRoot.displayName = "Anchor";

// Compound component with attached sub-components
const Anchor = React.forwardRef<HTMLDivElement, AnchorProps & { Preview?: typeof AnchorPreview; }>((props, ref) => {
  return <AnchorRoot ref={ref} {...props} />;
}) as React.ForwardRefExoticComponent<AnchorProps & React.RefAttributes<HTMLDivElement>> & { Preview: typeof AnchorPreview };

Anchor.displayName = "Anchor";
Anchor.Preview = AnchorPreview;

export { Anchor };
