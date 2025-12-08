"use client"

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { HiX } from "react-icons/hi";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  onBackdropClick?: boolean;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

/**
 * Modal component that displays content in a centered dialog with a backdrop overlay.
 * Supports blocking interactions outside the modal and customizable sizing.
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      closeButton = true,
      size = "md",
      onBackdropClick = true,
      className,
      contentClassName,
      overlayClassName,
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Use combined refs
    React.useImperativeHandle(ref, () => modalRef.current as HTMLDivElement);

    /**
     * Handle mount to prevent hydration issues
     */
    useEffect(() => {
      setMounted(true);
    }, []);

    /**
     * Handle escape key to close modal
     */
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose]);

    /**
     * Prevent body scroll when modal is open
     */
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "unset";
        };
      }
    }, [isOpen]);

    if (!mounted || !isOpen) {
      return null;
    }

    const handleBackdropClick = () => {
      if (onBackdropClick) {
        onClose();
      }
    };

    return createPortal(
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          overlayClassName
        )}
        onClick={handleBackdropClick}
      >
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Modal content */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative w-full mx-4 bg-background-900 rounded-lg border border-background-700 shadow-xl",
            sizeClasses[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || closeButton) && (
            <div className="flex items-center justify-between border-b border-background-700 p-4">
              {title && (
                <h4 className="font-semibold">
                  {title}
                </h4>
              )}
              {!title && closeButton && <div className="flex-1" />}
              {closeButton && (
                <button
                  onClick={onClose}
                  className="ml-auto text-foreground-500 hover:text-foreground-200 transition-colors p-1"
                  aria-label="Close modal"
                >
                  <HiX className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={cn("px-4 py-4", contentClassName)}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-background-700 p-2">
              {footer}
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = "Modal";

export { Modal };
