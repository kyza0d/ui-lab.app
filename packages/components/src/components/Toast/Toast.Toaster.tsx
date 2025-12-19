"use client";
import React, { useRef, useEffect, useState } from "react";
import { useToastStore, ToastPosition, ToastProps, dispatch } from "./Toast.Store";
import { Toast } from "./Toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const COLLAPSED_HEIGHT = 72;
const COLLAPSED_GAP = 20;
const EXPANDED_GAP = 8;
const MAX_VISIBLE = 4;
const MAX_CONTAINER_HEIGHT = 560;

const positionConfig: Record<ToastPosition, any> = {
  "top-left": { top: "1.5rem", left: "1.5rem" },
  top: { top: "1.5rem", left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: "1.5rem", right: "1.5rem" },
  "bottom-left": { bottom: "1.5rem", left: "1.5rem" },
  bottom: { bottom: "1.5rem", left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: "1.5rem", right: "1.5rem" },
};

const ToastContainer: React.FC<{ position: ToastPosition; toasts: ToastProps[]; isFocusMode: boolean }> = ({
  position,
  toasts,
  isFocusMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Map<string, HTMLDivElement>>(new Map());
  const hoveredId = useRef<string | null>(null);
  const layoutTl = useRef<gsap.core.Timeline>(null);
  const hoverTl = useRef<gsap.core.Timeline>(null);
  const centeringTl = useRef<gsap.core.Tween>(null);
  const isAnimatingRef = useRef(false);
  const [isHoveringContainer, setIsHoveringContainer] = useState(false);

  const isTop = position.startsWith("top");
  const dir = isTop ? -1 : 1;

  const containerSpawnDirection = toasts.length > 0 ? (toasts[0].spawnDirection || 'top') : 'top';
  const ordered = containerSpawnDirection === 'bottom' ? [...toasts].reverse() : toasts;

  useEffect(() => {
    const shouldPause = isHoveringContainer || isFocusMode;
    if (!shouldPause) return;
    const pauseAllTimeouts = () => {
      ordered.forEach(toast => {
        if ((window as any).__TOAST_TIMEOUTS?.[toast.id]) {
          clearTimeout((window as any).__TOAST_TIMEOUTS[toast.id]);
        }
      });
    };
    const resumeAllTimeouts = () => {
      window.dispatchEvent(new CustomEvent("toast-container-hover-end"));
    };

    pauseAllTimeouts();
    return () => {
      resumeAllTimeouts();
    };
  }, [isHoveringContainer, isFocusMode, ordered]);

  const handleToastClick = (toastId: string) => {
    if (isAnimatingRef.current) return;
    const expandedToast = toasts.find((t) => t._isExpanded);
    const newActiveId = expandedToast?.id === toastId ? null : toastId;
    dispatch({ type: "SET_ACTIVE_TOAST", toastId: newActiveId });
  };

  const getLayout = () => {
    const els = ordered.map((t) => refs.current.get(t.id)!).filter(Boolean);
    const heights = els.map((el) => el.offsetHeight);
    const expandedToast = ordered.find((t) => t._isExpanded);

    const totalExpandedHeight = heights.reduce((a, b) => a + b, 0) + Math.max(0, ordered.length - 1) * EXPANDED_GAP;
    const collapsed = ordered.length > MAX_VISIBLE || totalExpandedHeight > MAX_CONTAINER_HEIGHT;

    const positions: {
      y: number;
      scale: number;
      opacity: number;
      zIndex: number;
    }[] = [];

    if (collapsed && !expandedToast) {
      els.forEach((_, i) => {
        const offset = i * COLLAPSED_GAP * dir;
        positions.push({
          y: offset,
          scale: 1 - i * 0.04,
          opacity: Math.max(0.9, 1 - i * 0.12),
          zIndex: 1000 - i,
        });
      });
    } else if (expandedToast) {
      const expandedIndex = ordered.findIndex((t) => t.id === expandedToast.id);
      const expandedHeight = heights[expandedIndex];

      let totalHeightBefore = 0;
      for (let i = 0; i < expandedIndex; i++) {
        totalHeightBefore += heights[i] + EXPANDED_GAP;
      }

      let totalHeightAfter = 0;
      for (let i = expandedIndex + 1; i < els.length; i++) {
        totalHeightAfter += heights[i] + EXPANDED_GAP;
      }

      const totalHeight = totalHeightBefore + expandedHeight + totalHeightAfter + Math.max(0, els.length - 1) * EXPANDED_GAP;
      const centerOffset = (totalHeight / 2 - totalHeightBefore - expandedHeight / 2) * dir;

      let accumulated = -totalHeightBefore;

      els.forEach((_, i) => {
        if (i === expandedIndex) {
          positions.push({
            y: accumulated * dir - centerOffset,
            scale: 1,
            opacity: 1,
            zIndex: 10000,
          });
          accumulated += expandedHeight + EXPANDED_GAP;
        } else {
          const height = heights[i];
          positions.push({
            y: accumulated * dir - centerOffset,
            scale: isFocusMode ? 0.95 : 1,
            opacity: isFocusMode ? 0.9 : 1,
            zIndex: 1000 - i,
          });
          accumulated += height + EXPANDED_GAP;
        }
      });
    } else {
      let accumulated = 0;
      els.forEach((_, i) => {
        if (i > 0) accumulated += heights[isTop ? ordered.length - i : i - 1] + EXPANDED_GAP;
        positions.push({
          y: accumulated * dir,
          scale: 1,
          opacity: 1,
          zIndex: 10,
        });
      });
    }

    let containerH = COLLAPSED_HEIGHT + Math.max(0, ordered.length - 1) * COLLAPSED_GAP + 60;
    if (expandedToast) {
      containerH = MAX_CONTAINER_HEIGHT;
    } else if (!collapsed) {
      containerH = Math.min(totalExpandedHeight + 60, MAX_CONTAINER_HEIGHT);
    }

    return { positions, containerH, collapsed };
  };

  const previousToastsRef = useRef<string>("");

  useGSAP(
    () => {
      if (ordered.length === 0) return;

      hoverTl.current?.kill();
      layoutTl.current?.kill();
      centeringTl.current?.kill();
      isAnimatingRef.current = true;

      const { positions, containerH, collapsed } = getLayout();
      const els = ordered.map((t) => refs.current.get(t.id)!).filter(Boolean);

      const previousIds = previousToastsRef.current.split(",").filter(Boolean);
      const currentIds = ordered.map((t) => t.id);
      const newToastId = currentIds.find((id) => !previousIds.includes(id));
      previousToastsRef.current = currentIds.join(",");

      layoutTl.current = gsap.timeline({
        defaults: { duration: 0.85, ease: "back.out(1.9)" },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      const expandedToast = ordered.find((t) => t._isExpanded);
      const wasExpanded = previousToastsRef.current.length > 0; // Simplified check

      let targetInnerY = 0;

      if (expandedToast && containerRef.current) {
        const expandedIndex = ordered.findIndex((t) => t.id === expandedToast.id);
        const layoutPos = positions[expandedIndex];
        const el = refs.current.get(expandedToast.id);

        if (el && layoutPos) {
          const toastHeight = el.offsetHeight;
          const containerRect = containerRef.current.getBoundingClientRect();
          const screenCenter = window.innerHeight / 2;

          let finalContainerTop = containerRect.top;

          if (!isTop) {
            finalContainerTop = containerRect.bottom - containerH;
          }

          targetInnerY = screenCenter - finalContainerTop - layoutPos.y - (toastHeight / 2);
        }
      }
      els.forEach((el, i) => {
        const toast = ordered[i];
        const { y, scale, opacity, zIndex } = positions[i];
        const isNewToast = toast.id === newToastId;
        const isExpanded = toast.id === expandedToast?.id;
        const blur = isFocusMode && isExpanded ? 0 : isFocusMode ? 2 : 0;

        if (isNewToast) {
          const spawnDir = toast.spawnDirection || "top";
          const startY = spawnDir === "bottom" ? y + 80 * dir : y - 80 * dir;
          layoutTl.current!.fromTo(
            el,
            { y: startY, opacity: 0, scale: 0.9, filter: `blur(${blur}px)` },
            { y, scale, opacity, zIndex, filter: `blur(${blur}px)`, duration: 0.9, ease: "back.out(2.2)" },
            0
          );
        } else {
          const animDuration = expandedToast && !wasExpanded ? 1.0 : 0.8;
          const animEase = expandedToast ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "power3.out";
          layoutTl.current!.to(
            el,
            { y, scale, opacity, zIndex, filter: `blur(${blur}px)`, duration: animDuration, ease: animEase },
            0
          );
        }
      });
      if (innerRef.current) {
        layoutTl.current!.to(
          innerRef.current,
          {
            y: targetInnerY,
            duration: expandedToast ? 1.0 : 0.6,
            ease: expandedToast ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "power2.out",
          },
          0
        );
      }
      gsap.to(containerRef.current, {
        height: containerH,
        duration: 1.0,
        ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        overwrite: true,
      });
    },
    {
      dependencies: [
        toasts.length,
        toasts.map((t) => t.id).join(","),
        containerSpawnDirection,
        toasts.map((t) => (t._isExpanded ? t.id : "")).join(","),
        isFocusMode,
      ],
      scope: containerRef,
    }
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !innerRef.current) return;

    let raf: number;

    const { positions: basePositions, collapsed } = getLayout();
    const expandedToast = ordered.find((t) => t._isExpanded);

    const applyHoverState = (hoveredIndex: number | null) => {
      if (expandedToast && !isFocusMode) return;

      hoverTl.current?.kill();
      const tl = gsap.timeline();
      hoverTl.current = tl;

      ordered.forEach((toast, i) => {
        const el = refs.current.get(toast.id);
        if (!el) return;

        if (hoveredIndex === null || hoveredIndex === i) {
          const base = basePositions[i];
          tl.to(el, {
            y: base.y,
            scale: hoveredIndex === i ? 1.03 : base.scale,
            opacity: base.opacity,
            zIndex: hoveredIndex === i ? 9999 : base.zIndex,
            filter: "blur(0px)",
            duration: hoveredIndex === null ? 1.1 : 0.6,
            ease: hoveredIndex === null ? "elastic.out(1.4, 0.18)" : "power4.out",
          }, 0);
        } else {
          const distance = Math.abs(i - hoveredIndex);
          const push = (collapsed ? 24 : 36) * distance;
          const pushDir = (isTop ? i > hoveredIndex : i < hoveredIndex) ? -1 : 1;
          const targetY = basePositions[i].y + push * pushDir * dir;

          tl.to(el, {
            y: targetY,
            scale: 0.95,
            opacity: Math.max(0.8, basePositions[i].opacity - 0.9),
            filter: "blur(1.5px)",
            duration: 0.7,
            ease: "power4.out",
          }, 0);
        }
      });
    };

    const handleMove = (e: MouseEvent) => {
      if (isFocusMode) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        let closestIndex = -1;
        let closestDist = Infinity;

        ordered.forEach((toast, i) => {
          const el = refs.current.get(toast.id);
          if (!el) return;
          const er = el.getBoundingClientRect();
          const center = er.top + er.height / 2 - rect.top;
          const dist = Math.abs(mouseY - center);
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
          }
        });

        const newHoveredId = closestIndex >= 0 ? ordered[closestIndex].id : null;
        if (newHoveredId === hoveredId.current) return;

        hoveredId.current = newHoveredId;
        applyHoverState(closestIndex >= 0 ? closestIndex : null);
      });
    };

    const handleLeave = () => {
      if (isFocusMode) return;
      cancelAnimationFrame(raf);
      hoveredId.current = null;
      applyHoverState(null);
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
      hoverTl.current?.kill();
    };
  }, [toasts, isTop, dir, ordered, isFocusMode]);

  useEffect(() => {
    return () => {
      centeringTl.current?.kill();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (ordered.length === 0) return;

      const expandedToast = ordered.find((t) => t._isExpanded);
      const currentIndex = expandedToast ? ordered.findIndex((t) => t.id === expandedToast.id) : -1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        const nextIndex = currentIndex + 1;
        if (nextIndex < ordered.length) {
          dispatch({ type: "SET_ACTIVE_TOAST", toastId: ordered[nextIndex].id });
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          dispatch({ type: "SET_ACTIVE_TOAST", toastId: ordered[prevIndex].id });
        } else if (currentIndex >= 0) {
          dispatch({ type: "SET_ACTIVE_TOAST", toastId: null });
        }
      } else if (e.key === "Escape" && expandedToast) {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: "SET_ACTIVE_TOAST", toastId: null });
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [ordered]);

  // Scroll in collapsed mode
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const handleWheel = (e: WheelEvent) => {
      if (!getLayout().collapsed) return;
      e.preventDefault();
      const delta = e.deltaY;
      const current = gsap.getProperty(inner, "y") as number;
      const maxScroll = ordered.length > 5 ? (ordered.length - 4) * -COLLAPSED_GAP * dir : 0;
      const target = gsap.utils.clamp(maxScroll, 0, current - delta * 0.8);
      gsap.to(inner, { y: target, duration: 0.8, ease: "power3.out" });
    };

    inner.addEventListener("wheel", handleWheel, { passive: false });
    return () => inner.removeEventListener("wheel", handleWheel);
  }, [ordered.length, dir]);

  const expandedToast = toasts.find((t) => t._isExpanded);

  return (
    <>
      {expandedToast && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
          onClick={() => {
            dispatch({ type: "SET_ACTIVE_TOAST", toastId: null });
          }}
          style={{ pointerEvents: "auto" }}
        />
      )}
      <div
        className="fixed z-[9999] pointer-events-none"
        style={positionConfig[position]}
        onMouseEnter={() => setIsHoveringContainer(true)}
        onMouseLeave={() => setIsHoveringContainer(false)}
      >
        <div
          ref={containerRef}
          className="relative pointer-events-auto"
          style={{
            width: position.includes("left") || position.includes("right") ? "420px" : "auto",
            maxWidth: "420px",
          }}
        >
          <div ref={innerRef} className="relative">
            {ordered.map((toast, index) => (
              <div
                key={toast.id}
                className="absolute inset-x-0 will-change-transform origin-center cursor-pointer"
                style={{ transform: "translateZ(0)" }}
                onClick={() => handleToastClick(toast.id)}
                ref={(el) => {
                  if (el) refs.current.set(toast.id, el);
                  else refs.current.delete(toast.id);
                }}
              >
                <Toast toast={toast} pauseOnHover={isHoveringContainer} pauseOnFocus={isFocusMode} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const Toaster = () => {
  const { toasts, isFocusMode } = useToastStore();

  const positions: ToastPosition[] = [
    "top-left",
    "top",
    "top-right",
    "bottom-left",
    "bottom",
    "bottom-right",
  ];

  return (
    <>
      {positions.map((pos) => {
        const pts = toasts.filter((t) => (t.position || "bottom-right") === pos);
        if (pts.length === 0) return null;
        return <ToastContainer key={pos} position={pos} toasts={pts} isFocusMode={isFocusMode} />;
      })}
    </>
  );
};
