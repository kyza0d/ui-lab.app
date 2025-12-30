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

// src/components/Menu/Menu.tsx
import * as React from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var MenuContext = React.createContext(null);
function useMenuContext() {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error("Menu component must be used within Menu root");
  }
  return context;
}
var MenuSubmenuContext = React.createContext(null);
function useMenuSubmenuContext() {
  return React.useContext(MenuSubmenuContext);
}
var RadioGroupContext = React.createContext(null);
function useRadioGroupContext() {
  return React.useContext(RadioGroupContext);
}
var MenuPortal = ({ children }) => {
  return /* @__PURE__ */ jsx(Fragment, { children });
};
MenuPortal.displayName = "MenuPortal";
var Menu = ({
  children,
  selectionMode = "none",
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys,
  onSelectionChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState(
    defaultSelectedKeys != null ? defaultSelectedKeys : /* @__PURE__ */ new Set()
  );
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const [radioGroups, setRadioGroups] = React.useState(/* @__PURE__ */ new Map());
  const selectedKeys = controlledSelectedKeys !== void 0 ? controlledSelectedKeys : uncontrolledSelectedKeys;
  const registeredItemsRef = React.useRef(/* @__PURE__ */ new Map());
  const [registeredItems, setRegisteredItems] = React.useState([]);
  const registerItem = React.useCallback((key, textValue, isDisabled, onSelect, isSubmenuTrigger) => {
    registeredItemsRef.current.set(key, { key, textValue, isDisabled, onSelect, isSubmenuTrigger });
    setRegisteredItems(Array.from(registeredItemsRef.current.values()));
  }, []);
  const unregisterItem = React.useCallback((key) => {
    registeredItemsRef.current.delete(key);
    setRegisteredItems(Array.from(registeredItemsRef.current.values()));
  }, []);
  const handleSelectionChange = React.useCallback((keys) => {
    if (controlledSelectedKeys === void 0) {
      setUncontrolledSelectedKeys(keys);
    }
    onSelectionChange == null ? void 0 : onSelectionChange(keys);
  }, [controlledSelectedKeys, onSelectionChange]);
  const toggleSelection = React.useCallback((key) => {
    const newKeys = new Set(selectedKeys);
    if (selectionMode === "single") {
      newKeys.clear();
      newKeys.add(key);
    } else if (selectionMode === "multiple") {
      if (newKeys.has(key)) {
        newKeys.delete(key);
      } else {
        newKeys.add(key);
      }
    }
    handleSelectionChange(newKeys);
  }, [selectedKeys, selectionMode, handleSelectionChange]);
  const close = React.useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(0);
  }, []);
  const setRadioGroupValue = React.useCallback((groupName, value) => {
    setRadioGroups((prev) => {
      const next = new Map(prev);
      next.set(groupName, value);
      return next;
    });
  }, []);
  const getRadioGroupValue = React.useCallback((groupName) => {
    var _a;
    return (_a = radioGroups.get(groupName)) != null ? _a : null;
  }, [radioGroups]);
  const triggerRef = React.useRef(null);
  const contextValue = React.useMemo(() => ({
    isOpen,
    setIsOpen,
    position,
    setPosition,
    close,
    selectionMode,
    selectedKeys,
    onSelectionChange: handleSelectionChange,
    toggleSelection,
    highlightedIndex,
    setHighlightedIndex,
    items: registeredItems,
    registerItem,
    unregisterItem,
    radioGroups,
    setRadioGroupValue,
    getRadioGroupValue,
    triggerRef
  }), [
    isOpen,
    setIsOpen,
    position,
    setPosition,
    close,
    selectionMode,
    selectedKeys,
    handleSelectionChange,
    toggleSelection,
    highlightedIndex,
    setHighlightedIndex,
    registeredItems,
    registerItem,
    unregisterItem,
    radioGroups,
    setRadioGroupValue,
    getRadioGroupValue
  ]);
  return /* @__PURE__ */ jsx(MenuContext.Provider, { value: contextValue, children });
};
Menu.displayName = "Menu";

// src/components/Menu/Menu.Content.tsx
import * as React2 from "react";
import * as ReactDOM from "react-dom";
import { useInteractOutside } from "react-aria";

// src/components/Menu/Menu.module.css
var Menu_default = {};

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Menu/Menu.Content.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var MenuTrigger = React2.forwardRef(
  ({ children, disabled = false, className }, ref) => {
    const { setIsOpen, setPosition, triggerRef: contextTriggerRef } = useMenuContext();
    const triggerRef = React2.useRef(null);
    const handleMenu = React2.useCallback((e) => {
      if (disabled)
        return;
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
    }, [disabled, setIsOpen, setPosition]);
    const mergedRef = React2.useCallback(
      (el) => {
        triggerRef.current = el;
        contextTriggerRef.current = el;
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref, contextTriggerRef]
    );
    return /* @__PURE__ */ jsx2(
      "div",
      {
        ref: mergedRef,
        onContextMenu: handleMenu,
        className,
        children
      }
    );
  }
);
MenuTrigger.displayName = "MenuTrigger";
var MenuContent = React2.forwardRef(
  ({ children, className, onEscapeKeyDown, onPointerDownOutside, sideOffset = 0 }, ref) => {
    const { isOpen, position, close, items, highlightedIndex, setHighlightedIndex, triggerRef } = useMenuContext();
    const contentRef = React2.useRef(null);
    const itemsRef = React2.useRef(items);
    const highlightedIndexRef = React2.useRef(highlightedIndex);
    const [portalContainer, setPortalContainer] = React2.useState(null);
    const [portalStyle, setPortalStyle] = React2.useState({});
    useInteractOutside({
      ref: contentRef,
      isDisabled: !isOpen,
      onInteractOutside: (e) => {
        var _a;
        if ((_a = triggerRef.current) == null ? void 0 : _a.contains(e.target)) {
          return;
        }
        onPointerDownOutside == null ? void 0 : onPointerDownOutside(e);
        close();
      }
    });
    React2.useEffect(() => {
      itemsRef.current = items;
      highlightedIndexRef.current = highlightedIndex;
    }, [items, highlightedIndex]);
    React2.useEffect(() => {
      if (typeof document === "undefined")
        return;
      const container = document.createElement("div");
      container.setAttribute("data-menu-portal", "");
      container.style.cssText = "position: absolute; top: 0; left: 0; z-index: 50;";
      document.body.appendChild(container);
      setPortalContainer(container);
      return () => {
        document.body.removeChild(container);
      };
    }, []);
    React2.useEffect(() => {
      if (isOpen) {
        if (position.x === 0 && position.y === 0 && triggerRef.current) {
          const triggerRect = triggerRef.current.getBoundingClientRect();
          const top = triggerRect.bottom + window.scrollY + sideOffset;
          const left = triggerRect.left + window.scrollX;
          setPortalStyle({ position: "absolute", top, left });
        } else {
          const top = position.y + window.scrollY + sideOffset;
          const left = position.x + window.scrollX;
          setPortalStyle({ position: "absolute", top, left });
        }
      }
    }, [isOpen, position, sideOffset, triggerRef]);
    React2.useEffect(() => {
      if (!isOpen)
        return;
      const handleKeyDown = (e) => {
        const items2 = itemsRef.current;
        const highlightedIndex2 = highlightedIndexRef.current;
        const activeElement = document.activeElement;
        const isInSubmenu = (activeElement == null ? void 0 : activeElement.closest("[data-menu-sub-portal]")) !== null;
        if ((e.key === "ArrowDown" || e.key === "ArrowUp") && isInSubmenu) {
          return;
        }
        switch (e.key) {
          case "Escape":
            e.preventDefault();
            onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
            close();
            break;
          case "ArrowDown": {
            e.preventDefault();
            const enabledIndices = items2.map((item, i) => item.isDisabled ? -1 : i).filter((i) => i >= 0);
            const currentIdx = enabledIndices.indexOf(highlightedIndex2);
            if (currentIdx < enabledIndices.length - 1) {
              setHighlightedIndex(enabledIndices[currentIdx + 1]);
            } else if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[0]);
            }
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            const enabledIndices = items2.map((item, i) => item.isDisabled ? -1 : i).filter((i) => i >= 0);
            const currentIdx = enabledIndices.indexOf(highlightedIndex2);
            if (currentIdx > 0) {
              setHighlightedIndex(enabledIndices[currentIdx - 1]);
            } else if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[enabledIndices.length - 1]);
            }
            break;
          }
          case "ArrowRight": {
            e.preventDefault();
            const item = items2[highlightedIndex2];
            if (item && !item.isDisabled && item.isSubmenuTrigger && item.onSelect) {
              item.onSelect();
            }
            break;
          }
          case "Enter":
          case " ": {
            e.preventDefault();
            const item = items2[highlightedIndex2];
            if (item && !item.isDisabled) {
              if (item.isSubmenuTrigger && item.onSelect) {
                item.onSelect();
              } else if (item.onSelect) {
                item.onSelect();
              }
            }
            break;
          }
          case "Home": {
            e.preventDefault();
            const enabledIndices = items2.map((item, i) => item.isDisabled ? -1 : i).filter((i) => i >= 0);
            if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[0]);
            }
            break;
          }
          case "End": {
            e.preventDefault();
            const enabledIndices = items2.map((item, i) => item.isDisabled ? -1 : i).filter((i) => i >= 0);
            if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[enabledIndices.length - 1]);
            }
            break;
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, close, onEscapeKeyDown, setHighlightedIndex]);
    React2.useEffect(() => {
      if (isOpen && contentRef.current) {
        contentRef.current.focus({ preventScroll: true });
      }
    }, [isOpen]);
    const mergedRef = React2.useCallback(
      (el) => {
        contentRef.current = el;
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref]
    );
    if (!portalContainer)
      return null;
    return ReactDOM.createPortal(
      /* @__PURE__ */ jsx2(
        "div",
        {
          ref: mergedRef,
          role: "menu",
          tabIndex: isOpen ? 0 : -1,
          className: cn(Menu_default.content, className),
          "data-state": isOpen ? "open" : "closed",
          style: isOpen ? portalStyle : { position: "absolute", visibility: "hidden", pointerEvents: "none" },
          children: /* @__PURE__ */ jsx2("div", { className: Menu_default.viewport, children: React2.Children.map(children, (child, index) => {
            if (React2.isValidElement(child)) {
              return React2.cloneElement(child, {
                _index: index,
                _isHighlighted: isOpen && index === highlightedIndex
              });
            }
            return child;
          }) })
        }
      ),
      portalContainer
    );
  }
);
MenuContent.displayName = "MenuContent";

// src/components/Menu/Menu.Items.tsx
import * as React3 from "react";
import { useFocusRing } from "react-aria";
import { Check, Circle } from "lucide-react";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var MenuItem = React3.forwardRef(
  ({ children, disabled = false, onSelect, textValue, inset, className, _index = 0, _isHighlighted, _isInSubmenu }, ref) => {
    var _a;
    const parentContext = useMenuContext();
    const submenuContext = useMenuSubmenuContext();
    const isInSubmenu = _isInSubmenu || ((_a = submenuContext == null ? void 0 : submenuContext.isOpen) != null ? _a : false);
    const { registerItem, unregisterItem, setHighlightedIndex } = isInSubmenu && submenuContext ? submenuContext : parentContext;
    const itemRef = React3.useRef(null);
    const [isHovered, setIsHovered] = React3.useState(false);
    const { focusProps, isFocusVisible } = useFocusRing();
    const key = React3.useMemo(() => {
      var _a2;
      return (_a2 = textValue != null ? textValue : String(children)) != null ? _a2 : `item-${_index}`;
    }, [textValue, children, _index]);
    const finalTextValue = textValue != null ? textValue : String(children);
    const close = parentContext.close;
    const handleSelect = React3.useCallback(() => {
      if (disabled)
        return;
      onSelect == null ? void 0 : onSelect();
      close();
    }, [disabled, onSelect, close]);
    React3.useEffect(() => {
      registerItem(key, finalTextValue, disabled, handleSelect);
      return () => unregisterItem(key);
    }, [key, finalTextValue, disabled, handleSelect]);
    const mergedRef = React3.useCallback(
      (el) => {
        itemRef.current = el;
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref]
    );
    return /* @__PURE__ */ jsx3(
      "div",
      __spreadProps(__spreadValues({
        ref: mergedRef,
        role: "menuitem",
        tabIndex: disabled ? -1 : 0,
        "aria-disabled": disabled || void 0,
        className: cn(Menu_default.item, className),
        "data-highlighted": _isHighlighted || isHovered || void 0,
        "data-disabled": disabled || void 0,
        "data-inset": inset || void 0,
        "data-focus-visible": isFocusVisible || void 0,
        onMouseEnter: () => {
          setIsHovered(true);
          setHighlightedIndex(_index);
        },
        onMouseLeave: () => setIsHovered(false),
        onClick: handleSelect
      }, focusProps), {
        children
      })
    );
  }
);
MenuItem.displayName = "MenuItem";
var MenuCheckboxItem = React3.forwardRef(
  ({ children, checked = false, onCheckedChange, disabled = false, onSelect, textValue, className, _index = 0, _isHighlighted, _isInSubmenu }, ref) => {
    var _a;
    const parentContext = useMenuContext();
    const submenuContext = useMenuSubmenuContext();
    const isInSubmenu = _isInSubmenu || ((_a = submenuContext == null ? void 0 : submenuContext.isOpen) != null ? _a : false);
    const { registerItem, unregisterItem, setHighlightedIndex } = isInSubmenu && submenuContext ? submenuContext : parentContext;
    const itemRef = React3.useRef(null);
    const [isHovered, setIsHovered] = React3.useState(false);
    const { focusProps, isFocusVisible } = useFocusRing();
    const key = React3.useMemo(() => {
      var _a2;
      return (_a2 = textValue != null ? textValue : String(children)) != null ? _a2 : `checkbox-${_index}`;
    }, [textValue, children, _index]);
    const finalTextValue = textValue != null ? textValue : String(children);
    const close = parentContext.close;
    const handleSelect = React3.useCallback(() => {
      if (disabled)
        return;
      onCheckedChange == null ? void 0 : onCheckedChange(!checked);
      onSelect == null ? void 0 : onSelect();
      close();
    }, [disabled, checked, onCheckedChange, onSelect, close]);
    React3.useEffect(() => {
      registerItem(key, finalTextValue, disabled, handleSelect);
      return () => unregisterItem(key);
    }, [key, finalTextValue, disabled, handleSelect]);
    const mergedRef = React3.useCallback(
      (el) => {
        itemRef.current = el;
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref]
    );
    return /* @__PURE__ */ jsxs(
      "div",
      __spreadProps(__spreadValues({
        ref: mergedRef,
        role: "menuitemcheckbox",
        tabIndex: disabled ? -1 : 0,
        "aria-checked": checked,
        "aria-disabled": disabled || void 0,
        className: cn(Menu_default.checkboxItem, className),
        "data-highlighted": _isHighlighted || isHovered || void 0,
        "data-disabled": disabled || void 0,
        "data-state": checked ? "checked" : "unchecked",
        "data-focus-visible": isFocusVisible || void 0,
        onMouseEnter: () => {
          setIsHovered(true);
          setHighlightedIndex(_index);
        },
        onMouseLeave: () => setIsHovered(false),
        onClick: handleSelect
      }, focusProps), {
        children: [
          /* @__PURE__ */ jsx3("span", { className: Menu_default.itemIndicator, children: checked && /* @__PURE__ */ jsx3(Check, { className: "h-3 w-3" }) }),
          children
        ]
      })
    );
  }
);
MenuCheckboxItem.displayName = "MenuCheckboxItem";
var MenuRadioItem = React3.forwardRef(
  ({ children, value, disabled = false, onSelect, textValue, className, _index = 0, _isHighlighted, _isInSubmenu }, ref) => {
    var _a;
    const parentContext = useMenuContext();
    const submenuContext = useMenuSubmenuContext();
    const isInSubmenu = _isInSubmenu || ((_a = submenuContext == null ? void 0 : submenuContext.isOpen) != null ? _a : false);
    const { registerItem, unregisterItem, setHighlightedIndex } = isInSubmenu && submenuContext ? submenuContext : parentContext;
    const radioGroupContext = useRadioGroupContext();
    const itemRef = React3.useRef(null);
    const [isHovered, setIsHovered] = React3.useState(false);
    const { focusProps, isFocusVisible } = useFocusRing();
    const isSelected = (radioGroupContext == null ? void 0 : radioGroupContext.value) === value;
    const key = React3.useMemo(() => {
      var _a2;
      return (_a2 = textValue != null ? textValue : String(children)) != null ? _a2 : `radio-${_index}`;
    }, [textValue, children, _index]);
    const finalTextValue = textValue != null ? textValue : String(children);
    const close = parentContext.close;
    const handleSelect = React3.useCallback(() => {
      if (disabled)
        return;
      radioGroupContext == null ? void 0 : radioGroupContext.onValueChange(value);
      onSelect == null ? void 0 : onSelect();
      close();
    }, [disabled, radioGroupContext, value, onSelect, close]);
    React3.useEffect(() => {
      registerItem(key, finalTextValue, disabled, handleSelect);
      return () => unregisterItem(key);
    }, [key, finalTextValue, disabled, handleSelect]);
    const mergedRef = React3.useCallback(
      (el) => {
        itemRef.current = el;
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref]
    );
    return /* @__PURE__ */ jsxs(
      "div",
      __spreadProps(__spreadValues({
        ref: mergedRef,
        role: "menuitemradio",
        tabIndex: disabled ? -1 : 0,
        "aria-checked": isSelected,
        "aria-disabled": disabled || void 0,
        className: cn(Menu_default.radioItem, className),
        "data-highlighted": _isHighlighted || isHovered || void 0,
        "data-disabled": disabled || void 0,
        "data-state": isSelected ? "checked" : "unchecked",
        "data-focus-visible": isFocusVisible || void 0,
        onMouseEnter: () => {
          setIsHovered(true);
          setHighlightedIndex(_index);
        },
        onMouseLeave: () => setIsHovered(false),
        onClick: handleSelect
      }, focusProps), {
        children: [
          /* @__PURE__ */ jsx3("span", { className: Menu_default.itemIndicator, children: isSelected && /* @__PURE__ */ jsx3(Circle, { className: "h-2 w-2 fill-current" }) }),
          children
        ]
      })
    );
  }
);
MenuRadioItem.displayName = "MenuRadioItem";

// src/components/Menu/Menu.Decorative.tsx
import * as React4 from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var MenuGroup = React4.forwardRef((_a, ref) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx4("div", __spreadProps(__spreadValues({ ref, role: "group" }, props), { children }));
});
MenuGroup.displayName = "MenuGroup";
var MenuRadioGroup = React4.forwardRef(
  ({ children, value, onValueChange }, ref) => {
    const groupName = React4.useId();
    const { setRadioGroupValue, getRadioGroupValue } = useMenuContext();
    const currentValue = value !== void 0 ? value : getRadioGroupValue(groupName);
    const handleValueChange = React4.useCallback((newValue) => {
      setRadioGroupValue(groupName, newValue);
      onValueChange == null ? void 0 : onValueChange(String(newValue));
    }, [groupName, setRadioGroupValue, onValueChange]);
    return /* @__PURE__ */ jsx4(RadioGroupContext.Provider, { value: { name: groupName, value: currentValue, onValueChange: handleValueChange }, children: /* @__PURE__ */ jsx4("div", { ref, role: "group", children }) });
  }
);
MenuRadioGroup.displayName = "MenuRadioGroup";
var MenuLabel = React4.forwardRef(
  ({ children, inset, className }, ref) => /* @__PURE__ */ jsx4(
    "div",
    {
      ref,
      className: cn(Menu_default.label, className),
      "data-inset": inset || void 0,
      children
    }
  )
);
MenuLabel.displayName = "MenuLabel";
var MenuSeparator = React4.forwardRef(
  ({ className }, ref) => /* @__PURE__ */ jsx4(
    "div",
    {
      ref,
      role: "separator",
      className: cn(Menu_default.separator, className)
    }
  )
);
MenuSeparator.displayName = "MenuSeparator";
var MenuShortcut = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx4("span", __spreadValues({ className: cn(Menu_default.shortcut, className) }, props));
};
MenuShortcut.displayName = "MenuShortcut";

// src/components/Menu/Menu.Submenu.tsx
import * as React5 from "react";
import * as ReactDOM2 from "react-dom";
import { useFocusRing as useFocusRing2, useHover } from "react-aria";
import { ChevronRight } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var MenuSub = ({ children, open: controlledOpen, defaultOpen = false, onOpenChange }) => {
  var _a;
  const [uncontrolledOpen, setUncontrolledOpen] = React5.useState(defaultOpen);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : uncontrolledOpen;
  const [highlightedIndex, setHighlightedIndex] = React5.useState(0);
  const registeredItemsRef = React5.useRef(/* @__PURE__ */ new Map());
  const [registeredItems, setRegisteredItems] = React5.useState([]);
  const registerItem = React5.useCallback((key, textValue, isDisabled, onSelect) => {
    registeredItemsRef.current.set(key, { key, textValue, isDisabled, onSelect });
    setRegisteredItems(Array.from(registeredItemsRef.current.values()));
  }, []);
  const unregisterItem = React5.useCallback((key) => {
    registeredItemsRef.current.delete(key);
    setRegisteredItems(Array.from(registeredItemsRef.current.values()));
  }, []);
  const setIsOpen = React5.useCallback((open) => {
    const newValue = typeof open === "function" ? open(isOpen) : open;
    if (controlledOpen === void 0) {
      setUncontrolledOpen(newValue);
    }
    onOpenChange == null ? void 0 : onOpenChange(newValue);
    if (!newValue) {
      setHighlightedIndex(0);
    }
  }, [controlledOpen, isOpen, onOpenChange]);
  const triggerRef = React5.useRef(null);
  const parentMenuRef = React5.useRef(null);
  const contentRef = React5.useRef(null);
  const closeTimeoutRef = React5.useRef(null);
  const submenuContext = useMenuSubmenuContext();
  const submenuLevel = ((_a = submenuContext == null ? void 0 : submenuContext.submenuLevel) != null ? _a : 0) + 1;
  const contextValue = React5.useMemo(() => ({
    isOpen,
    setIsOpen,
    triggerRef,
    parentMenuRef,
    submenuLevel,
    items: registeredItems,
    highlightedIndex,
    setHighlightedIndex,
    registerItem,
    unregisterItem,
    contentRef,
    closeTimeoutRef
  }), [isOpen, setIsOpen, submenuLevel, registeredItems, highlightedIndex, registerItem, unregisterItem]);
  return /* @__PURE__ */ jsx5(MenuSubmenuContext.Provider, { value: contextValue, children });
};
MenuSub.displayName = "MenuSub";
var MenuSubTrigger = React5.forwardRef(
  ({ children, disabled = false, inset, textValue, className, _index = 0, _isHighlighted }, ref) => {
    const parentContext = useMenuContext();
    const { registerItem, unregisterItem, setHighlightedIndex } = parentContext;
    const submenuContext = useMenuSubmenuContext();
    const triggerRef = React5.useRef(null);
    const { focusProps, isFocusVisible } = useFocusRing2();
    const hoverTimeoutRef = React5.useRef(null);
    const key = React5.useMemo(() => {
      var _a;
      return (_a = textValue != null ? textValue : String(children)) != null ? _a : `subtrigger-${_index}`;
    }, [textValue, children, _index]);
    const finalTextValue = textValue != null ? textValue : String(children);
    const setSubmenuOpen = submenuContext == null ? void 0 : submenuContext.setIsOpen;
    const triggerIndex = React5.useMemo(() => {
      return parentContext.items.findIndex((item) => item.key === key);
    }, [parentContext.items, key]);
    const isHighlightedByParent = parentContext.highlightedIndex === triggerIndex && triggerIndex >= 0;
    const handleSelect = React5.useCallback(() => {
      if (disabled)
        return;
      setSubmenuOpen == null ? void 0 : setSubmenuOpen(true);
    }, [disabled, setSubmenuOpen]);
    React5.useEffect(() => {
      registerItem(key, finalTextValue, disabled, handleSelect, true);
      return () => unregisterItem(key);
    }, [key, finalTextValue, disabled, handleSelect, registerItem, unregisterItem]);
    const { hoverProps, isHovered } = useHover({
      isDisabled: disabled,
      onHoverStart: () => {
        if (triggerIndex >= 0) {
          setHighlightedIndex(triggerIndex);
        }
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        hoverTimeoutRef.current = setTimeout(() => {
          setSubmenuOpen == null ? void 0 : setSubmenuOpen(true);
        }, 200);
      },
      onHoverEnd: () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
      }
    });
    React5.useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      };
    }, []);
    const mergedRef = React5.useCallback(
      (el) => {
        triggerRef.current = el;
        if (submenuContext) {
          submenuContext.triggerRef.current = el;
        }
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref, submenuContext]
    );
    return /* @__PURE__ */ jsxs2(
      "div",
      __spreadProps(__spreadValues(__spreadValues({
        ref: mergedRef,
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": submenuContext == null ? void 0 : submenuContext.isOpen,
        tabIndex: disabled ? -1 : 0,
        "aria-disabled": disabled || void 0,
        className: cn(Menu_default.subTrigger, className),
        "data-highlighted": isHighlightedByParent || isHovered || void 0,
        "data-disabled": disabled || void 0,
        "data-inset": inset || void 0,
        "data-state": (submenuContext == null ? void 0 : submenuContext.isOpen) ? "open" : "closed",
        "data-focus-visible": isFocusVisible || void 0,
        onClick: handleSelect
      }, hoverProps), focusProps), {
        children: [
          children,
          /* @__PURE__ */ jsx5(ChevronRight, { className: Menu_default.subTriggerChevron })
        ]
      })
    );
  }
);
MenuSubTrigger.displayName = "MenuSubTrigger";
var MenuSubContent = React5.forwardRef(
  ({ children, className, sideOffset = 2, alignOffset = -4 }, ref) => {
    const submenuContext = useMenuSubmenuContext();
    const parentContext = useMenuContext();
    const contentRef = React5.useRef(null);
    const itemsRef = React5.useRef([]);
    const highlightedIndexRef = React5.useRef(0);
    const [portalContainer, setPortalContainer] = React5.useState(null);
    const [portalStyle, setPortalStyle] = React5.useState({});
    const closeTimeoutRef = React5.useRef(null);
    const { hoverProps } = useHover({
      onHoverStart: () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }
    });
    React5.useEffect(() => {
      if (!parentContext.isOpen && (submenuContext == null ? void 0 : submenuContext.isOpen)) {
        submenuContext.setIsOpen(false);
      }
    }, [parentContext.isOpen, submenuContext]);
    React5.useEffect(() => {
      if (submenuContext) {
        itemsRef.current = submenuContext.items;
        highlightedIndexRef.current = submenuContext.highlightedIndex;
      }
    }, [submenuContext == null ? void 0 : submenuContext.items, submenuContext == null ? void 0 : submenuContext.highlightedIndex]);
    React5.useEffect(() => {
      if (typeof document === "undefined")
        return;
      const container = document.createElement("div");
      container.setAttribute("data-menu-sub-portal", "");
      container.style.cssText = "position: absolute; top: 0; left: 0; z-index: 51;";
      document.body.appendChild(container);
      setPortalContainer(container);
      return () => {
        document.body.removeChild(container);
      };
    }, []);
    React5.useEffect(() => {
      if ((submenuContext == null ? void 0 : submenuContext.isOpen) && submenuContext.triggerRef.current) {
        const triggerRect = submenuContext.triggerRef.current.getBoundingClientRect();
        const top = triggerRect.top + window.scrollY + alignOffset;
        const left = triggerRect.right + window.scrollX + sideOffset;
        setPortalStyle({ position: "absolute", top, left });
      }
    }, [submenuContext == null ? void 0 : submenuContext.isOpen, submenuContext == null ? void 0 : submenuContext.triggerRef, sideOffset, alignOffset]);
    React5.useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }, []);
    React5.useEffect(() => {
      if (!(submenuContext == null ? void 0 : submenuContext.isOpen))
        return;
      const handleKeyDown = (e) => {
        const items = itemsRef.current;
        const highlightedIndex = highlightedIndexRef.current;
        const setHighlightedIndex = submenuContext.setHighlightedIndex;
        switch (e.key) {
          case "Escape":
          case "ArrowLeft": {
            e.preventDefault();
            e.stopPropagation();
            submenuContext.setIsOpen(false);
            if (submenuContext.triggerRef.current) {
              submenuContext.triggerRef.current.focus();
            }
            break;
          }
          case "ArrowDown": {
            e.preventDefault();
            e.stopPropagation();
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter((i) => i >= 0);
            const currentIdx = enabledIndices.indexOf(highlightedIndex);
            if (currentIdx < enabledIndices.length - 1) {
              setHighlightedIndex(enabledIndices[currentIdx + 1]);
            } else if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[0]);
            }
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            e.stopPropagation();
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter((i) => i >= 0);
            const currentIdx = enabledIndices.indexOf(highlightedIndex);
            if (currentIdx > 0) {
              setHighlightedIndex(enabledIndices[currentIdx - 1]);
            } else if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[enabledIndices.length - 1]);
            }
            break;
          }
          case "Enter":
          case " ": {
            e.preventDefault();
            e.stopPropagation();
            const item = items[highlightedIndex];
            if (item && !item.isDisabled && item.onSelect) {
              item.onSelect();
              parentContext.close();
            }
            break;
          }
          case "Home": {
            e.preventDefault();
            e.stopPropagation();
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter((i) => i >= 0);
            if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[0]);
            }
            break;
          }
          case "End": {
            e.preventDefault();
            e.stopPropagation();
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter((i) => i >= 0);
            if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[enabledIndices.length - 1]);
            }
            break;
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [submenuContext == null ? void 0 : submenuContext.isOpen, submenuContext == null ? void 0 : submenuContext.setIsOpen, parentContext == null ? void 0 : parentContext.close, submenuContext == null ? void 0 : submenuContext.triggerRef]);
    React5.useEffect(() => {
      if ((submenuContext == null ? void 0 : submenuContext.isOpen) && contentRef.current) {
        const enabledIndices = submenuContext.items.map((item, i) => item.isDisabled ? -1 : i).filter((i) => i >= 0);
        if (enabledIndices.length > 0) {
          submenuContext.setHighlightedIndex(enabledIndices[0]);
        }
        contentRef.current.focus({ preventScroll: true });
      }
    }, [submenuContext == null ? void 0 : submenuContext.isOpen, submenuContext == null ? void 0 : submenuContext.items, submenuContext == null ? void 0 : submenuContext.setHighlightedIndex]);
    const mergedRef = React5.useCallback(
      (el) => {
        contentRef.current = el;
        if (submenuContext) {
          submenuContext.contentRef.current = el;
        }
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [ref, submenuContext]
    );
    if (!portalContainer || !submenuContext)
      return null;
    return ReactDOM2.createPortal(
      /* @__PURE__ */ jsx5(
        "div",
        __spreadProps(__spreadValues({
          ref: mergedRef,
          role: "menu",
          tabIndex: submenuContext.isOpen ? 0 : -1,
          className: cn(Menu_default.subContent, className),
          "data-state": submenuContext.isOpen ? "open" : "closed",
          style: submenuContext.isOpen ? portalStyle : { position: "absolute", visibility: "hidden", pointerEvents: "none" }
        }, hoverProps), {
          children: /* @__PURE__ */ jsx5("div", { className: Menu_default.viewport, children: React5.Children.map(children, (child, index) => {
            if (React5.isValidElement(child)) {
              return React5.cloneElement(child, {
                _index: index,
                _isHighlighted: submenuContext.isOpen && index === submenuContext.highlightedIndex,
                _isInSubmenu: true
              });
            }
            return child;
          }) })
        })
      ),
      portalContainer
    );
  }
);
MenuSubContent.displayName = "MenuSubContent";

// src/components/Menu/index.tsx
var Menu2 = Object.assign(Menu, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioItem: MenuRadioItem,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Shortcut: MenuShortcut,
  Group: MenuGroup,
  RadioGroup: MenuRadioGroup,
  Portal: MenuPortal,
  Sub: MenuSub,
  SubContent: MenuSubContent,
  SubTrigger: MenuSubTrigger
});
export {
  Menu2 as Menu
};
