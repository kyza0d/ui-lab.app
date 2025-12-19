"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ToastProps as ToastData } from "./Toast.Store";
import { dispatch } from "./Toast.Store";
import { FaCircleExclamation, FaCircleCheck, FaCircleInfo, FaTriangleExclamation } from 'react-icons/fa6';
import { HiX } from 'react-icons/hi';

const toastVariants = cva(
  'w-full max-w-sm border rounded-lg shadow-lg flex items-start gap-3 pointer-events-auto p-3',
  {
    variants: {
      variant: {
        default: 'bg-background-900 border-background-600 text-foreground-200',
        destructive: 'bg-danger-50 border-danger-500/50 text-danger-900',
        success: 'bg-success-50 border-success-500/50 text-success-900',
        info: 'bg-info-50 border-info-500/50 text-info-900',
        warning: 'bg-warning-50 border-warning-500/50 text-warning-900',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const titleVariants = cva('font-semibold text-lg', {
  variants: {
    variant: {
      default: 'text-foreground-50',
      destructive: 'text-danger-950',
      success: 'text-success-950',
      info: 'text-info-950',
      warning: 'text-warning-950',
    },
  },
  defaultVariants: { variant: 'default' },
});

const descriptionVariants = cva('text-sm opacity-90 mt-1', {
  variants: {
    variant: {
      default: 'text-foreground-300',
      destructive: 'text-danger-950',
      success: 'text-success-950',
      info: 'text-info-950',
      warning: 'text-warning-950',
    },
  },
  defaultVariants: { variant: 'default' },
});

const closeButtonVariants = cva(
  'ml-3 p-2 -mr-2 -mt-2 rounded-lg opacity-60 hover:opacity-100 transition-opacity',
  {
    variants: {
      variant: {
        default: 'hover:bg-white/10',
        destructive: 'hover:bg-danger-500/20',
        success: 'hover:bg-success-500/20',
        info: 'hover:bg-info-500/20',
        warning: 'hover:bg-warning-500/20',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const toastIcons = {
  destructive: <FaCircleExclamation className="w-5 h-5 mt-0.5" />,
  success: <FaCircleCheck className="w-5 h-5 mt-0.5" />,
  info: <FaCircleInfo className="w-5 h-5 mt-0.5" />,
  warning: <FaTriangleExclamation className="w-5 h-5 mt-0.5" />,
  default: null,
};

interface ToastComponentProps {
  toast: ToastData;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
}

export const Toast = forwardRef<HTMLDivElement, ToastComponentProps>(function Toast(
  { toast, pauseOnHover = false, pauseOnFocus = false },
  ref
) {
  const innerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => innerRef.current!);

  const {
    id,
    title,
    description,
    jsx,
    variant = 'default',
    duration = 5000,
    createdAt = Date.now(),
    onDismiss,
    position = 'bottom-right',
    _isExpanded = false,
  } = toast;

  const isTop = position.startsWith('top');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pausedAt = useRef<number | null>(null);

  // Clear any existing timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleDismiss = useCallback(() => {
    if (!innerRef.current) return;

    clearTimer();

    gsap.to(innerRef.current, {
      y: isTop ? -60 : 60,
      opacity: 0,
      scale: 0.85,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.4,
      ease: 'back.in(1.6)',
      onComplete: () => {
        onDismiss?.();
        dispatch({ type: 'DISMISS_TOAST', toastId: id });
      },
    });
  }, [id, isTop, onDismiss]);

  // Calculate current remaining time based on creation timestamp
  const calculateRemaining = useCallback(() => {
    if (duration === Infinity) return Infinity;
    if (pausedAt.current !== null) {
      return pausedAt.current;
    }
    const elapsed = Date.now() - createdAt;
    return Math.max(0, duration - elapsed);
  }, [duration, createdAt]);

  // Main auto-dismiss logic
  useEffect(() => {
    if (duration === Infinity || duration <= 0) return;

    // When pausing, save the current remaining time
    if (pauseOnHover || pauseOnFocus) {
      clearTimer();
      pausedAt.current = calculateRemaining();
      return;
    }

    // When resuming from pause, calculate remaining based on what we had paused at
    const remaining = pausedAt.current !== null ? pausedAt.current : calculateRemaining();
    pausedAt.current = null;

    if (remaining <= 0) {
      handleDismiss();
      return;
    }

    clearTimer();
    timerRef.current = setTimeout(() => {
      handleDismiss();
    }, remaining);

    return () => clearTimer();
  }, [pauseOnHover, pauseOnFocus, duration, createdAt, handleDismiss, calculateRemaining]);

  // Optional: visual scale on individual hover
  const handleMouseEnter = () => {
    gsap.to(innerRef.current, { scale: 1.025, duration: 0.4, ease: 'back.out(2.5)' });
  };

  const handleMouseLeave = () => {
    gsap.to(innerRef.current, { scale: 1, duration: 0.5, ease: 'elastic.out(1.3, 0.3)' });
  };

  const icon = toastIcons[variant as keyof typeof toastIcons];

  return (
    <div
      ref={innerRef}
      className={cn(toastVariants({ variant }), 'origin-center', _isExpanded && 'shadow-2xl')}
      style={{
        willChange: 'transform, opacity, filter',
        filter: _isExpanded ? 'drop-shadow(0 20px 25px rgba(0,0,0,0.3))' : 'none',
        transition: 'brightness 0.3s ease-out'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">
        {jsx || (
          <>
            {title && <h4 className={titleVariants({ variant })}>{title}</h4>}
            {description && <p className={descriptionVariants({ variant })}>{description}</p>}
          </>
        )}
        {toast.action}
      </div>
      <button
        onClick={handleDismiss}
        className={cn(closeButtonVariants({ variant }))}
        aria-label="Close"
      >
        <HiX className="w-5 h-5" />
      </button>
    </div>
  );
});
