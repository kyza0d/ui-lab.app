"use client"

import * as React from "react";
import { createPortal } from "react-dom";
import { useDialog } from "react-aria";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "react-stately";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { asElementProps } from "@/lib/react-aria";
import { X } from "lucide-react";
import css from "./Modal.module.css";

const useModalKeyboard = (
  ref: React.RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  isDismissable: boolean,
  isKeyboardDismissDisabled: boolean,
  onClose: () => void
) => {
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  React.useEffect(() => {
    if (!isOpen || !ref.current) return;

    ref.current.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDismissable && !isKeyboardDismissDisabled) {
        e.preventDefault();
        onCloseRef.current();
      }
    };

    ref.current.addEventListener("keydown", handleKeyDown);
    return () => ref.current?.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDismissable, isKeyboardDismissDisabled]);
};

export interface ModalStyleSlots {
  root?: StyleValue;
  overlay?: StyleValue;
  backdrop?: StyleValue;
  header?: StyleValue;
  title?: StyleValue;
  spacer?: StyleValue;
  close?: StyleValue;
  closeIcon?: StyleValue;
  content?: StyleValue;
  footer?: StyleValue;
}

export type ModalStylesProp = StylesProp<ModalStyleSlots>;

const resolveModalBaseStyles = createStylesResolver([
  'root', 'overlay', 'backdrop', 'header', 'title', 'spacer', 'close', 'closeIcon', 'content', 'footer'
] as const);

function resolveModalStyles(styles: ModalStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveModalBaseStyles(styles);
  const { root, overlay, backdrop, header, title, spacer, close, closeIcon, content, footer } = styles;
  return resolveModalBaseStyles({ root, overlay, backdrop, header, title, spacer, close, closeIcon, content, footer });
}

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
  close?: boolean;
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
      close = true,
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
    const [isClosePressed, setIsClosePressed] = React.useState(false);
    const [isCloseHovered, setIsCloseHovered] = React.useState(false);
    const [isCloseFocused, setIsCloseFocused] = React.useState(false);
    const [isCloseFocusVisible, setIsCloseFocusVisible] = React.useState(false);

    const resolved = resolveModalStyles(styles);

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
    const { focusProps: modalFocusProps, isFocused: isModalFocused, isFocusVisible: isModalFocusVisible } = useFocusRing();

    if (!mounted || !state.isOpen) return null;

    const handleClose = () => state.close();
    const handleCloseMouseDown = () => setIsClosePressed(true);
    const handleCloseMouseUp = () => setIsClosePressed(false);
    const handleCloseMouseLeave = () => {
      setIsClosePressed(false);
      setIsCloseHovered(false);
    };
    const handleCloseMouseEnter = () => setIsCloseHovered(true);
    const handleCloseFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
      setIsCloseFocused(true);
      setIsCloseFocusVisible(event.currentTarget.matches(":focus-visible"));
    };
    const handleCloseBlur = () => {
      setIsCloseFocused(false);
      setIsCloseFocusVisible(false);
    };

    return createPortal(
      <div
        className={cn(
          "modal",
          "overlay",
          "fixed inset-0 z-9999 flex items-center justify-center",
          css.overlay,
          overlayClassName,
          resolved.overlay
        )}
      >
        {/* Backdrop overlay - click outside to dismiss */}
        <div
          className={cn("modal", "backdrop", css.backdrop, resolved.backdrop)}
          onMouseDown={() => { if (isDismissable) state.close(); }}
        />

        {/* Modal content */}
        <div
          {...asElementProps<"div">(mergeProps(dialogProps, modalFocusProps))}
          aria-modal="true"
          ref={modalRef}
          className={cn(
            "modal",
            css.modal,
            className,
            resolved.root
          )}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          data-open={state.isOpen || undefined}
          data-size={size}
          data-focused={isModalFocused ? "true" : "false"}
          data-focus-visible={isModalFocusVisible ? "true" : "false"}
        >
          {/* Header */}
          {(title || close) && (
            <div className={cn("modal", "header", css.header, resolved.header)}>
              {title && (
                <h4 {...asElementProps<"h4">(titleProps)} className={cn("modal", "title", css.title, resolved.title)}>
                  {title}
                </h4>
              )}
              {!title && close && <div className={cn("modal", "spacer", css.spacer, resolved.spacer)} />}
              {close && (
                <button
                  onClick={handleClose}
                  onMouseDown={handleCloseMouseDown}
                  onMouseEnter={handleCloseMouseEnter}
                  onMouseUp={handleCloseMouseUp}
                  onMouseLeave={handleCloseMouseLeave}
                  onFocus={handleCloseFocus}
                  onBlur={handleCloseBlur}
                  className={cn("modal", "close", css.close, resolved.close)}
                  aria-label="Close modal"
                  type="button"
                  data-pressed={isClosePressed ? "true" : "false"}
                  data-hovered={isCloseHovered ? "true" : "false"}
                  data-focused={isCloseFocused ? "true" : "false"}
                  data-focus-visible={isCloseFocusVisible ? "true" : "false"}
                >
                  <X className={cn("modal", "close-icon", css["close-icon"], resolved.closeIcon)} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={cn("modal", "content", css.content, contentClassName, resolved.content)}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={cn("modal", "footer", css.footer, resolved.footer)}>
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
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("modal", "header", css.header, className)} {...props}>
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
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("modal", "content", css.content, className)} {...props}>
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
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("modal", "footer", css.footer, className)} {...props}>
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
