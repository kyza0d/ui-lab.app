"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { useToastStore, ToastPosition, ToastProps } from "./Toast.Store";
import { Toast } from "./Toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MAX_VISIBLE = 3;
const TOAST_WIDTH = 356;
const GAP = 14;

const positionConfig: Record<ToastPosition, React.CSSProperties> = {
  "top-left": { top: "1.5rem", left: "1.5rem" },
  top: { top: "1.5rem", left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: "1.5rem", right: "1.5rem" },
  "bottom-left": { bottom: "1.5rem", left: "1.5rem" },
  bottom: { bottom: "1.5rem", left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: "1.5rem", right: "1.5rem" },
};

// Global registry to prevent duplicate Toasters in the same position
// This handles the case where multiple <Toaster /> components are mounted (e.g. Layout + Page)
const activePositions = new Set<string>();

interface ToastContainerProps {
  position: ToastPosition;
  toasts: ToastProps[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ position, toasts }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toastRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  // Track toasts that have completed entry animation - these should never re-enter
  const completedEntriesRef = useRef<Set<string>>(new Set());
  const isTop = position.includes("top");

  // Only render MAX_VISIBLE items to keep DOM light
  // Memoize to prevent unnecessary hook re-runs that interrupt animations
  const visibleToasts = useMemo(
    () => toasts.slice(0, MAX_VISIBLE + 1),
    [toasts]
  );

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setIsHovering(false), 200);
  };

  // Clean up tracking for dismissed toasts
  useEffect(() => {
    const currentToastIds = new Set(visibleToasts.map(t => t.id));
    const completedIds = Array.from(completedEntriesRef.current);

    for (const id of completedIds) {
      if (!currentToastIds.has(id)) {
        completedEntriesRef.current.delete(id);
      }
    }
  }, [visibleToasts]);

  useGSAP(() => {
    if (!containerRef.current) return;

    let currentY = 0;

    // Process each visible toast to determine its target position and animation state
    visibleToasts.forEach((toast, index) => {
      const el = toastRefs.current.get(toast.id);
      if (!el) {
        return;
      }

      // Calculate target position and properties
      const height = el.getBoundingClientRect().height || 60;

      let y = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = visibleToasts.length - index;

      if (isHovering) {
        // During hover, expand all visible toasts vertically
        y = currentY * (isTop ? 1 : -1);
        scale = 1;
        opacity = 1;
        currentY += height + GAP;
      } else {
        // Normal stacked state
        if (index === 0) {
          y = 0;
          scale = 1;
          opacity = 1;
        } else if (index === 1) {
          y = GAP * (isTop ? 1 : -1);
          scale = 0.96;
          opacity = 1;
        } else if (index === 2) {
          y = GAP * 2 * (isTop ? 1 : -1);
          scale = 0.92;
          opacity = 1;
        } else {
          // Hide additional toasts
          y = GAP * 2 * (isTop ? 1 : -1);
          scale = 0.92;
          opacity = 0;
        }
      }

      // Determine if this is a new entry or an existing toast needing repositioning
      const isNewEntry = !completedEntriesRef.current.has(toast.id);

      if (isNewEntry) {
        // Entry animation for new toasts
        completedEntriesRef.current.add(toast.id);
        gsap.killTweensOf(el);

        // Set initial state: offset position, invisible, slightly smaller
        const startY = y + (isTop ? -30 : 30);
        gsap.set(el, {
          y: startY,
          opacity: 0,
          scale: 0.9,
          zIndex: zIndex,
        });

        // Animate entry: slide in, fade in, and scale up
        gsap.to(el, {
          y: y,
          opacity: opacity,
          scale: scale,
          duration: 0.35,
          ease: "power3.out",
        });
      } else {
        // Move animation for existing toasts repositioning due to new toasts or hover state
        // Only animate if the element is not currently being tweened (to avoid interrupting entry animations)
        if (!gsap.isTweening(el)) {
          gsap.to(el, {
            y: y,
            scale: scale,
            opacity: opacity,
            zIndex: zIndex,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      }
    });

    // Animate container height for smooth hover interactions
    const firstEl = visibleToasts[0] ? toastRefs.current.get(visibleToasts[0].id) : null;
    const firstHeight = firstEl?.getBoundingClientRect().height || 60;

    // If hovering, height is full stack. If not, it's just the top card + gap padding
    const containerHeight = isHovering ? currentY : firstHeight + (GAP * 2);

    // Set width immediately without animation to prevent slide-in effect
    gsap.set(containerRef.current, {
      width: TOAST_WIDTH,
    });

    // Animate container height for smooth hover interactions
    gsap.to(containerRef.current, {
      height: containerHeight,
      duration: 0.35,
      ease: "power3.out",
    });

  }, {
    dependencies: [visibleToasts, isHovering, isTop],
  });

  return (
    <div
      className="fixed z-[9999] flex flex-col items-center outline-none"
      style={positionConfig[position]}
    >
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col items-center outline-none"
        style={{
          pointerEvents: isHovering ? "auto" : "none",
        }}
      >
        {visibleToasts.map((toast) => (
          <div
            key={toast.id}
            ref={(el) => {
              if (el) toastRefs.current.set(toast.id, el);
              else toastRefs.current.delete(toast.id);
            }}
            className={`absolute w-full ${isTop ? "top-0 origin-top" : "bottom-0 origin-bottom"
              }`}
            style={{
              willChange: "transform, opacity",
              pointerEvents: "auto",
              // GSAP will set opacity via inline styles during animation
              // Starting state: invisible (will be set by GSAP.set in useGSAP)
              opacity: 0,
            }}
          >
            <Toast toast={toast} pauseOnHover={isHovering} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Toaster = () => {
  const { toasts } = useToastStore();
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  const positions: ToastPosition[] = [
    "top-left",
    "top",
    "top-right",
    "bottom-left",
    "bottom",
    "bottom-right",
  ];

  const toastsByPosition = useMemo(() => {
    const grouped: Partial<Record<ToastPosition, ToastProps[]>> = {};
    toasts.forEach(t => {
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

        // Render a specialized wrapper that checks for duplicate positions
        return <SingletonToastContainer key={pos} position={pos} toasts={pts} />;
      })}
    </>
  );
};

// Wrapper to enforce singleton per position
const SingletonToastContainer: React.FC<ToastContainerProps> = (props) => {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    // If this position is already claimed by another Toaster instance, don't render
    if (activePositions.has(props.position)) {
      setIsAllowed(false);
      return;
    }

    // Claim the position
    activePositions.add(props.position);
    setIsAllowed(true);

    return () => {
      // Release the position on unmount
      activePositions.delete(props.position);
    };
  }, [props.position]);

  if (!isAllowed) return null;

  return <ToastContainer {...props} />;
};
