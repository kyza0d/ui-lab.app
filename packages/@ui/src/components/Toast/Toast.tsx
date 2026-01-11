"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import styles from './Toast.module.css';
import { ToastProps as ToastData } from "./Toast.Store";
import { dispatch } from "./Toast.Store";
import { FaCircleExclamation, FaCircleCheck, FaCircleInfo, FaTriangleExclamation } from 'react-icons/fa6';
import { HiX } from 'react-icons/hi';

const variantMap = {
  default: styles.default,
  destructive: styles.destructive,
  success: styles.success,
  info: styles.info,
  warning: styles.warning,
} as const;

const toastIcons = {
  destructive: <FaCircleExclamation className={styles.icon} />,
  success: <FaCircleCheck className={styles.icon} />,
  info: <FaCircleInfo className={styles.icon} />,
  warning: <FaTriangleExclamation className={styles.icon} />,
  default: null,
};

interface ToastComponentProps {
  toast: ToastData;
  pauseOnHover?: boolean;
}

export const Toast = forwardRef<HTMLDivElement, ToastComponentProps>(function Toast(
  { toast, pauseOnHover = false },
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
    onDismiss,
    position = 'bottom-right',
  } = toast;

  const isTop = position.startsWith('top');

  // Time tracking refs
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  // Use a ref for paused state to avoid restarting the effect on every hover change
  const isPausedRef = useRef(pauseOnHover);
  useEffect(() => {
    isPausedRef.current = pauseOnHover;
  }, [pauseOnHover]);

  const handleDismiss = useCallback(() => {
    const yOffset = isTop ? -20 : 20;

    if (innerRef.current) {
      innerRef.current.dataset.dismissing = "true";
      gsap.killTweensOf(innerRef.current);
      gsap.to(innerRef.current, {
        opacity: 0,
        y: yOffset,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
          onDismiss?.();
          dispatch({ type: 'DISMISS_TOAST', toastId: id });
        },
      });
    } else {
      onDismiss?.();
      dispatch({ type: 'DISMISS_TOAST', toastId: id });
    }
  }, [id, isTop, onDismiss]);

  // Animation Frame Timer Logic
  useEffect(() => {
    if (duration === Infinity || duration <= 0) return;
    lastTimeRef.current = Date.now();

    const loop = () => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!isPausedRef.current) {
        elapsedRef.current += delta;

        if (elapsedRef.current >= duration) {
          handleDismiss();
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, handleDismiss]);

  const icon = toastIcons[variant as keyof typeof toastIcons];

  return (
    <div
      ref={innerRef}
      className={cn('toast', styles.toast, variantMap[variant])}
      role="alert"
    >
      {icon && <div className="toast-icon">{icon}</div>}
      <div className={cn('toast-content', styles.content)}>
        {jsx || (
          <>
            {title && <h4 className={cn('toast-title', styles.title)}>{title}</h4>}
            {description && <p className={cn('toast-description', styles.description)}>{description}</p>}
          </>
        )}
        {toast.action}
      </div>
      <button
        onClick={handleDismiss}
        className={cn('toast-close', styles.closeButton)}
        aria-label="Close"
      >
        <HiX className="w-4 h-4" />
      </button>
    </div>
  );
});
