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

// src/components/Modal/Modal.tsx
import * as React from "react";
import { createPortal } from "react-dom";
import { useDialog, useModalOverlay, mergeProps } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Modal/Modal.tsx
import { HiX } from "react-icons/hi";

// src/components/Modal/Modal.module.css
var Modal_default = {};

// src/components/Modal/Modal.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var useModalKeyboard = (ref, isOpen, isDismissable, isKeyboardDismissDisabled, onClose) => {
  React.useEffect(() => {
    if (!isOpen || !ref.current)
      return;
    ref.current.focus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isDismissable && !isKeyboardDismissDisabled) {
        e.preventDefault();
        onClose();
      }
    };
    ref.current.addEventListener("keydown", handleKeyDown);
    return () => {
      var _a;
      return (_a = ref.current) == null ? void 0 : _a.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isDismissable, isKeyboardDismissDisabled, onClose]);
};
var sizeClasses = {
  sm: Modal_default["size-sm"],
  md: Modal_default["size-md"],
  lg: Modal_default["size-lg"],
  xl: Modal_default["size-xl"]
};
var ModalBase = React.forwardRef(
  ({
    isOpen: controlledIsOpen,
    onOpenChange,
    title,
    children,
    footer,
    closeButton = true,
    size = "md",
    isDismissable = true,
    isKeyboardDismissDisabled = false,
    className,
    contentClassName,
    overlayClassName
  }, ref) => {
    const modalRef = React.useRef(null);
    const [mounted, setMounted] = React.useState(false);
    const state = useOverlayTriggerState({
      isOpen: controlledIsOpen,
      onOpenChange
    });
    React.useEffect(() => {
      setMounted(true);
    }, []);
    React.useImperativeHandle(ref, () => modalRef.current);
    useModalKeyboard(
      modalRef,
      state.isOpen,
      isDismissable,
      isKeyboardDismissDisabled,
      () => state.close()
    );
    const { dialogProps, titleProps } = useDialog({}, modalRef);
    const { modalProps, underlayProps } = useModalOverlay(
      {
        isDismissable,
        isKeyboardDismissDisabled
      },
      state,
      modalRef
    );
    if (!mounted || !state.isOpen) {
      return null;
    }
    const handleClose = () => {
      state.close();
    };
    return createPortal(
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "fixed inset-0 z-9999 flex items-center justify-center",
            Modal_default.overlay,
            overlayClassName
          ),
          children: [
            /* @__PURE__ */ jsx(
              "div",
              __spreadProps(__spreadValues({}, underlayProps), {
                className: cn(Modal_default.backdrop)
              })
            ),
            /* @__PURE__ */ jsxs(
              "div",
              __spreadProps(__spreadValues({}, mergeProps(dialogProps, modalProps)), {
                ref: modalRef,
                className: cn(
                  Modal_default.modal,
                  sizeClasses[size],
                  className
                ),
                onClick: (e) => e.stopPropagation(),
                tabIndex: -1,
                "data-open": state.isOpen || void 0,
                children: [
                  (title || closeButton) && /* @__PURE__ */ jsxs("div", { className: Modal_default.header, children: [
                    title && /* @__PURE__ */ jsx("h4", __spreadProps(__spreadValues({}, titleProps), { className: Modal_default.title, children: title })),
                    !title && closeButton && /* @__PURE__ */ jsx("div", { className: Modal_default.spacer }),
                    closeButton && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: handleClose,
                        className: Modal_default.closeButton,
                        "aria-label": "Close modal",
                        children: /* @__PURE__ */ jsx(HiX, { className: Modal_default.closeIcon })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: cn(Modal_default.content, contentClassName), children }),
                  footer && /* @__PURE__ */ jsx("div", { className: Modal_default.footer, children: footer })
                ]
              })
            )
          ]
        }
      ),
      document.body
    );
  }
);
ModalBase.displayName = "Modal";
var ModalHeader = React.forwardRef((_a, ref) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({ ref, className: Modal_default.header }, props), { children }));
});
ModalHeader.displayName = "Modal.Header";
var ModalBody = React.forwardRef((_a, ref) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({ ref, className: Modal_default.content }, props), { children }));
});
ModalBody.displayName = "Modal.Body";
var ModalFooter = React.forwardRef((_a, ref) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({ ref, className: Modal_default.footer }, props), { children }));
});
ModalFooter.displayName = "Modal.Footer";
var Modal = ModalBase;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
export {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
};
