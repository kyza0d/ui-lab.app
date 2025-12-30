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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/components/Confirmation/Confirmation.tsx
import React3, { useState as useState2, useEffect } from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Button/Button.tsx
import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";

// src/components/Button/Button.module.css
var Button_default = {};

// src/components/Button/Button.tsx
import { jsx } from "react/jsx-runtime";
var variantMap = {
  primary: Button_default["primary"],
  secondary: Button_default["secondary"],
  outline: Button_default["outline"],
  ghost: Button_default["ghost"]
};
var sizeMap = {
  sm: Button_default["sm"],
  md: Button_default["md"],
  lg: Button_default["lg"]
};
var Button = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant = "primary", size = "md", children, onClick, onPress, isDisabled, disabled } = _b, props = __objRest(_b, ["className", "variant", "size", "children", "onClick", "onPress", "isDisabled", "disabled"]);
    var _a2;
    const buttonRef = React.useRef(null);
    const mergedRef = useMergedRef(ref, buttonRef);
    const isButtonDisabled = (_a2 = isDisabled != null ? isDisabled : disabled) != null ? _a2 : false;
    const [isPressed, setIsPressed] = React.useState(false);
    const handlePress = React.useCallback((e) => {
      if (onPress)
        onPress({ target: e.target });
      if (onClick)
        onClick(e);
    }, [onPress, onClick]);
    const handleMouseDown = React.useCallback((e) => {
      var _a3;
      if (!isButtonDisabled) {
        setIsPressed(true);
      }
      (_a3 = props.onMouseDown) == null ? void 0 : _a3.call(props, e);
    }, [isButtonDisabled, props]);
    const handleMouseUp = React.useCallback((e) => {
      var _a3;
      setIsPressed(false);
      (_a3 = props.onMouseUp) == null ? void 0 : _a3.call(props, e);
    }, [props]);
    const handleMouseLeave = React.useCallback((e) => {
      var _a3;
      setIsPressed(false);
      (_a3 = props.onMouseLeave) == null ? void 0 : _a3.call(props, e);
    }, [props]);
    const { buttonProps } = useButton({
      isDisabled: isButtonDisabled,
      onPress: handlePress
    }, buttonRef);
    const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus: props.autoFocus });
    const { hoverProps, isHovered } = useHover({ isDisabled: isButtonDisabled });
    return /* @__PURE__ */ jsx(
      "button",
      __spreadProps(__spreadValues({}, mergeProps(buttonProps, focusProps, hoverProps, props)), {
        ref: mergedRef,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        className: cn("button", variant, size, Button_default.button, variantMap[variant], sizeMap[size], className),
        "data-variant": variant,
        "data-size": size,
        "data-disabled": isButtonDisabled ? "true" : void 0,
        "data-pressed": isPressed ? "true" : "false",
        "data-hovered": isHovered ? "true" : "false",
        "data-focused": isFocused ? "true" : "false",
        "data-focus-visible": isFocusVisible ? "true" : "false",
        children
      })
    );
  }
);
function useMergedRef(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function")
        ref(value);
      else if (ref && typeof ref === "object")
        ref.current = value;
    });
  };
}
Button.displayName = "Button";

// src/components/Card/Card.tsx
import React2 from "react";

// src/components/Card/Card.module.css
var Card_default = {};

// src/components/Card/Card.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CardRoot = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx2(
      "div",
      __spreadValues({
        ref,
        className: cn(Card_default.card, className)
      }, props)
    );
  }
);
CardRoot.displayName = "Card";
var CardHeader = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx2(
      "div",
      __spreadValues({
        ref,
        className: cn(Card_default.header, className)
      }, props)
    );
  }
);
CardHeader.displayName = "Card.Header";
var CardBody = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx2(
      "div",
      __spreadValues({
        ref,
        className: cn(Card_default.body, className)
      }, props)
    );
  }
);
CardBody.displayName = "Card.Body";
var CardFooter = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx2(
      "div",
      __spreadValues({
        ref,
        className: cn(Card_default.footer, className)
      }, props)
    );
  }
);
CardFooter.displayName = "Card.Footer";
var Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter
});

// src/components/Confirmation/Confirmation.tsx
import { HiExclamationCircle, HiExclamation, HiInformationCircle } from "react-icons/hi";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var severityConfig = {
  low: {
    icon: /* @__PURE__ */ jsx3(HiInformationCircle, { className: "w-5 h-5 text-blue-500" }),
    color: "bg-blue-500/20 border-blue-500/30",
    buttonVariant: "primary"
  },
  medium: {
    icon: /* @__PURE__ */ jsx3(HiExclamation, { className: "w-5 h-5 text-yellow-500" }),
    color: "bg-yellow-500/20 border-yellow-500/30",
    buttonVariant: "secondary"
  },
  high: {
    icon: /* @__PURE__ */ jsx3(HiExclamationCircle, { className: "w-5 h-5 text-orange-500" }),
    color: "bg-orange-500/20 border-orange-500/30",
    buttonVariant: "secondary"
  },
  critical: {
    icon: /* @__PURE__ */ jsx3(HiExclamationCircle, { className: "w-5 h-5 text-red-500" }),
    color: "bg-red-500/20 border-red-500/30",
    buttonVariant: "secondary"
  }
};
var Confirmation = React3.forwardRef(
  ({
    mode = "auto",
    severity = "medium",
    onConfirm,
    onCancel,
    triggerLabel,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    disabled = false,
    title,
    description,
    icon,
    destructiveActionWarning,
    countdownSeconds,
    requiresReason = false,
    confirmationText,
    autoResetAfter
  }, ref) => {
    const [isConfirming, setIsConfirming] = useState2(false);
    const [isLoading, setIsLoading] = useState2(false);
    const [error, setError] = useState2(null);
    const [countdown, setCountdown] = useState2(countdownSeconds || 0);
    const [inputValue, setInputValue] = useState2("");
    const [showDialogMode, setShowDialogMode] = useState2(false);
    const effectiveMode = mode === "auto" ? severity === "low" || severity === "medium" ? "inline" : "dialog" : mode;
    useEffect(() => {
      if (!isConfirming || countdown <= 0)
        return;
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1e3);
      return () => clearTimeout(timer);
    }, [isConfirming, countdown]);
    useEffect(() => {
      if (!isConfirming || !autoResetAfter)
        return;
      const timer = setTimeout(() => {
        resetConfirmation();
      }, autoResetAfter);
      return () => clearTimeout(timer);
    }, [isConfirming, autoResetAfter]);
    const resetConfirmation = () => {
      setIsConfirming(false);
      setError(null);
      setCountdown(countdownSeconds || 0);
      setInputValue("");
      setShowDialogMode(false);
    };
    const handleTrigger = () => {
      if (effectiveMode === "dialog") {
        setShowDialogMode(true);
        setIsConfirming(true);
      } else {
        setIsConfirming(true);
      }
      setCountdown(countdownSeconds || 0);
    };
    const handleConfirm = async () => {
      if (requiresReason && inputValue !== confirmationText) {
        setError(`Please type "${confirmationText}" to confirm`);
        return;
      }
      if (countdownSeconds && countdown > 0) {
        setError(`Please wait ${countdown} seconds before confirming`);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        await Promise.resolve(onConfirm());
        resetConfirmation();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    };
    const handleCancel = () => {
      onCancel == null ? void 0 : onCancel();
      resetConfirmation();
    };
    const config = severityConfig[severity];
    const canConfirm = !countdownSeconds || countdown === 0;
    const confirmationValid = !requiresReason || inputValue === confirmationText;
    if (effectiveMode === "inline" && !showDialogMode) {
      return /* @__PURE__ */ jsx3("div", { ref, children: !isConfirming ? /* @__PURE__ */ jsx3(
        Button,
        {
          onClick: handleTrigger,
          isDisabled: disabled || isLoading,
          variant: config.buttonVariant,
          children: triggerLabel
        }
      ) : /* @__PURE__ */ jsx3(Card, { className: "max-w-sm", children: /* @__PURE__ */ jsxs(Card.Body, { className: "space-y-3", children: [
        description && /* @__PURE__ */ jsx3("p", { className: "text-sm text-foreground-300", children: description }),
        error && /* @__PURE__ */ jsx3("p", { className: "text-sm text-red-400", children: error }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx3(
            Button,
            {
              size: "sm",
              variant: "primary",
              onClick: handleConfirm,
              isDisabled: !canConfirm || !confirmationValid || isLoading,
              children: isLoading ? "..." : confirmLabel
            }
          ),
          /* @__PURE__ */ jsx3(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: handleCancel,
              isDisabled: isLoading,
              children: cancelLabel
            }
          )
        ] })
      ] }) }) });
    }
    if (showDialogMode) {
      return /* @__PURE__ */ jsx3("div", { ref, children: isConfirming && /* @__PURE__ */ jsx3("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxs(Card, { className: "max-w-md mx-4", children: [
        /* @__PURE__ */ jsx3(Card.Header, { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          icon || config.icon,
          /* @__PURE__ */ jsx3("div", { className: "flex-1", children: /* @__PURE__ */ jsx3("h4", { className: "font-semibold text-foreground-100", children: title || triggerLabel }) })
        ] }) }),
        /* @__PURE__ */ jsxs(Card.Body, { className: "space-y-4", children: [
          description && /* @__PURE__ */ jsx3("p", { className: "text-sm text-foreground-300", children: description }),
          destructiveActionWarning && /* @__PURE__ */ jsx3("div", { className: cn(
            "p-3 rounded-lg border text-sm",
            config.color
          ), children: destructiveActionWarning }),
          countdownSeconds && countdown > 0 && /* @__PURE__ */ jsxs("div", { className: "text-sm text-foreground-400", children: [
            "Please wait ",
            countdown,
            "s before confirming"
          ] }),
          requiresReason && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "text-sm ml-1 text-foreground-300", children: [
              'Type "',
              confirmationText,
              '" to confirm:'
            ] }),
            /* @__PURE__ */ jsx3(
              "input",
              {
                type: "text",
                value: inputValue,
                onChange: (e) => {
                  setInputValue(e.target.value);
                  setError(null);
                },
                placeholder: confirmationText,
                className: "w-full mt-2 px-3 py-2 rounded-lg bg-background-800 border border-background-700 text-foreground-100 text-sm"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsx3("p", { className: "text-sm text-red-400", children: error })
        ] }),
        /* @__PURE__ */ jsxs(Card.Footer, { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsx3(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: handleCancel,
              isDisabled: isLoading,
              children: cancelLabel
            }
          ),
          /* @__PURE__ */ jsx3(
            Button,
            {
              size: "sm",
              variant: "primary",
              onClick: handleConfirm,
              isDisabled: !canConfirm || !confirmationValid || isLoading,
              children: isLoading ? "..." : confirmLabel
            }
          )
        ] })
      ] }) }) });
    }
    return /* @__PURE__ */ jsx3("div", { ref, children: /* @__PURE__ */ jsx3(
      Button,
      {
        onClick: handleTrigger,
        isDisabled: disabled || isLoading,
        variant: config.buttonVariant,
        children: triggerLabel
      }
    ) });
  }
);
Confirmation.displayName = "Confirmation";
export {
  Confirmation
};
