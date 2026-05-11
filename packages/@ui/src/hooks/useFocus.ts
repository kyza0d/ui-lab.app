import * as React from "react";
import css from "./useFocus.module.css";

export interface FocusState {
  visible: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
}

export interface UseFocusOptions {
  /** Container for absolute positioning context. Required for overlay modes. */
  scopeRef?: React.RefObject<HTMLElement | null>;
  /** Element containing focusable surfaces. Required for overlay modes. */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** CSS selector for focusable surfaces */
  surfaceSelector?: string;
  /** Which element's borderRadius to inherit: the surface itself or closest item wrapper */
  radiusSource?: "surface" | "item";
  /** Positioning mode:
   *  - "track" (default): measures the surface with getBoundingClientRect and positions via transform
   *  - "ring": like track but applies inset box-shadow for inner edge focus styling
   *  - "self": indicator covers the scope itself using pure CSS (no JS measurement), immune to subpixel drift at fractional zoom levels. Use when scope === surface.
   *  - "target": applies data-ring directly to the focusable target with no wrapper or indicator element. */
  mode?: "track" | "ring" | "self" | "target";
  /** Additional dependencies to trigger recalculation */
  dependencies?: React.DependencyList;
}

export interface UseFocusReturn {
  /** Props to spread on the scope wrapper element */
  scopeProps: {
    className: string;
  };
  /** Props to spread on the indicator element */
  indicatorProps: {
    className: string;
    "data-ring": "true";
    "data-self-target"?: "true";
    "data-ring-inset"?: "true";
    "data-visible": "true" | undefined;
    "aria-hidden": "true";
    style: React.CSSProperties;
  };
  /** Props to spread on a focusable element when using target mode */
  targetProps: {
    "data-ring": "true";
    "data-focus-indicator": "target";
    "data-ring-inset"?: "true";
  };
}

const HIDDEN_FOCUS: FocusState = {
  visible: false,
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  radius: "0px",
};

export function useFocus({
  scopeRef,
  containerRef,
  surfaceSelector = '[data-focus-surface="true"]',
  radiusSource = "item",
  mode = "track",
  dependencies = [],
}: UseFocusOptions): UseFocusReturn {
  const focusSurfaceRef = React.useRef<HTMLElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const [focus, setFocus] = React.useState<FocusState>(HIDDEN_FOCUS);
  const usesOverlay = mode !== "target";

  const updateFocus = React.useCallback(() => {
    if (!usesOverlay) {
      return;
    }

    const scope = scopeRef?.current;
    const container = containerRef?.current;
    const activeElement = document.activeElement;

    if (
      !scope ||
      !container ||
      !(activeElement instanceof HTMLElement) ||
      !container.contains(activeElement)
    ) {
      focusSurfaceRef.current = null;
      setFocus(HIDDEN_FOCUS);
      return;
    }

    const surface = activeElement.closest(surfaceSelector);
    if (!(surface instanceof HTMLElement) || !container.contains(surface)) {
      focusSurfaceRef.current = null;
      setFocus(HIDDEN_FOCUS);
      return;
    }

    const focusVisibleNode = surface.matches('[data-focus-visible="true"]')
      ? surface
      : surface.querySelector('[data-focus-visible="true"]');

    if (!focusVisibleNode) {
      focusSurfaceRef.current = surface;
      setFocus(HIDDEN_FOCUS);
      return;
    }

    focusSurfaceRef.current = surface;

    if (mode === "self") {
      const radius = window.getComputedStyle(scope).borderRadius;
      setFocus((prev) =>
        prev.visible && prev.radius === radius
          ? prev
          : { ...HIDDEN_FOCUS, visible: true, radius }
      );
      return;
    }

    let radiusElement = surface;
    if (radiusSource === "item") {
      const itemWrapper = surface.closest(".item");
      if (itemWrapper instanceof HTMLElement && container.contains(itemWrapper)) {
        radiusElement = itemWrapper;
      }
    }

    const dpr = window.devicePixelRatio || 1;
    const snap = (v: number) => Math.round(v * dpr) / dpr;

    const scopeRect = scope.getBoundingClientRect();
    const scopePaddingBoxLeft = scopeRect.left + scope.clientLeft;
    const scopePaddingBoxTop = scopeRect.top + scope.clientTop;
    const surfaceRect = radiusElement.getBoundingClientRect();
    const surfaceStyles = window.getComputedStyle(radiusElement);

    setFocus({
      visible: true,
      left: snap(surfaceRect.left - scopePaddingBoxLeft),
      top: snap(surfaceRect.top - scopePaddingBoxTop),
      width: snap(surfaceRect.width),
      height: snap(surfaceRect.height),
      radius: surfaceStyles.borderRadius,
    });
  }, [scopeRef, containerRef, surfaceSelector, radiusSource, mode, usesOverlay]);

  const scheduleFocusUpdate = React.useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateFocus();
    });
  }, [updateFocus]);

  React.useEffect(() => {
    if (!usesOverlay) return;
    scheduleFocusUpdate();
  }, [usesOverlay, scheduleFocusUpdate, ...dependencies]);

  React.useEffect(() => {
    if (!usesOverlay) return;

    const scope = scopeRef?.current;
    const container = containerRef?.current;
    if (!scope || !container) return;

    const handleFocusChange = () => {
      scheduleFocusUpdate();
    };

    const handleViewportChange = () => {
      if (focusSurfaceRef.current) {
        scheduleFocusUpdate();
      }
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (focusSurfaceRef.current) {
              scheduleFocusUpdate();
            }
          })
        : null;

    resizeObserver?.observe(scope);
    resizeObserver?.observe(container);

    container.addEventListener("focusin", handleFocusChange);
    container.addEventListener("focusout", handleFocusChange);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      resizeObserver?.disconnect();
      container.removeEventListener("focusin", handleFocusChange);
      container.removeEventListener("focusout", handleFocusChange);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [scopeRef, containerRef, scheduleFocusUpdate, usesOverlay]);

  const isSelf = mode === "self";
  const isRing = mode === "ring";

  return {
    scopeProps: {
      className: css["focus-scope"],
    },
    indicatorProps: {
      className: css["focus-indicator"],
      "data-ring": "true",
      "data-self-target": isSelf ? "true" : undefined,
      "data-ring-inset": isRing ? "true" : undefined,
      "data-visible": focus.visible ? "true" : undefined,
      "aria-hidden": "true",
      style: isSelf
        ? { borderRadius: focus.radius }
        : {
            width: `${focus.width}px`,
            height: `${focus.height}px`,
            transform: `translate(${focus.left}px, ${focus.top}px)`,
            borderRadius: focus.radius,
          },
    },
    targetProps: {
      "data-ring": "true",
      "data-focus-indicator": "target",
      "data-ring-inset": isRing ? "true" : undefined,
    },
  };
}
