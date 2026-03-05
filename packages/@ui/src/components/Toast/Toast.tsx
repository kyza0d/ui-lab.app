"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { cn } from '@/lib/utils';
import { createStylesResolver } from '@/lib/styles';
import css from './Toast.module.css';
import { ToastProps as ToastData, dispatch } from "./Toast.Store";

import { Info, CircleCheck, TriangleAlert, CircleAlert } from "lucide-react";

import { X } from 'lucide-react';

const DRAG_DISMISS_THRESHOLD = 100;
const DRAG_LEFT_RESISTANCE = 20;

const resolveToastBaseStyles = createStylesResolver([
  'root',
  'content',
  'title',
  'description',
  'closeButton',
  'icon'
] as const);

const variantMap = {
  default: css['default'],
  danger: css['danger'],
  success: css['success'],
  info: css['info'],
  warning: css['warning'],
} as const;

const toastIcons = {
  danger: <Info className={css.icon} />,
  success: <CircleCheck className={css.icon} />,
  info: <TriangleAlert className={css.icon} />,
  warning: <CircleAlert className={css.icon} />,
  default: null,
};

interface ToastComponentProps {
  /** Toast data object containing content and display options */
  toast: ToastData;
  /** Whether the auto-dismiss timer pauses on mouse hover */
  pauseOnHover?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDismissStart?: () => void;
  onDismissEnd?: () => void;
}

export const Toast = forwardRef<HTMLDivElement, ToastComponentProps>(function Toast(
  { toast, pauseOnHover = false, onDragStart, onDragEnd, onDismissStart, onDismissEnd },
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
    styles,
  } = toast;

  const resolved = resolveToastBaseStyles(styles);
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

  // Drag state refs
  const dragStartXRef = useRef(0);
  const currentDeltaRef = useRef(0);
  const dragPausedRef = useRef(false);

  const handleDismiss = useCallback(() => {
    // Change absolute numbers to relative strings
    const yOffset = isTop ? "-=20" : "+=20";

    if (innerRef.current) {
      innerRef.current.dataset.dismissing = "true";
      onDismissStart?.();
      dispatch({ type: 'CLOSE_TOAST', toastId: id });
      gsap.killTweensOf(innerRef.current);
      gsap.to(innerRef.current, {
        opacity: 0,
        y: yOffset, // Animates relative to its current layout position
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
          onDismissEnd?.();
          onDismiss?.();
          dispatch({ type: 'DISMISS_TOAST', toastId: id });
        },
      });
    } else {
      onDismiss?.();
      dispatch({ type: 'DISMISS_TOAST', toastId: id });
    }
  }, [id, isTop, onDismiss]);

  useGSAP(() => {
    if (!innerRef.current) return;

    const spawnDir = toast.spawnDirection || 'bottom';
    const fromY = spawnDir === 'top' ? (isTop ? 20 : -20) : (isTop ? -20 : 20);

    gsap.from(innerRef.current, {
      opacity: 0,
      y: fromY,
      duration: 0.35,
      ease: "power3.out",
    });
  }, { scope: innerRef });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (innerRef.current?.dataset.dismissing) return;
    dragStartXRef.current = e.clientX;
    currentDeltaRef.current = 0;
    dragPausedRef.current = true;
    onDragStart?.();
    gsap.killTweensOf(innerRef.current);

    const onMove = (ev: PointerEvent) => {
      if (!innerRef.current) return;
      const delta = ev.clientX - dragStartXRef.current;
      currentDeltaRef.current = delta;

      if (delta >= 0) {
        const progress = Math.min(delta / DRAG_DISMISS_THRESHOLD, 1);
        gsap.set(innerRef.current, { x: delta, opacity: 1 - progress * 0.5 });
      } else {
        const x = -DRAG_LEFT_RESISTANCE * (1 - Math.exp(delta / DRAG_LEFT_RESISTANCE));
        gsap.set(innerRef.current, { x, opacity: 1 });
      }
    };

    const onUp = () => {
      dragPausedRef.current = false;
      onDragEnd?.();
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);

      const delta = currentDeltaRef.current;
      currentDeltaRef.current = 0;

      if (delta >= DRAG_DISMISS_THRESHOLD) {
        if (innerRef.current) {
          innerRef.current.dataset.dismissing = "true";
          onDismissStart?.();
          // Dispatch CLOSE_TOAST immediately to signal stack adjustment
          dispatch({ type: 'CLOSE_TOAST', toastId: id });
          gsap.killTweensOf(innerRef.current);
          gsap.to(innerRef.current, {
            x: "+=200",
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              onDismissEnd?.();
              onDismiss?.();
              // Dispatch DISMISS_TOAST after animation completes
              dispatch({ type: 'DISMISS_TOAST', toastId: id });
            },
          });
        } else {
          // If innerRef.current is null, just dismiss immediately
          onDismiss?.();
          dispatch({ type: 'DISMISS_TOAST', toastId: id });
        }
      } else if (innerRef.current) {
        gsap.to(innerRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.55,
          ease: "elastic.out(1, 0.55)",
        });
      }
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
  }, [id, isTop, onDismiss, onDragStart, onDragEnd, onDismissStart, onDismissEnd]);

  // Animation Frame Timer Logic
  useEffect(() => {
    if (duration === Infinity || duration <= 0) return;
    lastTimeRef.current = Date.now();

    const loop = () => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!isPausedRef.current && !dragPausedRef.current) {
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
      className={cn('toast', css.toast, variantMap[variant], resolved.root)}
      role="alert"
      onPointerDown={handlePointerDown}
    >
      {icon && <div className={cn("toast-icon", resolved.icon)}>{icon}</div>}
      <div className={cn('toast-content', css.content, resolved.content)}>
        {jsx || (
          <>
            {title && <h4 className={cn('toast-title', css.title, resolved.title)}>{title}</h4>}
            {description && <p className={cn('toast-description', css.description, resolved.description)}>{description}</p>}
          </>
        )}
        {toast.action}
      </div>
      <button
        onClick={handleDismiss}
        className={cn('toast-close', css.closeButton, resolved.closeButton)}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});
