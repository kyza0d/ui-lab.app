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

// src/components/Group/Group.tsx
import * as React9 from "react";

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
    var _b = _a, { className, variant = "primary", size: size2 = "md", children, onClick, onPress, isDisabled, disabled } = _b, props = __objRest(_b, ["className", "variant", "size", "children", "onClick", "onPress", "isDisabled", "disabled"]);
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
        className: cn("button", variant, size2, Button_default.button, variantMap[variant], sizeMap[size2], className),
        "data-variant": variant,
        "data-size": size2,
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

// src/components/Input/Input.tsx
import React2, { forwardRef as forwardRef2 } from "react";
import { useFocusRing as useFocusRing2, mergeProps as mergeProps2 } from "react-aria";

// src/components/Input/Input.module.css
var Input_default = {};

// src/components/Input/Input.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function useMergedRef2(...refs) {
  return React2.useCallback((value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function")
        ref(value);
      else if (ref && typeof ref === "object")
        ref.current = value;
    });
  }, refs);
}
var Input = forwardRef2(
  (_a, ref) => {
    var _b = _a, {
      className,
      variant = "default",
      size: size2 = "md",
      error = false,
      disabled,
      prefixIcon,
      suffixIcon,
      type = "text"
    } = _b, props = __objRest(_b, [
      "className",
      "variant",
      "size",
      "error",
      "disabled",
      "prefixIcon",
      "suffixIcon",
      "type"
    ]);
    const hasPrefix = !!prefixIcon;
    const hasSuffix = !!suffixIcon;
    const inputRef = React2.useRef(null);
    const mergedRef = useMergedRef2(ref, inputRef);
    const { focusProps, isFocusVisible } = useFocusRing2();
    return /* @__PURE__ */ jsxs("div", { className: Input_default.container, children: [
      hasPrefix && /* @__PURE__ */ jsx2("div", { className: cn(Input_default.iconWrapper, Input_default.prefixIcon), children: prefixIcon }),
      /* @__PURE__ */ jsx2(
        "input",
        __spreadValues({
          ref: mergedRef,
          type,
          disabled,
          "data-focus-visible": isFocusVisible ? "true" : void 0,
          "data-disabled": disabled || void 0,
          "data-error": error ? "true" : void 0,
          "data-variant": variant,
          "data-size": size2,
          className: cn(
            Input_default.input,
            hasPrefix && "pl-10",
            hasSuffix && "pr-10",
            className
          )
        }, mergeProps2(focusProps, props))
      ),
      hasSuffix && /* @__PURE__ */ jsx2("div", { className: cn(Input_default.iconWrapper, Input_default.suffixIcon), children: suffixIcon })
    ] });
  }
);
Input.displayName = "Input";

// src/components/Select/Select.tsx
import * as React3 from "react";
import { useButton as useButton2, useFocusRing as useFocusRing3, useHover as useHover2, mergeProps as mergeProps3, useFilter } from "react-aria";

// src/components/Select/Select.module.css
var Select_default = {};

// src/components/Select/Select.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var SelectContext = React3.createContext(null);
function useSelectContext() {
  const context = React3.useContext(SelectContext);
  if (!context) {
    throw new Error("Select component must be used within Select root");
  }
  return context;
}
var Select = React3.forwardRef(
  ({
    items: propItems = [],
    selectedKey: controlledSelectedKey,
    defaultSelectedKey,
    defaultValue,
    onSelectionChange,
    isDisabled = false,
    autoFocus = false,
    maxItems = 6,
    children,
    className,
    trigger: triggerMode = "click"
  }, ref) => {
    const triggerRef = React3.useRef(null);
    const [isOpen, setIsOpen] = React3.useState(false);
    const hoverTimeoutRef = React3.useRef(null);
    const handleHoverIntent = React3.useCallback((isHovering) => {
      if (triggerMode !== "hover" || isDisabled)
        return;
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      if (isHovering) {
        setIsOpen(true);
      } else {
        hoverTimeoutRef.current = setTimeout(() => {
          setIsOpen(false);
        }, 100);
      }
    }, [triggerMode, isDisabled]);
    React3.useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      };
    }, []);
    const [uncontrolledSelectedKey, setUncontrolledSelectedKey] = React3.useState(
      defaultSelectedKey != null ? defaultSelectedKey : null
    );
    const [searchValue, setSearchValue] = React3.useState("");
    const [focusedKey, setFocusedKey] = React3.useState(null);
    const [selectedTextValue, setSelectedTextValue] = React3.useState(defaultValue != null ? defaultValue : "");
    const selectedKey = controlledSelectedKey !== void 0 ? controlledSelectedKey : uncontrolledSelectedKey;
    const registeredItemsRef = React3.useRef(/* @__PURE__ */ new Map());
    const [registeredItems, setRegisteredItems] = React3.useState([]);
    const { contains } = useFilter({ sensitivity: "base" });
    const registerItem = React3.useCallback((key, textValue, isDisabled2) => {
      registeredItemsRef.current.set(key, { key, textValue, isDisabled: isDisabled2 });
      setRegisteredItems(Array.from(registeredItemsRef.current.values()));
    }, []);
    const unregisterItem = React3.useCallback((key) => {
      registeredItemsRef.current.delete(key);
      setRegisteredItems(Array.from(registeredItemsRef.current.values()));
    }, []);
    const items = propItems.length > 0 ? propItems : registeredItems;
    const filteredItems = React3.useMemo(() => {
      if (!searchValue.trim())
        return items;
      return items.filter((item) => contains(item.textValue, searchValue));
    }, [items, searchValue, contains]);
    const visibleKeys = React3.useMemo(() => {
      return new Set(filteredItems.map((item) => item.key));
    }, [filteredItems]);
    const enabledFilteredItems = React3.useMemo(() => {
      return filteredItems.filter((item) => !item.isDisabled);
    }, [filteredItems]);
    const onSelect = React3.useCallback((key) => {
      const item = items.find((i) => i.key === key);
      if (item) {
        setSelectedTextValue(item.textValue);
      }
      if (controlledSelectedKey === void 0) {
        setUncontrolledSelectedKey(key);
      }
      onSelectionChange == null ? void 0 : onSelectionChange(key);
      setIsOpen(false);
      setSearchValue("");
    }, [controlledSelectedKey, onSelectionChange, items]);
    const navigateToNextItem = React3.useCallback(() => {
      if (enabledFilteredItems.length === 0)
        return;
      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex((item) => item.key === focusedKey) : -1;
      const nextIndex = currentIndex < enabledFilteredItems.length - 1 ? currentIndex + 1 : 0;
      setFocusedKey(enabledFilteredItems[nextIndex].key);
    }, [enabledFilteredItems, focusedKey]);
    const navigateToPrevItem = React3.useCallback(() => {
      if (enabledFilteredItems.length === 0)
        return;
      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex((item) => item.key === focusedKey) : 0;
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledFilteredItems.length - 1;
      setFocusedKey(enabledFilteredItems[prevIndex].key);
    }, [enabledFilteredItems, focusedKey]);
    const selectFocusedItem = React3.useCallback(() => {
      if (focusedKey !== null) {
        const item = enabledFilteredItems.find((item2) => item2.key === focusedKey);
        if (item && !item.isDisabled) {
          onSelect(focusedKey);
        }
      }
    }, [focusedKey, enabledFilteredItems, onSelect]);
    React3.useEffect(() => {
      if (isOpen) {
        if (selectedKey !== null && visibleKeys.has(selectedKey)) {
          const selectedItem = filteredItems.find((item) => item.key === selectedKey);
          if (selectedItem && !selectedItem.isDisabled) {
            setFocusedKey(selectedKey);
            return;
          }
        }
        if (enabledFilteredItems.length > 0) {
          setFocusedKey(enabledFilteredItems[0].key);
        } else {
          setFocusedKey(null);
        }
      }
    }, [isOpen, selectedKey, visibleKeys, enabledFilteredItems, filteredItems]);
    React3.useEffect(() => {
      if (focusedKey !== null && !visibleKeys.has(focusedKey)) {
        if (enabledFilteredItems.length > 0) {
          setFocusedKey(enabledFilteredItems[0].key);
        } else {
          setFocusedKey(null);
        }
      }
    }, [visibleKeys, enabledFilteredItems, focusedKey]);
    const { buttonProps, isPressed } = useButton2({
      isDisabled,
      onPress: () => !isDisabled && setIsOpen((prev) => !prev)
    }, triggerRef);
    const { focusProps, isFocusVisible } = useFocusRing3();
    const { hoverProps, isHovered } = useHover2({ isDisabled });
    const triggerProps = mergeProps3(buttonProps, focusProps, hoverProps, {
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen
    });
    React3.useEffect(() => {
      if (autoFocus && triggerRef.current) {
        triggerRef.current.focus({ preventScroll: true });
      }
    }, [autoFocus]);
    React3.useEffect(() => {
      if (!isOpen) {
        setSearchValue("");
      }
    }, [isOpen]);
    React3.useEffect(() => {
      if (selectedKey === null) {
        setSelectedTextValue("");
      } else {
        const selectedItem = items.find((item) => item.key === selectedKey);
        if (selectedItem) {
          setSelectedTextValue(selectedItem.textValue);
        }
      }
    }, [selectedKey, items]);
    return /* @__PURE__ */ jsx3(
      SelectContext.Provider,
      {
        value: {
          isOpen,
          setIsOpen,
          selectedKey,
          selectedTextValue,
          onSelect,
          triggerRef,
          triggerProps,
          isFocusVisible,
          isPressed,
          isHovered,
          isDisabled,
          items,
          registerItem,
          unregisterItem,
          searchValue,
          setSearchValue,
          filteredItems,
          visibleKeys,
          focusedKey,
          setFocusedKey,
          navigateToNextItem,
          navigateToPrevItem,
          selectFocusedItem,
          maxItems,
          triggerMode,
          handleHoverIntent
        },
        children: /* @__PURE__ */ jsx3("div", { ref, className: cn(Select_default.select, className), children })
      }
    );
  }
);
Select.displayName = "Select";
var SelectListBox = React3.forwardRef(
  ({ children, className }, forwardedRef) => {
    const {
      setIsOpen,
      isOpen,
      focusedKey,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      filteredItems,
      setFocusedKey
    } = useSelectContext();
    const listBoxRef = React3.useRef(null);
    const mergedRef = React3.useCallback(
      (el) => {
        listBoxRef.current = el;
        if (typeof forwardedRef === "function")
          forwardedRef(el);
        else if (forwardedRef)
          forwardedRef.current = el;
      },
      [forwardedRef]
    );
    const handleKeyDown = React3.useCallback((e) => {
      var _a;
      if (!isOpen)
        return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          navigateToNextItem();
          break;
        case "ArrowUp":
          e.preventDefault();
          navigateToPrevItem();
          break;
        case "Home":
          e.preventDefault();
          if (filteredItems.length > 0) {
            const firstEnabled = filteredItems.find((item) => !item.isDisabled);
            if (firstEnabled)
              setFocusedKey(firstEnabled.key);
          }
          break;
        case "End":
          e.preventDefault();
          if (filteredItems.length > 0) {
            const lastEnabled = [...filteredItems].reverse().find((item) => !item.isDisabled);
            if (lastEnabled)
              setFocusedKey(lastEnabled.key);
          }
          break;
        case "Enter":
          e.preventDefault();
          selectFocusedItem();
          break;
        case " ":
          if (((_a = document.activeElement) == null ? void 0 : _a.tagName) !== "INPUT") {
            e.preventDefault();
            selectFocusedItem();
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    }, [isOpen, navigateToNextItem, navigateToPrevItem, selectFocusedItem, setIsOpen, filteredItems, setFocusedKey]);
    React3.useEffect(() => {
      var _a;
      if (isOpen) {
        if (((_a = document.activeElement) == null ? void 0 : _a.tagName) !== "INPUT") {
          requestAnimationFrame(() => {
            var _a2;
            (_a2 = listBoxRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
          });
        }
      }
    }, [isOpen]);
    return /* @__PURE__ */ jsx3(
      "ul",
      {
        ref: mergedRef,
        role: "listbox",
        tabIndex: isOpen ? 0 : -1,
        className,
        onKeyDown: handleKeyDown,
        style: { outline: "none" },
        children: React3.Children.map(children, (child) => {
          if (React3.isValidElement(child)) {
            return React3.cloneElement(child, { _focusedKey: focusedKey });
          }
          return child;
        })
      }
    );
  }
);
SelectListBox.displayName = "SelectListBox";

// src/components/Select/Select.Trigger.tsx
import * as React4 from "react";
import { FaChevronDown } from "react-icons/fa6";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var SelectTrigger = React4.forwardRef(
  ({ children, className, chevron }, ref) => {
    const {
      triggerRef: contextTriggerRef,
      triggerProps,
      isFocusVisible,
      isPressed,
      isHovered,
      triggerMode,
      handleHoverIntent
    } = useSelectContext();
    const mergedRef = React4.useCallback(
      (el) => {
        contextTriggerRef.current = el;
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref, contextTriggerRef]
    );
    const hoverHandlers = triggerMode === "hover" ? {
      onMouseEnter: () => handleHoverIntent(true),
      onMouseLeave: () => handleHoverIntent(false)
    } : {};
    return /* @__PURE__ */ jsxs2(
      "button",
      __spreadProps(__spreadValues(__spreadValues({
        ref: mergedRef,
        className: cn("trigger", Select_default.trigger, className),
        "data-focus-visible": isFocusVisible || void 0,
        "data-pressed": isPressed || void 0,
        "data-hovered": isHovered || void 0
      }, triggerProps), hoverHandlers), {
        children: [
          /* @__PURE__ */ jsx4("span", { children }),
          chevron !== void 0 ? /* @__PURE__ */ jsx4("div", { className: Select_default.icon, children: chevron }) : /* @__PURE__ */ jsx4(FaChevronDown, { className: Select_default.icon })
        ]
      })
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";
var SearchableTrigger = React4.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, placeholder = "Search..." } = _b, props = __objRest(_b, ["className", "placeholder"]);
    const {
      searchValue,
      setSearchValue,
      isDisabled,
      setIsOpen,
      isOpen,
      selectedTextValue,
      triggerRef: contextTriggerRef,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      filteredItems,
      setFocusedKey
    } = useSelectContext();
    const inputRef = React4.useRef(null);
    const [isSearchActive, setIsSearchActive] = React4.useState(false);
    const mergedRef = React4.useCallback(
      (el) => {
        contextTriggerRef.current = el;
        inputRef.current = el;
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref, contextTriggerRef]
    );
    React4.useEffect(() => {
      if (!isOpen) {
        setIsSearchActive(false);
      }
    }, [isOpen]);
    const displayValue = isSearchActive ? searchValue : selectedTextValue || "";
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            navigateToNextItem();
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            navigateToPrevItem();
          }
          break;
        case "Enter":
          e.preventDefault();
          if (isOpen) {
            selectFocusedItem();
          } else {
            setIsOpen(true);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setSearchValue("");
          setIsSearchActive(false);
          break;
        case "Home":
          if (isOpen && e.ctrlKey) {
            e.preventDefault();
            const firstEnabled = filteredItems.find((item) => !item.isDisabled);
            if (firstEnabled)
              setFocusedKey(firstEnabled.key);
          }
          break;
        case "End":
          if (isOpen && e.ctrlKey) {
            e.preventDefault();
            const lastEnabled = [...filteredItems].reverse().find((item) => !item.isDisabled);
            if (lastEnabled)
              setFocusedKey(lastEnabled.key);
          }
          break;
      }
    };
    const handleClick = () => {
      if (selectedTextValue && !searchValue && inputRef.current) {
        inputRef.current.select();
      }
      if (!isOpen) {
        setIsOpen(true);
      }
    };
    return /* @__PURE__ */ jsx4(
      "input",
      __spreadValues({
        ref: mergedRef,
        type: "text",
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-expanded": isOpen,
        "aria-autocomplete": "list",
        value: displayValue,
        onChange: (e) => {
          setSearchValue(e.target.value);
          setIsSearchActive(true);
          setIsOpen(true);
        },
        onKeyDown: handleKeyDown,
        onClick: handleClick,
        onFocus: () => {
          if (!isOpen) {
            setIsOpen(true);
          }
        },
        placeholder,
        disabled: isDisabled,
        className: cn(Select_default.trigger, className)
      }, props)
    );
  }
);
SearchableTrigger.displayName = "SearchableTrigger";

// src/components/Select/Select.Content.tsx
import * as React5 from "react";
import * as ReactDOM from "react-dom";
import { useFloating, flip, shift, offset, size, autoUpdate } from "@floating-ui/react-dom";
import { Fragment, jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var SelectContent = React5.forwardRef(
  ({ children, className }, ref) => {
    const { isOpen, setIsOpen, triggerRef, maxItems, triggerMode, handleHoverIntent } = useSelectContext();
    const [portalContainer, setPortalContainer] = React5.useState(null);
    const { refs, floatingStyles, x, y, placement } = useFloating({
      placement: "bottom-start",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(2),
        // 2px gap
        flip({
          fallbackPlacements: ["top-start"]
        }),
        shift({ padding: 8 }),
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${Math.max(rects.reference.width, 512)}px`,
              minWidth: `${rects.reference.width}px`
            });
          },
          padding: 8
        })
      ]
    });
    const isPositioned = x !== null && y !== null;
    React5.useLayoutEffect(() => {
      refs.setReference(triggerRef.current);
    }, [refs, triggerRef]);
    React5.useEffect(() => {
      if (typeof document === "undefined")
        return;
      const container = document.createElement("div");
      container.setAttribute("data-select-portal", "");
      container.style.cssText = "position: fixed; top: 0; left: 0; z-index: 50000;";
      document.body.appendChild(container);
      setPortalContainer(container);
      return () => {
        document.body.removeChild(container);
      };
    }, []);
    const mergedRef = React5.useCallback(
      (el) => {
        refs.setFloating(el);
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref, refs]
    );
    if (!portalContainer)
      return null;
    const showContent = isOpen && isPositioned;
    const hoverHandlers = triggerMode === "hover" ? {
      onMouseEnter: () => handleHoverIntent(true),
      onMouseLeave: () => handleHoverIntent(false)
    } : {};
    return ReactDOM.createPortal(
      /* @__PURE__ */ jsxs3(Fragment, { children: [
        showContent && triggerMode !== "hover" && /* @__PURE__ */ jsx5(
          "div",
          {
            style: { position: "fixed", inset: 0, zIndex: 49999 },
            onClick: () => setIsOpen(false)
          }
        ),
        isOpen && /* @__PURE__ */ jsx5(
          "div",
          __spreadProps(__spreadValues({
            ref: mergedRef,
            className: cn(Select_default.content, className),
            "data-state": showContent ? "open" : "closed",
            "data-placement": placement.split("-")[0],
            style: __spreadProps(__spreadValues({}, floatingStyles), {
              // Hide visually until position is calculated to prevent flash at (0,0)
              visibility: isPositioned ? "visible" : "hidden"
            })
          }, hoverHandlers), {
            children: /* @__PURE__ */ jsx5("div", { className: Select_default.viewport, style: { maxHeight: `calc(${maxItems} * 36px + 8px)` }, children })
          })
        )
      ] }),
      portalContainer
    );
  }
);
SelectContent.displayName = "SelectContent";
var SearchableContent = React5.forwardRef(
  ({ children, className, searchPlaceholder = "Search items...", onSearch }, ref) => {
    const {
      isOpen,
      setIsOpen,
      triggerRef,
      searchValue,
      setSearchValue,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      filteredItems,
      setFocusedKey,
      focusedKey,
      maxItems,
      triggerMode,
      handleHoverIntent
    } = useSelectContext();
    const inputRef = React5.useRef(null);
    const [portalContainer, setPortalContainer] = React5.useState(null);
    const { refs, floatingStyles, x, y, placement } = useFloating({
      placement: "bottom-start",
      strategy: "fixed",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(2),
        // 2px gap
        flip({
          fallbackPlacements: ["top-start"]
        }),
        shift({ padding: 8 }),
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${Math.max(rects.reference.width, 512)}px`,
              minWidth: `${rects.reference.width}px`
            });
          },
          padding: 8
        })
      ]
    });
    const isPositioned = x !== null && y !== null;
    React5.useLayoutEffect(() => {
      refs.setReference(triggerRef.current);
    }, [refs, triggerRef]);
    React5.useEffect(() => {
      if (typeof document === "undefined")
        return;
      const container = document.createElement("div");
      container.setAttribute("data-select-portal", "");
      container.style.cssText = "position: absolute; top: 0; left: 0; z-index: 50000;";
      document.body.appendChild(container);
      setPortalContainer(container);
      return () => {
        document.body.removeChild(container);
      };
    }, []);
    React5.useEffect(() => {
      if (isOpen && inputRef.current) {
        requestAnimationFrame(() => {
          var _a;
          (_a = inputRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
        });
      }
    }, [isOpen]);
    const mergedRef = React5.useCallback(
      (el) => {
        refs.setFloating(el);
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref, refs]
    );
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          navigateToNextItem();
          break;
        case "ArrowUp":
          e.preventDefault();
          navigateToPrevItem();
          break;
        case "Enter":
          e.preventDefault();
          selectFocusedItem();
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setSearchValue("");
          break;
        case "Home":
          if (e.ctrlKey) {
            e.preventDefault();
            const firstEnabled = filteredItems.find((item) => !item.isDisabled);
            if (firstEnabled)
              setFocusedKey(firstEnabled.key);
          }
          break;
        case "End":
          if (e.ctrlKey) {
            e.preventDefault();
            const lastEnabled = [...filteredItems].reverse().find((item) => !item.isDisabled);
            if (lastEnabled)
              setFocusedKey(lastEnabled.key);
          }
          break;
      }
    };
    if (!portalContainer)
      return null;
    const showContent = isOpen && isPositioned;
    const hoverHandlers = triggerMode === "hover" ? {
      onMouseEnter: () => handleHoverIntent(true),
      onMouseLeave: () => handleHoverIntent(false)
    } : {};
    return ReactDOM.createPortal(
      /* @__PURE__ */ jsxs3(Fragment, { children: [
        showContent && triggerMode !== "hover" && /* @__PURE__ */ jsx5(
          "div",
          {
            style: { position: "fixed", inset: 0, zIndex: 49999 },
            onClick: () => setIsOpen(false)
          }
        ),
        isOpen && /* @__PURE__ */ jsxs3(
          "div",
          __spreadProps(__spreadValues({
            ref: mergedRef,
            className: cn(Select_default.content, className),
            "data-state": showContent ? "open" : "closed",
            "data-placement": placement.split("-")[0],
            style: __spreadProps(__spreadValues({}, floatingStyles), {
              // Hide visually until position is calculated to prevent flash at (0,0)
              visibility: isPositioned ? "visible" : "hidden"
            })
          }, hoverHandlers), {
            children: [
              /* @__PURE__ */ jsx5("div", { className: "px-2 py-2", children: /* @__PURE__ */ jsx5(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  role: "combobox",
                  "aria-haspopup": "listbox",
                  "aria-expanded": isOpen,
                  "aria-autocomplete": "list",
                  "aria-activedescendant": focusedKey !== null ? String(focusedKey) : void 0,
                  value: searchValue,
                  onChange: (e) => {
                    setSearchValue(e.target.value);
                    onSearch == null ? void 0 : onSearch(e.target.value);
                  },
                  onKeyDown: handleKeyDown,
                  placeholder: searchPlaceholder,
                  className: "w-full px-2 py-1.5 text-sm border border-border rounded bg-background text-foreground placeholder-foreground-500"
                }
              ) }),
              /* @__PURE__ */ jsx5("div", { className: Select_default.viewport, style: { maxHeight: `calc(${maxItems} * 36px + 8px)` }, children })
            ]
          })
        )
      ] }),
      portalContainer
    );
  }
);
SearchableContent.displayName = "SearchableContent";

// src/components/Select/Select.Items.tsx
import * as React6 from "react";
import { FaCheck } from "react-icons/fa6";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var SelectGroup = React6.forwardRef(
  ({ children, title, className }, ref) => /* @__PURE__ */ jsxs4("div", { ref, className, children: [
    title && /* @__PURE__ */ jsx6("div", { className: "px-2 py-1 text-xs font-medium text-foreground-400", children: title }),
    children
  ] })
);
SelectGroup.displayName = "SelectGroup";
var SelectValue = React6.forwardRef(
  ({ placeholder = "Select an option", className, icon }, ref) => {
    const { selectedTextValue } = useSelectContext();
    return /* @__PURE__ */ jsxs4("span", { ref, className: cn(Select_default.value, className), children: [
      icon && /* @__PURE__ */ jsx6("span", { className: Select_default.valueIcon, children: icon }),
      /* @__PURE__ */ jsx6("span", { className: Select_default.valueText, children: selectedTextValue || placeholder })
    ] });
  }
);
SelectValue.displayName = "SelectValue";
var SelectItem = React6.forwardRef(
  ({ children, isDisabled = false, className, textValue, value, icon, _focusedKey }, forwardedRef) => {
    const { selectedKey, onSelect, registerItem, unregisterItem, visibleKeys, isOpen, setFocusedKey } = useSelectContext();
    const itemRef = React6.useRef(null);
    const [isHovered, setIsHovered] = React6.useState(false);
    const finalTextValue = typeof textValue === "string" ? textValue : String(children);
    const isSelected = selectedKey === value;
    const isFocused = isOpen && _focusedKey === value;
    const isVisible = visibleKeys.has(value);
    React6.useEffect(() => {
      registerItem(value, finalTextValue, isDisabled);
      return () => unregisterItem(value);
    }, [value, finalTextValue, isDisabled, registerItem, unregisterItem]);
    React6.useEffect(() => {
      if (isFocused && itemRef.current) {
        const viewportEl = itemRef.current.closest('[class*="viewport"]');
        if (!viewportEl)
          return;
        const itemRect = itemRef.current.getBoundingClientRect();
        const viewportRect = viewportEl.getBoundingClientRect();
        const isAbove = itemRect.top < viewportRect.top;
        const isBelow = itemRect.bottom > viewportRect.bottom;
        if (isAbove || isBelow) {
          const scrollTop = isAbove ? itemRef.current.offsetTop - viewportEl.offsetTop : itemRef.current.offsetTop - viewportEl.offsetTop - viewportEl.clientHeight + itemRect.height;
          viewportEl.scrollTo({
            top: scrollTop,
            behavior: "smooth"
          });
        }
      }
    }, [isFocused]);
    const mergedRef = React6.useCallback(
      (el) => {
        itemRef.current = el;
        if (typeof forwardedRef === "function")
          forwardedRef(el);
        else if (forwardedRef)
          forwardedRef.current = el;
      },
      [forwardedRef]
    );
    const handleClick = () => {
      if (!isDisabled)
        onSelect(value);
    };
    const handleMouseEnter = () => {
      setIsHovered(true);
      if (!isDisabled) {
        setFocusedKey(value);
      }
    };
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsxs4(
      "li",
      {
        ref: mergedRef,
        role: "option",
        "aria-selected": isSelected,
        "aria-disabled": isDisabled || void 0,
        className: cn(Select_default.item, className),
        "data-selected": isSelected || void 0,
        "data-disabled": isDisabled || void 0,
        "data-focus-visible": isFocused || void 0,
        "data-hovered": isHovered || void 0,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: () => setIsHovered(false),
        onClick: handleClick,
        children: [
          icon && /* @__PURE__ */ jsx6("div", { className: Select_default.itemIcon, children: icon }),
          /* @__PURE__ */ jsx6("div", { className: Select_default.itemText, children }),
          /* @__PURE__ */ jsx6("div", { className: Select_default.itemIndicator, children: isSelected && /* @__PURE__ */ jsx6(FaCheck, { className: "w-3 h-3" }) })
        ]
      }
    );
  }
);
SelectItem.displayName = "SelectItem";

// src/components/Select/Select.Decorative.tsx
import * as React7 from "react";
import { FaChevronDown as FaChevronDown2 } from "react-icons/fa6";
import { jsx as jsx7 } from "react/jsx-runtime";
var SelectSeparator = React7.forwardRef(
  ({ className }, ref) => /* @__PURE__ */ jsx7("div", { ref, className: cn(Select_default.separator, className), role: "separator" })
);
SelectSeparator.displayName = "SelectSeparator";
var SelectScrollUpButton = React7.forwardRef(
  ({ children }, ref) => /* @__PURE__ */ jsx7("button", { ref, className: Select_default.scrollButton, type: "button", children: children || /* @__PURE__ */ jsx7(FaChevronDown2, { className: "w-2.5 h-2.5" }) })
);
SelectScrollUpButton.displayName = "SelectScrollUpButton";
var SelectScrollDownButton = React7.forwardRef(
  ({ children }, ref) => /* @__PURE__ */ jsx7("button", { ref, className: Select_default.scrollButton, type: "button", children: children || /* @__PURE__ */ jsx7(FaChevronDown2, { className: "w-2.5 h-2.5" }) })
);
SelectScrollDownButton.displayName = "SelectScrollDownButton";

// src/components/Select/index.ts
var Select2 = Object.assign(Select, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  Value: SelectValue,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton
});
var Searchable = Object.assign(() => null, {
  Trigger: SearchableTrigger,
  Content: SearchableContent
});

// src/components/Divider/Divider.tsx
import { cva } from "class-variance-authority";
import React8 from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var dividerVariants = cva("shrink-0", {
  variants: {
    variant: {
      solid: "",
      dashed: "",
      dotted: ""
    },
    orientation: {
      horizontal: "w-full",
      vertical: ""
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    },
    color: {
      default: "",
      muted: "",
      subtle: ""
    },
    spacing: {
      none: "",
      sm: "",
      md: "",
      lg: ""
    }
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: "h-px"
    },
    {
      orientation: "vertical",
      size: "sm",
      class: "w-px self-stretch"
    },
    {
      orientation: "horizontal",
      size: "md",
      class: "h-0.5"
    },
    {
      orientation: "vertical",
      size: "md",
      class: "w-0.5 self-stretch"
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: "h-1"
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "w-1 self-stretch"
    },
    {
      orientation: "horizontal",
      spacing: "none",
      class: "my-0"
    },
    {
      orientation: "vertical",
      spacing: "none",
      class: "mx-0"
    },
    {
      orientation: "horizontal",
      spacing: "sm",
      class: "my-1"
    },
    {
      orientation: "vertical",
      spacing: "sm"
    },
    {
      orientation: "horizontal",
      spacing: "md",
      class: "my-1"
    },
    {
      orientation: "vertical",
      spacing: "md",
      class: "mx-1"
    },
    {
      orientation: "horizontal",
      spacing: "lg",
      class: "my-1"
    },
    {
      orientation: "vertical",
      spacing: "lg",
      class: "mx-1"
    },
    // --- Solid Variant & Color Compounds ---
    {
      variant: "solid",
      orientation: "horizontal",
      color: "default",
      class: "border-t-background-700 border-t"
    },
    {
      variant: "solid",
      orientation: "horizontal",
      color: "muted",
      class: "border-t-background-500 border-t"
    },
    {
      variant: "solid",
      orientation: "horizontal",
      color: "subtle",
      class: "border-t-background-400 border-t"
    },
    {
      variant: "solid",
      orientation: "vertical",
      color: "default",
      class: "border-l-background-700 border-l"
    },
    {
      variant: "solid",
      orientation: "vertical",
      color: "muted",
      class: "border-l-background-500 border-l"
    },
    {
      variant: "solid",
      orientation: "vertical",
      color: "subtle",
      class: "border-l-background-400 border-l"
    },
    {
      variant: "dashed",
      orientation: "horizontal",
      color: "default",
      class: "border-t-dashed border-t-background-600 border-t"
    },
    {
      variant: "dashed",
      orientation: "horizontal",
      color: "muted",
      class: "border-t-dashed border-t-background-500 border-t"
    },
    {
      variant: "dashed",
      orientation: "horizontal",
      color: "subtle",
      class: "border-t-dashed border-t-background-400 border-t"
    },
    {
      variant: "dashed",
      orientation: "vertical",
      color: "default",
      class: "border-l-dashed border-l-background-600 border-l"
    },
    {
      variant: "dashed",
      orientation: "vertical",
      color: "muted",
      class: "border-l-dashed border-l-background-500 border-l"
    },
    {
      variant: "dashed",
      orientation: "vertical",
      color: "subtle",
      class: "border-l-dashed border-l-background-400 border-l"
    },
    // --- Dotted Variant ---
    {
      variant: "dotted",
      orientation: "horizontal",
      color: "default",
      class: "border-t-dotted border-t-background-600 border-t"
    },
    {
      variant: "dotted",
      orientation: "horizontal",
      color: "muted",
      class: "border-t-dotted border-t-background-500 border-t"
    },
    {
      variant: "dotted",
      orientation: "horizontal",
      color: "subtle",
      class: "border-t-dotted border-t-background-400 border-t"
    },
    {
      variant: "dotted",
      orientation: "vertical",
      color: "default",
      class: "border-l-dotted border-l-background-600 border-l"
    },
    {
      variant: "dotted",
      orientation: "vertical",
      color: "muted",
      class: "border-l-dotted border-l-background-500 border-l"
    },
    {
      variant: "dotted",
      orientation: "vertical",
      color: "subtle",
      class: "border-l-dotted border-l-background-400 border-l"
    }
  ],
  defaultVariants: {
    variant: "solid",
    orientation: "horizontal",
    size: "md",
    color: "default",
    spacing: "md"
  }
});
var Divider = React8.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      variant,
      orientation,
      size: size2,
      color: color,
      spacing,
      style
    } = _b, props = __objRest(_b, [
      "className",
      "variant",
      "orientation",
      "size",
      // Destructure 'color'
      "color",
      "spacing",
      "style"
    ]);
    const baseClasses = cn(
      dividerVariants({
        variant,
        orientation,
        size: size2,
        color,
        // Pass the 'color' prop
        spacing,
        className
      })
    );
    const styleObject = typeof style === "string" ? {} : style;
    return /* @__PURE__ */ jsx8(
      "div",
      __spreadValues({
        ref,
        className: baseClasses,
        style: styleObject,
        role: "separator",
        "aria-orientation": orientation
      }, props)
    );
  }
);
Divider.displayName = "Divider";

// src/components/Group/Group.module.css
var Group_default = {};

// src/components/Group/Group.tsx
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var GroupContext = React9.createContext(null);
function useGroupContext() {
  const context = React9.useContext(GroupContext);
  if (!context) {
    throw new Error("Group sub-components must be used within Group");
  }
  return context;
}
var orientationMap = {
  horizontal: Group_default.horizontal,
  vertical: Group_default.vertical
};
var spacingMap = {
  tight: Group_default.tight,
  normal: Group_default.normal,
  relaxed: Group_default.relaxed
};
var variantMap2 = {
  primary: void 0,
  secondary: void 0,
  outline: void 0,
  ghost: Group_default.ghost
};
var GroupRoot = React9.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      orientation = "horizontal",
      spacing = "normal",
      variant = "primary",
      children,
      showDividers = false,
      isDisabled = false
    } = _b, props = __objRest(_b, [
      "className",
      "orientation",
      "spacing",
      "variant",
      "children",
      "showDividers",
      "isDisabled"
    ]);
    const isVertical = orientation === "vertical";
    const childrenArray = React9.Children.toArray(children).filter(
      (child) => child !== null && child !== void 0
    );
    const contextValue = {
      isInGroup: true,
      groupVariant: variant,
      groupOrientation: orientation,
      groupSpacing: spacing,
      groupIsDisabled: isDisabled
    };
    return /* @__PURE__ */ jsx9(GroupContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx9(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          Group_default.group,
          orientationMap[orientation],
          spacingMap[spacing],
          variantMap2[variant],
          className
        ),
        role: "group",
        "aria-disabled": isDisabled || void 0
      }, props), {
        children: childrenArray.map((child, index) => {
          const isFirst = index === 0;
          const isLast = index === childrenArray.length - 1;
          return /* @__PURE__ */ jsxs5(React9.Fragment, { children: [
            /* @__PURE__ */ jsx9(
              "div",
              {
                className: cn(
                  Group_default.itemWrapper,
                  isVertical ? Group_default.vertical : Group_default.horizontal,
                  isFirst && Group_default.first,
                  isLast && Group_default.last
                ),
                children: child
              }
            ),
            showDividers && index < childrenArray.length - 1 && /* @__PURE__ */ jsx9(
              Divider,
              {
                orientation: isVertical ? "horizontal" : "vertical",
                spacing: "none",
                size: "sm"
              }
            )
          ] }, index);
        })
      })
    ) });
  }
);
GroupRoot.displayName = "Group";
var GroupButton = React9.forwardRef(
  (props, ref) => {
    var _a;
    const context = useGroupContext();
    const isDisabled = (_a = props.isDisabled) != null ? _a : context.groupIsDisabled;
    return /* @__PURE__ */ jsx9(
      Button,
      __spreadProps(__spreadValues({
        ref
      }, props), {
        isDisabled,
        className: cn(Group_default.groupItem, props.className)
      })
    );
  }
);
GroupButton.displayName = "Group.Button";
var GroupInput = React9.forwardRef(
  (props, ref) => {
    var _a;
    const context = useGroupContext();
    const disabled = (_a = props.disabled) != null ? _a : context.groupIsDisabled;
    return /* @__PURE__ */ jsx9("div", { className: Group_default.groupInputWrapper, children: /* @__PURE__ */ jsx9(
      Input,
      __spreadProps(__spreadValues({
        ref
      }, props), {
        disabled,
        className: props.className
      })
    ) });
  }
);
GroupInput.displayName = "Group.Input";
var GroupSelect = React9.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, isDisabled } = _b, props = __objRest(_b, ["className", "isDisabled"]);
    const context = useGroupContext();
    const disabled = isDisabled != null ? isDisabled : context.groupIsDisabled;
    return /* @__PURE__ */ jsx9("div", { className: Group_default.groupSelectWrapper, children: /* @__PURE__ */ jsx9(
      Select2,
      __spreadProps(__spreadValues({
        ref
      }, props), {
        isDisabled: disabled,
        className
      })
    ) });
  }
);
GroupSelect.displayName = "Group.Select";
var Group = Object.assign(GroupRoot, {
  Button: GroupButton,
  Input: GroupInput,
  Select: GroupSelect
});
export {
  Group
};
