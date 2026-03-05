"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import { useToastStore, ToastPosition, ToastProps } from "./Toast.Store";
import { Toast } from "./Toast";
import gsap from "gsap";

const GAP = 14;
const MAX_VISIBLE = 3;

const positionConfig: Record<
  ToastPosition,
  {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  }
> = {
  "top-left": { top: "1.5rem", left: "1.5rem" },
  top: { top: "1.5rem", left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: "1.5rem", right: "1.5rem" },
  "bottom-left": { bottom: "1.5rem", left: "1.5rem" },
  bottom: { bottom: "1.5rem", left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: "1.5rem", right: "1.5rem" },
};

const activePositions = new Set<string>();

interface ToastContainerProps {
  position: ToastPosition;
  toasts: ToastProps[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ position, toasts }) => {
  const config = positionConfig[position];
  const toastRefsMap = useRef<Map<string, HTMLDivElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const isTop = position.includes("top");

  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const isDismissingCountRef = useRef(0);
  const isMouseInContainerRef = useRef(false);
  const prevVisibleIdsRef = useRef<Set<string>>(new Set());

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    isMouseInContainerRef.current = true;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovering(true);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    isMouseInContainerRef.current = false;
    if (isDraggingRef.current || isDismissingCountRef.current > 0) return;
    hoverTimeoutRef.current = setTimeout(() => setIsHovering(false), 200);
  };

  useEffect(() => {
    const currentActiveIds = new Set(toasts.map(t => t.id));
    const openToasts = toasts.filter(t => t.open);

    let cumulativeY = 0;
    let activeIndex = 0; // Track visual index separately from array index

    toasts.forEach((toast) => {
      const el = toastRefsMap.current.get(toast.id);
      if (!el) return;

      // If the toast is closing, ignore it in the layout calculations.
      // This lets the Toast component's internal GSAP handle the exit undisturbed.
      if (!toast.open) {
        el.style.pointerEvents = "none";
        return;
      }

      const isNewlyVisible = !prevVisibleIdsRef.current.has(toast.id);
      const isFromTop = toast.spawnDirection === 'top';
      const height = el.offsetHeight || 60;

      let y = 0;
      let scale = 1;
      let opacity = 1;
      let pointerEvents = "auto";

      if (isHovering) {
        if (activeIndex <= MAX_VISIBLE) {
          y = cumulativeY * (isTop ? 1 : -1);
          scale = 1;
          opacity = 1;
          cumulativeY += height + GAP;
        } else {
          y = cumulativeY * (isTop ? 1 : -1);
          scale = 0.9;
          opacity = 0;
          pointerEvents = "none";
        }
      } else {
        if (activeIndex === 0) {
          y = 0; scale = 1; opacity = 1;
        } else if (activeIndex === 1) {
          y = GAP * (isTop ? 1 : -1); scale = 0.96; opacity = 1;
        } else if (activeIndex === 2) {
          y = GAP * 2 * (isTop ? 1 : -1); scale = 0.92; opacity = 1;
        } else {
          y = GAP * 2 * (isTop ? 1 : -1); scale = 0.92; opacity = 0;
          pointerEvents = "none";
        }
      }

      if (isNewlyVisible && isFromTop) {
        const startY = isTop ? (y + 30) : (y - 30);
        gsap.set(el, { y: startY, opacity: 0, scale: scale * 0.9 });
      }

      gsap.to(el, { y, scale, opacity, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      el.style.pointerEvents = pointerEvents;

      activeIndex++; // Only increment for active toasts
    });

    if (containerRef.current) {
      let totalHeight = 0;
      if (isHovering) {
        // Only calculate container height based on open toasts
        openToasts.slice(0, MAX_VISIBLE + 1).forEach((toast) => {
          const el = toastRefsMap.current.get(toast.id);
          if (el) totalHeight += (el.offsetHeight || 60) + GAP;
        });
      } else {
        const firstEl = openToasts[0] ? toastRefsMap.current.get(openToasts[0].id) : null;
        totalHeight = (firstEl?.offsetHeight || 60) + (GAP * 2);
      }

      gsap.to(containerRef.current, {
        height: totalHeight,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    toastRefsMap.current.forEach((_el, id) => {
      if (!currentActiveIds.has(id)) toastRefsMap.current.delete(id);
    });

    prevVisibleIdsRef.current = new Set(openToasts.map(t => t.id));
  }, [isTop, isHovering, toasts]);

  const fixedStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    pointerEvents: "none",
    ...config,
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "356px",
    maxWidth: "90vw",
  };

  return (
    <div style={fixedStyle}>
      <div
        ref={containerRef}
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={isHovering ? "pointer-events-auto" : "pointer-events-none"}
      >
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            ref={(el) => {
              if (el) toastRefsMap.current.set(toast.id, el);
              else toastRefsMap.current.delete(toast.id);
            }}
            style={{
              willChange: "transform, opacity",
              transformOrigin: isTop ? "top center" : "bottom center",
              top: isTop ? 0 : "auto",
              bottom: isTop ? "auto" : 0,
              position: "absolute",
              left: 0,
              right: 0,
              zIndex: toasts.length - index,
            }}
          >
            <Toast
              toast={toast}
              pauseOnHover={isHovering}
              onDragStart={() => {
                isDraggingRef.current = true;
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                setIsHovering(true);
              }}
              onDragEnd={() => {
                isDraggingRef.current = false;
                if (isDismissingCountRef.current === 0 && !isMouseInContainerRef.current) {
                  hoverTimeoutRef.current = setTimeout(() => setIsHovering(false), 200);
                }
              }}
              onDismissStart={() => {
                isDismissingCountRef.current++;
                // FIX: Removed `setIsHovering(true)` from here.
                // Auto-dismissing should NOT force the stack open.
              }}
              onDismissEnd={() => {
                isDismissingCountRef.current--;
                if (isDismissingCountRef.current === 0 && !isDraggingRef.current && !isMouseInContainerRef.current) {
                  hoverTimeoutRef.current = setTimeout(() => setIsHovering(false), 200);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ... Toaster and SingletonToastContainer remain unchanged

export const Toaster = () => {
  const { toasts } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const positions: ToastPosition[] = ["top-left", "top", "top-right", "bottom-left", "bottom", "bottom-right"];

  const toastsByPosition = useMemo(() => {
    const grouped: Partial<Record<ToastPosition, ToastProps[]>> = {};
    toasts.forEach((t) => {
      const pos = t.position || "bottom-right";
      if (!grouped[pos]) grouped[pos] = [];
      grouped[pos]!.push(t);
    });
    return grouped;
  }, [toasts]);

  if (!mounted) return null;

  return (
    <>
      {positions.map((pos) => {
        const pts = toastsByPosition[pos];
        if (!pts || pts.length === 0) return null;

        return (
          <SingletonToastContainer
            key={pos}
            position={pos}
            toasts={pts}
          />
        );
      })}
    </>
  );
};

// Wrapper to enforce singleton per position
const SingletonToastContainer: React.FC<ToastContainerProps> = (props) => {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (activePositions.has(props.position)) {
      setIsAllowed(false);
      return;
    }

    activePositions.add(props.position);
    setIsAllowed(true);

    return () => {
      activePositions.delete(props.position);
    };
  }, [props.position]);

  if (!isAllowed) return null;

  return <ToastContainer {...props} />;
};
