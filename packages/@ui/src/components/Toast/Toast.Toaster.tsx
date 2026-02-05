"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import { useToastStore, ToastPosition, ToastProps } from "./Toast.Store";
import { Toast } from "./Toast";
import { useGSAP } from "@gsap/react";
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

// Global registry to prevent duplicate Toasters in the same position
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

  useGSAP(() => {
    visibleToasts.forEach((toast, index) => {
      const el = toastRefsMap.current.get(toast.id);
      if (!el) return;

      let y = 0;
      let scale = 1;
      let opacity = 1;

      if (isHovering) {
        // When hovering, expand all toasts to full visibility
        let cumulativeY = 0;
        for (let i = 0; i < index; i++) {
          const prevEl = toastRefsMap.current.get(visibleToasts[i].id);
          if (prevEl) {
            cumulativeY += (prevEl.getBoundingClientRect().height || 60) + GAP;
          }
        }
        y = cumulativeY * (isTop ? 1 : -1);
        scale = 1;
        opacity = 1;
      } else {
        // When not hovering, use stacked preview logic
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
          y = GAP * 2 * (isTop ? 1 : -1);
          scale = 0.92;
          opacity = 0;
        }
      }

      gsap.to(el, {
        y,
        scale,
        opacity,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    });

    // Animate container height
    if (containerRef.current) {
      let totalHeight = 0;
      if (isHovering) {
        visibleToasts.forEach((toast) => {
          const el = toastRefsMap.current.get(toast.id);
          if (el) {
            totalHeight += (el.getBoundingClientRect().height || 60) + GAP;
          }
        });
      } else {
        const firstEl = visibleToasts[0] ? toastRefsMap.current.get(visibleToasts[0].id) : null;
        const firstHeight = firstEl?.getBoundingClientRect().height || 60;
        totalHeight = firstHeight + (GAP * 2);
      }

      gsap.to(containerRef.current, {
        height: totalHeight,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  }, {
    dependencies: [visibleToasts, isTop, isHovering],
    scope: toastRefsMap,
  });

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
        {visibleToasts.map((toast, index) => (
          <div
            key={toast.id}
            ref={(el) => {
              if (el) toastRefsMap.current.set(toast.id, el);
              else toastRefsMap.current.delete(toast.id);
            }}
            className="pointer-events-auto"
            style={{
              willChange: "transform, opacity",
              origin: isTop ? "top center" : "bottom center",
              top: isTop ? 0 : "auto",
              bottom: isTop ? "auto" : 0,
              position: "absolute",
              left: 0,
              right: 0,
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
