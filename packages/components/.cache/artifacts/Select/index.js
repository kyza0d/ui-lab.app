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

// src/components/Select/Select.tsx
import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps, useFilter } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Select/Select.module.css
var Select_default = {};

// src/components/Select/Select.tsx
import { jsx } from "react/jsx-runtime";
var SelectContext = React.createContext(null);
function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select component must be used within Select root");
  }
  return context;
}
var Select = React.forwardRef(
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
    const triggerRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const hoverTimeoutRef = React.useRef(null);
    const handleHoverIntent = React.useCallback((isHovering) => {
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
    React.useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      };
    }, []);
    const [uncontrolledSelectedKey, setUncontrolledSelectedKey] = React.useState(
      defaultSelectedKey != null ? defaultSelectedKey : null
    );
    const [searchValue, setSearchValue] = React.useState("");
    const [focusedKey, setFocusedKey] = React.useState(null);
    const [selectedTextValue, setSelectedTextValue] = React.useState(defaultValue != null ? defaultValue : "");
    const selectedKey = controlledSelectedKey !== void 0 ? controlledSelectedKey : uncontrolledSelectedKey;
    const registeredItemsRef = React.useRef(/* @__PURE__ */ new Map());
    const [registeredItems, setRegisteredItems] = React.useState([]);
    const { contains } = useFilter({ sensitivity: "base" });
    const registerItem = React.useCallback((key, textValue, isDisabled2) => {
      registeredItemsRef.current.set(key, { key, textValue, isDisabled: isDisabled2 });
      setRegisteredItems(Array.from(registeredItemsRef.current.values()));
    }, []);
    const unregisterItem = React.useCallback((key) => {
      registeredItemsRef.current.delete(key);
      setRegisteredItems(Array.from(registeredItemsRef.current.values()));
    }, []);
    const items = propItems.length > 0 ? propItems : registeredItems;
    const filteredItems = React.useMemo(() => {
      if (!searchValue.trim())
        return items;
      return items.filter((item) => contains(item.textValue, searchValue));
    }, [items, searchValue, contains]);
    const visibleKeys = React.useMemo(() => {
      return new Set(filteredItems.map((item) => item.key));
    }, [filteredItems]);
    const enabledFilteredItems = React.useMemo(() => {
      return filteredItems.filter((item) => !item.isDisabled);
    }, [filteredItems]);
    const onSelect = React.useCallback((key) => {
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
    const navigateToNextItem = React.useCallback(() => {
      if (enabledFilteredItems.length === 0)
        return;
      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex((item) => item.key === focusedKey) : -1;
      const nextIndex = currentIndex < enabledFilteredItems.length - 1 ? currentIndex + 1 : 0;
      setFocusedKey(enabledFilteredItems[nextIndex].key);
    }, [enabledFilteredItems, focusedKey]);
    const navigateToPrevItem = React.useCallback(() => {
      if (enabledFilteredItems.length === 0)
        return;
      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex((item) => item.key === focusedKey) : 0;
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledFilteredItems.length - 1;
      setFocusedKey(enabledFilteredItems[prevIndex].key);
    }, [enabledFilteredItems, focusedKey]);
    const selectFocusedItem = React.useCallback(() => {
      if (focusedKey !== null) {
        const item = enabledFilteredItems.find((item2) => item2.key === focusedKey);
        if (item && !item.isDisabled) {
          onSelect(focusedKey);
        }
      }
    }, [focusedKey, enabledFilteredItems, onSelect]);
    React.useEffect(() => {
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
    React.useEffect(() => {
      if (focusedKey !== null && !visibleKeys.has(focusedKey)) {
        if (enabledFilteredItems.length > 0) {
          setFocusedKey(enabledFilteredItems[0].key);
        } else {
          setFocusedKey(null);
        }
      }
    }, [visibleKeys, enabledFilteredItems, focusedKey]);
    const { buttonProps, isPressed } = useButton({
      isDisabled,
      onPress: () => !isDisabled && setIsOpen((prev) => !prev)
    }, triggerRef);
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled });
    const triggerProps = mergeProps(buttonProps, focusProps, hoverProps, {
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen
    });
    React.useEffect(() => {
      if (autoFocus && triggerRef.current) {
        triggerRef.current.focus({ preventScroll: true });
      }
    }, [autoFocus]);
    React.useEffect(() => {
      if (!isOpen) {
        setSearchValue("");
      }
    }, [isOpen]);
    React.useEffect(() => {
      if (selectedKey === null) {
        setSelectedTextValue("");
      } else {
        const selectedItem = items.find((item) => item.key === selectedKey);
        if (selectedItem) {
          setSelectedTextValue(selectedItem.textValue);
        }
      }
    }, [selectedKey, items]);
    return /* @__PURE__ */ jsx(
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
        children: /* @__PURE__ */ jsx("div", { ref, className: cn(Select_default.select, className), children })
      }
    );
  }
);
Select.displayName = "Select";
var SelectListBox = React.forwardRef(
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
    const listBoxRef = React.useRef(null);
    const mergedRef = React.useCallback(
      (el) => {
        listBoxRef.current = el;
        if (typeof forwardedRef === "function")
          forwardedRef(el);
        else if (forwardedRef)
          forwardedRef.current = el;
      },
      [forwardedRef]
    );
    const handleKeyDown = React.useCallback((e) => {
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
    React.useEffect(() => {
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
    return /* @__PURE__ */ jsx(
      "ul",
      {
        ref: mergedRef,
        role: "listbox",
        tabIndex: isOpen ? 0 : -1,
        className,
        onKeyDown: handleKeyDown,
        style: { outline: "none" },
        children: React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { _focusedKey: focusedKey });
          }
          return child;
        })
      }
    );
  }
);
SelectListBox.displayName = "SelectListBox";

// src/components/Select/Select.Trigger.tsx
import * as React2 from "react";
import { FaChevronDown } from "react-icons/fa6";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var SelectTrigger = React2.forwardRef(
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
    const mergedRef = React2.useCallback(
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
    return /* @__PURE__ */ jsxs(
      "button",
      __spreadProps(__spreadValues(__spreadValues({
        ref: mergedRef,
        className: cn("trigger", Select_default.trigger, className),
        "data-focus-visible": isFocusVisible || void 0,
        "data-pressed": isPressed || void 0,
        "data-hovered": isHovered || void 0
      }, triggerProps), hoverHandlers), {
        children: [
          /* @__PURE__ */ jsx2("span", { children }),
          chevron !== void 0 ? /* @__PURE__ */ jsx2("div", { className: Select_default.icon, children: chevron }) : /* @__PURE__ */ jsx2(FaChevronDown, { className: Select_default.icon })
        ]
      })
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";
var SearchableTrigger = React2.forwardRef(
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
    const inputRef = React2.useRef(null);
    const [isSearchActive, setIsSearchActive] = React2.useState(false);
    const mergedRef = React2.useCallback(
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
    React2.useEffect(() => {
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
    return /* @__PURE__ */ jsx2(
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
import * as React3 from "react";
import * as ReactDOM from "react-dom";
import { useFloating, flip, shift, offset, size, autoUpdate } from "@floating-ui/react-dom";
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var SelectContent = React3.forwardRef(
  ({ children, className }, ref) => {
    const { isOpen, setIsOpen, triggerRef, maxItems, triggerMode, handleHoverIntent } = useSelectContext();
    const [portalContainer, setPortalContainer] = React3.useState(null);
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
    React3.useLayoutEffect(() => {
      refs.setReference(triggerRef.current);
    }, [refs, triggerRef]);
    React3.useEffect(() => {
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
    const mergedRef = React3.useCallback(
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
      /* @__PURE__ */ jsxs2(Fragment, { children: [
        showContent && triggerMode !== "hover" && /* @__PURE__ */ jsx3(
          "div",
          {
            style: { position: "fixed", inset: 0, zIndex: 49999 },
            onClick: () => setIsOpen(false)
          }
        ),
        isOpen && /* @__PURE__ */ jsx3(
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
            children: /* @__PURE__ */ jsx3("div", { className: Select_default.viewport, style: { maxHeight: `calc(${maxItems} * 36px + 8px)` }, children })
          })
        )
      ] }),
      portalContainer
    );
  }
);
SelectContent.displayName = "SelectContent";
var SearchableContent = React3.forwardRef(
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
    const inputRef = React3.useRef(null);
    const [portalContainer, setPortalContainer] = React3.useState(null);
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
    React3.useLayoutEffect(() => {
      refs.setReference(triggerRef.current);
    }, [refs, triggerRef]);
    React3.useEffect(() => {
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
    React3.useEffect(() => {
      if (isOpen && inputRef.current) {
        requestAnimationFrame(() => {
          var _a;
          (_a = inputRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
        });
      }
    }, [isOpen]);
    const mergedRef = React3.useCallback(
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
      /* @__PURE__ */ jsxs2(Fragment, { children: [
        showContent && triggerMode !== "hover" && /* @__PURE__ */ jsx3(
          "div",
          {
            style: { position: "fixed", inset: 0, zIndex: 49999 },
            onClick: () => setIsOpen(false)
          }
        ),
        isOpen && /* @__PURE__ */ jsxs2(
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
              /* @__PURE__ */ jsx3("div", { className: "px-2 py-2", children: /* @__PURE__ */ jsx3(
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
              /* @__PURE__ */ jsx3("div", { className: Select_default.viewport, style: { maxHeight: `calc(${maxItems} * 36px + 8px)` }, children })
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
import * as React4 from "react";
import { FaCheck } from "react-icons/fa6";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var SelectGroup = React4.forwardRef(
  ({ children, title, className }, ref) => /* @__PURE__ */ jsxs3("div", { ref, className, children: [
    title && /* @__PURE__ */ jsx4("div", { className: "px-2 py-1 text-xs font-medium text-foreground-400", children: title }),
    children
  ] })
);
SelectGroup.displayName = "SelectGroup";
var SelectValue = React4.forwardRef(
  ({ placeholder = "Select an option", className, icon }, ref) => {
    const { selectedTextValue } = useSelectContext();
    return /* @__PURE__ */ jsxs3("span", { ref, className: cn(Select_default.value, className), children: [
      icon && /* @__PURE__ */ jsx4("span", { className: Select_default.valueIcon, children: icon }),
      /* @__PURE__ */ jsx4("span", { className: Select_default.valueText, children: selectedTextValue || placeholder })
    ] });
  }
);
SelectValue.displayName = "SelectValue";
var SelectItem = React4.forwardRef(
  ({ children, isDisabled = false, className, textValue, value, icon, _focusedKey }, forwardedRef) => {
    const { selectedKey, onSelect, registerItem, unregisterItem, visibleKeys, isOpen, setFocusedKey } = useSelectContext();
    const itemRef = React4.useRef(null);
    const [isHovered, setIsHovered] = React4.useState(false);
    const finalTextValue = typeof textValue === "string" ? textValue : String(children);
    const isSelected = selectedKey === value;
    const isFocused = isOpen && _focusedKey === value;
    const isVisible = visibleKeys.has(value);
    React4.useEffect(() => {
      registerItem(value, finalTextValue, isDisabled);
      return () => unregisterItem(value);
    }, [value, finalTextValue, isDisabled, registerItem, unregisterItem]);
    React4.useEffect(() => {
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
    const mergedRef = React4.useCallback(
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
    return /* @__PURE__ */ jsxs3(
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
          icon && /* @__PURE__ */ jsx4("div", { className: Select_default.itemIcon, children: icon }),
          /* @__PURE__ */ jsx4("div", { className: Select_default.itemText, children }),
          /* @__PURE__ */ jsx4("div", { className: Select_default.itemIndicator, children: isSelected && /* @__PURE__ */ jsx4(FaCheck, { className: "w-3 h-3" }) })
        ]
      }
    );
  }
);
SelectItem.displayName = "SelectItem";

// src/components/Select/Select.Decorative.tsx
import * as React5 from "react";
import { FaChevronDown as FaChevronDown2 } from "react-icons/fa6";
import { jsx as jsx5 } from "react/jsx-runtime";
var SelectSeparator = React5.forwardRef(
  ({ className }, ref) => /* @__PURE__ */ jsx5("div", { ref, className: cn(Select_default.separator, className), role: "separator" })
);
SelectSeparator.displayName = "SelectSeparator";
var SelectScrollUpButton = React5.forwardRef(
  ({ children }, ref) => /* @__PURE__ */ jsx5("button", { ref, className: Select_default.scrollButton, type: "button", children: children || /* @__PURE__ */ jsx5(FaChevronDown2, { className: "w-2.5 h-2.5" }) })
);
SelectScrollUpButton.displayName = "SelectScrollUpButton";
var SelectScrollDownButton = React5.forwardRef(
  ({ children }, ref) => /* @__PURE__ */ jsx5("button", { ref, className: Select_default.scrollButton, type: "button", children: children || /* @__PURE__ */ jsx5(FaChevronDown2, { className: "w-2.5 h-2.5" }) })
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
export {
  Searchable,
  Select2 as Select,
  SelectContext,
  SelectListBox,
  useSelectContext
};
