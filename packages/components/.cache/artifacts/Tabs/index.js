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

// src/components/Tabs/Tabs.tsx
import * as React from "react";
import { useFocusRing } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Tabs/Tabs.module.css
var Tabs_default = {};

// src/components/Tabs/Tabs.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var TabsContext = React.createContext(null);
function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}
function Tabs({
  variant = "default",
  defaultValue,
  value,
  onValueChange,
  className,
  children
}) {
  const listRef = React.useRef(null);
  const [internalValue, setInternalValue] = React.useState(defaultValue != null ? defaultValue : "");
  const [tabIds] = React.useState(() => /* @__PURE__ */ new Map());
  const [panelIds] = React.useState(() => /* @__PURE__ */ new Map());
  const isControlled = value !== void 0;
  const selectedValue = isControlled ? value : internalValue;
  const setSelectedValue = React.useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange == null ? void 0 : onValueChange(newValue);
    },
    [isControlled, onValueChange]
  );
  const registerTab = React.useCallback(
    (tabValue) => {
      if (!tabIds.has(tabValue)) {
        const tabId = `tab-${tabValue}-${Math.random().toString(36).slice(2, 9)}`;
        const panelId = `panel-${tabValue}-${Math.random().toString(36).slice(2, 9)}`;
        tabIds.set(tabValue, tabId);
        panelIds.set(tabValue, panelId);
      }
    },
    [tabIds, panelIds]
  );
  return /* @__PURE__ */ jsx(
    TabsContext.Provider,
    {
      value: {
        selectedValue,
        setSelectedValue,
        variant,
        listRef,
        registerTab,
        tabIds,
        panelIds
      },
      children: /* @__PURE__ */ jsx("div", { className: cn(Tabs_default.tabs, className), "data-variant": variant, children })
    }
  );
}
function TabsList({ className, children, "aria-label": ariaLabel }) {
  const { variant, listRef } = useTabsContext();
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0, height: 0 });
  const updateIndicator = React.useCallback(() => {
    if (!listRef.current)
      return;
    const activeTrigger = listRef.current.querySelector(
      '[data-selected="true"]'
    );
    if (activeTrigger) {
      setIndicator({
        left: activeTrigger.offsetLeft,
        width: activeTrigger.offsetWidth,
        height: activeTrigger.offsetHeight
      });
    } else {
      setIndicator({ left: 0, width: 0, height: 0 });
    }
  }, [listRef]);
  React.useEffect(() => {
    updateIndicator();
    const observer = new MutationObserver(updateIndicator);
    const resizeObserver = new ResizeObserver(updateIndicator);
    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        attributeFilter: ["data-selected"],
        subtree: true
      });
      resizeObserver.observe(listRef.current);
    }
    window.addEventListener("resize", updateIndicator);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator, listRef]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "tablist",
      "aria-label": ariaLabel,
      ref: listRef,
      className: cn("tabs", variant, Tabs_default.tabsList, className),
      "data-variant": variant,
      children: [
        children,
        indicator.width > 0 && /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              Tabs_default.indicator,
              variant === "default" && Tabs_default.indicatorDefault,
              variant === "underline" && Tabs_default.indicatorUnderline
            ),
            style: {
              left: variant === "underline" ? 0 : indicator.left,
              width: indicator.width,
              height: variant === "default" ? indicator.height : void 0,
              transform: variant === "underline" ? `translateX(${indicator.left}px)` : void 0
            }
          }
        )
      ]
    }
  );
}
function TabsTrigger({
  value,
  icon,
  disabled,
  className,
  children
}) {
  const { selectedValue, setSelectedValue, registerTab, tabIds, panelIds } = useTabsContext();
  const triggerRef = React.useRef(null);
  React.useEffect(() => {
    registerTab(value);
  }, [value, registerTab]);
  const isSelected = selectedValue === value;
  const { focusProps, isFocusVisible } = useFocusRing();
  const handleClick = () => {
    if (!disabled) {
      setSelectedValue(value);
    }
  };
  const handleKeyDown = (e) => {
    var _a;
    const tabList = (_a = triggerRef.current) == null ? void 0 : _a.closest('[role="tablist"]');
    if (!tabList)
      return;
    const tabs = Array.from(
      tabList.querySelectorAll('[role="tab"]:not([disabled])')
    );
    const currentIndex = tabs.indexOf(triggerRef.current);
    let nextIndex = null;
    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }
  };
  return /* @__PURE__ */ jsxs(
    "button",
    __spreadProps(__spreadValues({}, focusProps), {
      ref: triggerRef,
      role: "tab",
      id: tabIds.get(value),
      "aria-selected": isSelected,
      "aria-controls": panelIds.get(value),
      tabIndex: isSelected ? 0 : -1,
      disabled,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      className: cn(Tabs_default.tabsTrigger, className),
      "data-selected": isSelected || void 0,
      "data-disabled": disabled || void 0,
      "data-focus-visible": isFocusVisible || void 0,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: Tabs_default.triggerIcon, children: icon }),
        /* @__PURE__ */ jsx("span", { children })
      ]
    })
  );
}
function TabsContent({ value, className, children }) {
  const { selectedValue, tabIds, panelIds, registerTab } = useTabsContext();
  const panelRef = React.useRef(null);
  const { focusProps, isFocusVisible } = useFocusRing();
  React.useEffect(() => {
    registerTab(value);
  }, [value, registerTab]);
  const isSelected = selectedValue === value;
  if (!isSelected) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    __spreadProps(__spreadValues({}, focusProps), {
      ref: panelRef,
      role: "tabpanel",
      id: panelIds.get(value),
      "aria-labelledby": tabIds.get(value),
      tabIndex: 0,
      className: cn(Tabs_default.tabsContent, className),
      "data-focus-visible": isFocusVisible || void 0,
      children
    })
  );
}
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
};
