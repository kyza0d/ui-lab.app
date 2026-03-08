"use client"

import * as React from "react";
import { createPortal } from "react-dom";
import { useDialog } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { X } from "lucide-react";
import css from "./Modal.module.css";

const useModalKeyboard = (
  ref: React.RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  isDismissable: boolean,
  isKeyboardDismissDisabled: boolean,
  onClose: () => void
) => {
  React.useEffect(() => {
    if (!isOpen || !ref.current) return;

    ref.current.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDismissable && !isKeyboardDismissDisabled) {
        e.preventDefault();
        onClose();
      }
    };

    ref.current.addEventListener("keydown", handleKeyDown);
    return () => ref.current?.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDismissable, isKeyboardDismissDisabled, onClose]);
};

export interface ModalStyleSlots {
  root?: StyleValue;
  overlay?: StyleValue;
  backdrop?: StyleValue;
  header?: StyleValue;
  title?: StyleValue;
  spacer?: StyleValue;
  closeButton?: StyleValue;
  closeIcon?: StyleValue;
  content?: StyleValue;
  footer?: StyleValue;
}

export type ModalStylesProp = StylesProp<ModalStyleSlots>;

const resolveModalBaseStyles = createStylesResolver([
  'root', 'overlay', 'backdrop', 'header', 'title', 'spacer', 'closeButton', 'closeIcon', 'content', 'footer'
] as const);

export interface ModalProps {
  /** Whether the modal is open */
  isOpen?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Optional title rendered in the modal header bar */
  title?: React.ReactNode;
  /** Modal body content */
  children: React.ReactNode;
  /** Optional footer content rendered below the body */
  footer?: React.ReactNode;
  /** Whether to show the X close button in the header */
  closeButton?: boolean;
  /** Controls modal width: "fit" adapts to content, "auto" uses default width */
  size?: "fit" | "auto";
  /** Whether clicking the backdrop dismisses the modal */
  isDismissable?: boolean;
  /** Prevents the Escape key from dismissing the modal */
  isKeyboardDismissDisabled?: boolean;
  /** Additional class for the modal panel */
  className?: string;
  /** Additional class for the inner content area */
  contentClassName?: string;
  /** Additional class for the backdrop overlay */
  overlayClassName?: string;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: ModalStylesProp;
}

const sizeClasses: Record<string, string> = {
  fit: (css as any)["size-fit"],
  auto: (css as any)["size-auto"],
};

/**
 * Modal component that displays content in a centered dialog with a backdrop overlay.
 * Built with React Aria for full accessibility support including focus management,
 * keyboard handling, and screen reader announcements.
 */
const ModalBase = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen: controlledIsOpen,
      onOpenChange,
      title,
      children,
      footer,
      closeButton = true,
      size = "auto",
      isDismissable = true,
      isKeyboardDismissDisabled = false,
      className,
      contentClassName,
      overlayClassName,
      styles,
    },
    ref
  ) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = React.useState(false);

    const resolved = resolveModalBaseStyles(styles);

    // Use uncontrolled state management via useOverlayTriggerState
    const state = useOverlayTriggerState({
      isOpen: controlledIsOpen,
      onOpenChange: onOpenChange,
    });

    // Handle mount to prevent hydration issues
    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Use forwardRef callback to expose modalRef
    React.useImperativeHandle(ref, () => modalRef.current as HTMLDivElement);

    // Handle keyboard events and auto-focus
    useModalKeyboard(
      modalRef,
      state.isOpen,
      isDismissable,
      isKeyboardDismissDisabled,
      () => state.close()
    );

    // useDialog hook provides accessibility attributes and title handling
    const { dialogProps, titleProps } = useDialog({}, modalRef);

    if (!mounted || !state.isOpen) return null;

    const handleClose = () => state.close();

    return createPortal(
      <div
        className={cn(
          "fixed inset-0 z-9999 flex items-center justify-center",
          css.overlay,
          overlayClassName,
          resolved.overlay
        )}
      >
        {/* Backdrop overlay - click outside to dismiss */}
        <div
          className={cn(css.backdrop, resolved.backdrop)}
          onMouseDown={() => { if (isDismissable) state.close(); }}
        />

        {/* Modal content */}
        <div
          {...dialogProps}
          aria-modal="true"
          ref={modalRef}
          className={cn(
            css.modal,
            sizeClasses[size],
            className,
            resolved.root
          )}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          data-open={state.isOpen || undefined}
        >
          {/* Header */}
          {(title || closeButton) && (
            <div className={cn(css.header, resolved.header)}>
              {title && (
                <h4 {...titleProps} className={cn(css.title, resolved.title)}>
                  {title}
                </h4>
              )}
              {!title && closeButton && <div className={cn(css.spacer, resolved.spacer)} />}
              {closeButton && (
                <button
                  onClick={handleClose}
                  className={cn(css.closeButton, resolved.closeButton)}
                  aria-label="Close modal"
                >
                  <X className={cn(css.closeIcon, resolved.closeIcon)} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={cn(css.content, contentClassName, resolved.content)}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={cn(css.footer, resolved.footer)}>
              {footer}
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  }
);

ModalBase.displayName = "Modal";

/**
 * ModalHeader component for use with compound Modal pattern
 */
const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ children, ...props }, ref) => (
  <div ref={ref} className={css.header} {...props}>
    {children}
  </div>
));

ModalHeader.displayName = "Modal.Header";

/**
 * ModalBody component for use with compound Modal pattern
 */
const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ children, ...props }, ref) => (
  <div ref={ref} className={css.content} {...props}>
    {children}
  </div>
));

ModalBody.displayName = "Modal.Body";

/**
 * ModalFooter component for use with compound Modal pattern
 */
const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ children, ...props }, ref) => (
  <div ref={ref} className={cn('footer', css.footer)} {...props}>
    {children}
  </div>
));

ModalFooter.displayName = "Modal.Footer";

const Modal = Object.assign(ModalBase, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});

export { Modal, ModalHeader, ModalBody, ModalFooter };
