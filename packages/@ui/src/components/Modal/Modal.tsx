"use client"

import * as React from "react";
import { createPortal } from "react-dom";
import { useDialog, useModalOverlay, mergeProps } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { cn } from "@/lib/utils";
import { HiX } from "react-icons/hi";
import styles from "./Modal.module.css";

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
}

const sizeClasses: Record<string, string> = {
  fit: (styles as any)["size-fit"],
  auto: (styles as any)["size-auto"],
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
    },
    ref
  ) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = React.useState(false);

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

    // useModalOverlay handles focus management, scroll prevention, and backdrop interaction
    const { modalProps, underlayProps } = useModalOverlay(
      {
        isDismissable: isDismissable,
        isKeyboardDismissDisabled: isKeyboardDismissDisabled,
      },
      state,
      modalRef
    );

    if (!mounted || !state.isOpen) {
      return null;
    }

    const handleClose = () => {
      state.close();
    };

    return createPortal(
      <div
        className={cn(
          "fixed inset-0 z-9999 flex items-center justify-center",
          styles.overlay,
          overlayClassName
        )}
      >
        {/* Backdrop overlay - underlayProps handles click outside and escape key */}
        <div
          {...underlayProps}
          className={cn(styles.backdrop)}
        />

        {/* Modal content */}
        <div
          {...mergeProps(dialogProps, modalProps)}
          ref={modalRef}
          className={cn(
            styles.modal,
            sizeClasses[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          data-open={state.isOpen || undefined}
        >
          {/* Header */}
          {(title || closeButton) && (
            <div className={styles.header}>
              {title && (
                <h4 {...titleProps} className={styles.title}>
                  {title}
                </h4>
              )}
              {!title && closeButton && <div className={styles.spacer} />}
              {closeButton && (
                <button
                  onClick={handleClose}
                  className={styles.closeButton}
                  aria-label="Close modal"
                >
                  <HiX className={styles.closeIcon} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={cn(styles.content, contentClassName)}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={styles.footer}>
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
  <div ref={ref} className={styles.header} {...props}>
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
  <div ref={ref} className={styles.content} {...props}>
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
  <div ref={ref} className={cn('footer', styles.footer)} {...props}>
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
