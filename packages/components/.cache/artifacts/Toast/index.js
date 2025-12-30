"use client";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/components/Toast/Toast.tsx
import { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { cva } from "class-variance-authority";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Toast/Toast.Store.ts
import React from "react";
var memoryState = { toasts: [], activeToastId: null, isFocusMode: false };
var listeners = /* @__PURE__ */ new Set();
var broadcast = () => {
  listeners.forEach((listener) => listener(memoryState));
};
var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: [__spreadProps(__spreadValues({}, action.toast), { createdAt: action.toast.createdAt || Date.now() }), ...state.toasts].slice(0, 50)
      });
    case "UPDATE_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? __spreadValues(__spreadValues({}, t), action.toast) : t
        )
      });
    case "CLOSE_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === action.toastId ? __spreadProps(__spreadValues({}, t), { open: false }) : t
        )
      });
    case "DISMISS_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      });
    case "PAUSE_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === action.toastId ? __spreadProps(__spreadValues({}, t), { _pausedAt: Date.now(), _remaining: t.duration }) : t
        )
      });
    case "RESUME_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === action.toastId ? __spreadProps(__spreadValues({}, t), {
            _remaining: action.remaining,
            _pausedAt: void 0
          }) : t
        )
      });
    case "SET_ACTIVE_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        activeToastId: action.toastId,
        isFocusMode: action.toastId !== null,
        toasts: state.toasts.map((t) => __spreadProps(__spreadValues({}, t), {
          _isExpanded: t.id === action.toastId
        }))
      });
    default:
      return state;
  }
};
var dispatch = (action) => {
  memoryState = reducer(memoryState, action);
  broadcast();
};

// src/components/Toast/Toast.tsx
import { FaCircleExclamation, FaCircleCheck, FaCircleInfo, FaTriangleExclamation } from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var toastVariants = cva(
  "w-full max-w-sm border rounded-lg shadow-lg flex items-start gap-3 pointer-events-auto p-3",
  {
    variants: {
      variant: {
        default: "bg-background-900 border-background-600 text-foreground-200",
        destructive: "bg-danger-50 border-danger-500/50 text-danger-900",
        success: "bg-success-50 border-success-500/50 text-success-900",
        info: "bg-info-50 border-info-500/50 text-info-900",
        warning: "bg-warning-50 border-warning-500/50 text-warning-900"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var titleVariants = cva("font-semibold text-lg", {
  variants: {
    variant: {
      default: "text-foreground-50",
      destructive: "text-danger-950",
      success: "text-success-950",
      info: "text-info-950",
      warning: "text-warning-950"
    }
  },
  defaultVariants: { variant: "default" }
});
var descriptionVariants = cva("text-sm opacity-90 mt-1", {
  variants: {
    variant: {
      default: "text-foreground-300",
      destructive: "text-danger-950",
      success: "text-success-950",
      info: "text-info-950",
      warning: "text-warning-950"
    }
  },
  defaultVariants: { variant: "default" }
});
var closeButtonVariants = cva(
  "ml-3 p-2 -mr-2 -mt-2 rounded-lg opacity-60 hover:opacity-100 transition-opacity",
  {
    variants: {
      variant: {
        default: "hover:bg-white/10",
        destructive: "hover:bg-danger-500/20",
        success: "hover:bg-success-500/20",
        info: "hover:bg-info-500/20",
        warning: "hover:bg-warning-500/20"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var toastIcons = {
  destructive: /* @__PURE__ */ jsx(FaCircleExclamation, { className: "w-5 h-5 mt-0.5" }),
  success: /* @__PURE__ */ jsx(FaCircleCheck, { className: "w-5 h-5 mt-0.5" }),
  info: /* @__PURE__ */ jsx(FaCircleInfo, { className: "w-5 h-5 mt-0.5" }),
  warning: /* @__PURE__ */ jsx(FaTriangleExclamation, { className: "w-5 h-5 mt-0.5" }),
  default: null
};
var Toast = forwardRef(function Toast2({ toast, pauseOnHover = false, pauseOnFocus = false }, ref) {
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current);
  const {
    id,
    title,
    description,
    jsx: jsx2,
    variant = "default",
    duration = 5e3,
    createdAt = Date.now(),
    onDismiss,
    position = "bottom-right",
    _isExpanded = false
  } = toast;
  const isTop = position.startsWith("top");
  const timerRef = useRef(null);
  const pausedAt = useRef(null);
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const handleDismiss = useCallback(() => {
    if (!innerRef.current)
      return;
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
      ease: "back.in(1.6)",
      onComplete: () => {
        onDismiss == null ? void 0 : onDismiss();
        dispatch({ type: "DISMISS_TOAST", toastId: id });
      }
    });
  }, [id, isTop, onDismiss]);
  const calculateRemaining = useCallback(() => {
    if (duration === Infinity)
      return Infinity;
    if (pausedAt.current !== null) {
      return pausedAt.current;
    }
    const elapsed = Date.now() - createdAt;
    return Math.max(0, duration - elapsed);
  }, [duration, createdAt]);
  useEffect(() => {
    if (duration === Infinity || duration <= 0)
      return;
    if (pauseOnHover || pauseOnFocus) {
      clearTimer();
      pausedAt.current = calculateRemaining();
      return;
    }
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
  const handleMouseEnter = () => {
    gsap.to(innerRef.current, { scale: 1.025, duration: 0.4, ease: "back.out(2.5)" });
  };
  const handleMouseLeave = () => {
    gsap.to(innerRef.current, { scale: 1, duration: 0.5, ease: "elastic.out(1.3, 0.3)" });
  };
  const icon = toastIcons[variant];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: innerRef,
      className: cn(toastVariants({ variant }), "origin-center", _isExpanded && "shadow-2xl"),
      style: {
        willChange: "transform, opacity, filter",
        filter: _isExpanded ? "drop-shadow(0 20px 25px rgba(0,0,0,0.3))" : "none",
        transition: "brightness 0.3s ease-out"
      },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        icon && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: icon }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          jsx2 || /* @__PURE__ */ jsxs(Fragment, { children: [
            title && /* @__PURE__ */ jsx("h4", { className: titleVariants({ variant }), children: title }),
            description && /* @__PURE__ */ jsx("p", { className: descriptionVariants({ variant }), children: description })
          ] }),
          toast.action
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleDismiss,
            className: cn(closeButtonVariants({ variant })),
            "aria-label": "Close",
            children: /* @__PURE__ */ jsx(HiX, { className: "w-5 h-5" })
          }
        )
      ]
    }
  );
});
export {
  Toast
};
