var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => {
  return (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
};
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
var __await = function(promise, isYieldStar) {
  this[0] = promise;
  this[1] = isYieldStar;
};
var __yieldStar = (value) => {
  var obj = value[__knownSymbol("asyncIterator")];
  var isAwait = false;
  var method;
  var it = {};
  if (obj == null) {
    obj = value[__knownSymbol("iterator")]();
    method = (k) => it[k] = (x) => obj[k](x);
  } else {
    obj = obj.call(value);
    method = (k) => it[k] = (v) => {
      if (isAwait) {
        isAwait = false;
        if (k === "throw")
          throw v;
        return v;
      }
      isAwait = true;
      return {
        done: false,
        value: new __await(new Promise((resolve) => {
          var x = obj[k](v);
          if (!(x instanceof Object))
            throw TypeError("Object expected");
          resolve(x);
        }), 1)
      };
    };
  }
  return it[__knownSymbol("iterator")] = () => it, method("next"), "throw" in obj ? method("throw") : it.throw = (x) => {
    throw x;
  }, "return" in obj && method("return"), it;
};

// src/components/CommandPalette/CommandPalette.tsx
import React3, { useState, useEffect, useRef as useRef2, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/useLayoutEffect.mjs
import $HgANd$react from "react";
var $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c = typeof document !== "undefined" ? (0, $HgANd$react).useLayoutEffect : () => {
};

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/useValueEffect.mjs
import { useState as $fCAlL$useState, useRef as $fCAlL$useRef, useCallback as $fCAlL$useCallback } from "react";
function $1dbecbe27a04f9af$export$14d238f342723f25(defaultValue) {
  let [value, setValue] = (0, $fCAlL$useState)(defaultValue);
  let currValue = (0, $fCAlL$useRef)(value);
  let effect = (0, $fCAlL$useRef)(null);
  let nextRef = (0, $fCAlL$useRef)(() => {
    if (!effect.current)
      return;
    let newValue = effect.current.next();
    if (newValue.done) {
      effect.current = null;
      return;
    }
    if (currValue.current === newValue.value)
      nextRef.current();
    else
      setValue(newValue.value);
  });
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    currValue.current = value;
    if (effect.current)
      nextRef.current();
  });
  let queue = (0, $fCAlL$useCallback)((fn) => {
    effect.current = fn(currValue.current);
    nextRef.current();
  }, [
    nextRef
  ]);
  return [
    value,
    queue
  ];
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/useId.mjs
import { useState as $eKkEp$useState, useRef as $eKkEp$useRef, useEffect as $eKkEp$useEffect, useCallback as $eKkEp$useCallback } from "react";

// ../../node_modules/.pnpm/@react-aria+ssr@3.9.10_react@19.2.1/node_modules/@react-aria/ssr/dist/SSRProvider.mjs
import $670gB$react, { useContext as $670gB$useContext, useState as $670gB$useState, useMemo as $670gB$useMemo, useLayoutEffect as $670gB$useLayoutEffect, useRef as $670gB$useRef } from "react";
var $b5e257d569688ac6$var$defaultContext = {
  prefix: String(Math.round(Math.random() * 1e10)),
  current: 0
};
var $b5e257d569688ac6$var$SSRContext = /* @__PURE__ */ (0, $670gB$react).createContext($b5e257d569688ac6$var$defaultContext);
var $b5e257d569688ac6$var$IsSSRContext = /* @__PURE__ */ (0, $670gB$react).createContext(false);
var $b5e257d569688ac6$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $b5e257d569688ac6$var$componentIds = /* @__PURE__ */ new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled = false) {
  let ctx = (0, $670gB$useContext)($b5e257d569688ac6$var$SSRContext);
  let ref = (0, $670gB$useRef)(null);
  if (ref.current === null && !isDisabled) {
    var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = (0, $670gB$react).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 ? void 0 : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
    if (currentOwner) {
      let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
      if (prevComponentValue == null)
        $b5e257d569688ac6$var$componentIds.set(currentOwner, {
          id: ctx.current,
          state: currentOwner.memoizedState
        });
      else if (currentOwner.memoizedState !== prevComponentValue.state) {
        ctx.current = prevComponentValue.id;
        $b5e257d569688ac6$var$componentIds.delete(currentOwner);
      }
    }
    ref.current = ++ctx.current;
  }
  return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
  let ctx = (0, $670gB$useContext)($b5e257d569688ac6$var$SSRContext);
  if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM && true)
    console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
  let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
  let prefix = ctx === $b5e257d569688ac6$var$defaultContext && false ? "react-aria" : `react-aria${ctx.prefix}`;
  return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
  let id = (0, $670gB$react).useId();
  let [didSSR] = (0, $670gB$useState)($b5e257d569688ac6$export$535bd6ca7f90a273());
  let prefix = didSSR || false ? "react-aria" : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
  return defaultId || `${prefix}-${id}`;
}
var $b5e257d569688ac6$export$619500959fc48b26 = typeof (0, $670gB$react)["useId"] === "function" ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
  return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
  return true;
}
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
  return () => {
  };
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
  if (typeof (0, $670gB$react)["useSyncExternalStore"] === "function")
    return (0, $670gB$react)["useSyncExternalStore"]($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot);
  return (0, $670gB$useContext)($b5e257d569688ac6$var$IsSSRContext);
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/useId.mjs
var $bdb11010cef70236$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $bdb11010cef70236$export$d41a04c74483c6ef = /* @__PURE__ */ new Map();
var $bdb11010cef70236$var$registry;
if (typeof FinalizationRegistry !== "undefined")
  $bdb11010cef70236$var$registry = new FinalizationRegistry((heldValue) => {
    $bdb11010cef70236$export$d41a04c74483c6ef.delete(heldValue);
  });
function $bdb11010cef70236$export$f680877a34711e37(defaultId) {
  let [value, setValue] = (0, $eKkEp$useState)(defaultId);
  let nextId = (0, $eKkEp$useRef)(null);
  let res = (0, $b5e257d569688ac6$export$619500959fc48b26)(value);
  let cleanupRef = (0, $eKkEp$useRef)(null);
  if ($bdb11010cef70236$var$registry)
    $bdb11010cef70236$var$registry.register(cleanupRef, res);
  if ($bdb11010cef70236$var$canUseDOM) {
    const cacheIdRef = $bdb11010cef70236$export$d41a04c74483c6ef.get(res);
    if (cacheIdRef && !cacheIdRef.includes(nextId))
      cacheIdRef.push(nextId);
    else
      $bdb11010cef70236$export$d41a04c74483c6ef.set(res, [
        nextId
      ]);
  }
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    let r = res;
    return () => {
      if ($bdb11010cef70236$var$registry)
        $bdb11010cef70236$var$registry.unregister(cleanupRef);
      $bdb11010cef70236$export$d41a04c74483c6ef.delete(r);
    };
  }, [
    res
  ]);
  (0, $eKkEp$useEffect)(() => {
    let newId = nextId.current;
    if (newId)
      setValue(newId);
    return () => {
      if (newId)
        nextId.current = null;
    };
  });
  return res;
}
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
  if (idA === idB)
    return idA;
  let setIdsA = $bdb11010cef70236$export$d41a04c74483c6ef.get(idA);
  if (setIdsA) {
    setIdsA.forEach((ref) => ref.current = idB);
    return idB;
  }
  let setIdsB = $bdb11010cef70236$export$d41a04c74483c6ef.get(idB);
  if (setIdsB) {
    setIdsB.forEach((ref) => ref.current = idA);
    return idA;
  }
  return idB;
}
function $bdb11010cef70236$export$b4cc09c592e8fdb8(depArray = []) {
  let id = $bdb11010cef70236$export$f680877a34711e37();
  let [resolvedId, setResolvedId] = (0, $1dbecbe27a04f9af$export$14d238f342723f25)(id);
  let updateId = (0, $eKkEp$useCallback)(() => {
    setResolvedId(function* () {
      yield id;
      yield document.getElementById(id) ? id : void 0;
    });
  }, [
    id,
    setResolvedId
  ]);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(updateId, [
    id,
    updateId,
    ...depArray
  ]);
  return resolvedId;
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/chain.mjs
function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks) {
  return (...args) => {
    for (let callback of callbacks)
      if (typeof callback === "function")
        callback(...args);
  };
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/domHelpers.mjs
var $431fbd86ca7dc216$export$b204af158042fbac = (el) => {
  var _el_ownerDocument;
  return (_el_ownerDocument = el === null || el === void 0 ? void 0 : el.ownerDocument) !== null && _el_ownerDocument !== void 0 ? _el_ownerDocument : document;
};
var $431fbd86ca7dc216$export$f21a1ffae260145a = (el) => {
  if (el && "window" in el && el.window === el)
    return el;
  const doc = $431fbd86ca7dc216$export$b204af158042fbac(el);
  return doc.defaultView || window;
};
function $431fbd86ca7dc216$var$isNode(value) {
  return value !== null && typeof value === "object" && "nodeType" in value && typeof value.nodeType === "number";
}
function $431fbd86ca7dc216$export$af51f0f06c0f328a(node) {
  return $431fbd86ca7dc216$var$isNode(node) && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in node;
}

// ../../node_modules/.pnpm/@react-stately+flags@3.1.2/node_modules/@react-stately/flags/dist/import.mjs
var $f4e2df6bd15f8569$var$_shadowDOM = false;
function $f4e2df6bd15f8569$export$98658e8c59125e6a() {
  return $f4e2df6bd15f8569$var$_shadowDOM;
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/DOMFunctions.mjs
function $d4ee10de306f2510$export$4282f70798064fe0(node, otherNode) {
  if (!(0, $f4e2df6bd15f8569$export$98658e8c59125e6a)())
    return otherNode && node ? node.contains(otherNode) : false;
  if (!node || !otherNode)
    return false;
  let currentNode = otherNode;
  while (currentNode !== null) {
    if (currentNode === node)
      return true;
    if (currentNode.tagName === "SLOT" && currentNode.assignedSlot)
      currentNode = currentNode.assignedSlot.parentNode;
    else if ((0, $431fbd86ca7dc216$export$af51f0f06c0f328a)(currentNode))
      currentNode = currentNode.host;
    else
      currentNode = currentNode.parentNode;
  }
  return false;
}
var $d4ee10de306f2510$export$cd4e5573fbe2b576 = (doc = document) => {
  var _activeElement_shadowRoot;
  if (!(0, $f4e2df6bd15f8569$export$98658e8c59125e6a)())
    return doc.activeElement;
  let activeElement = doc.activeElement;
  while (activeElement && "shadowRoot" in activeElement && ((_activeElement_shadowRoot = activeElement.shadowRoot) === null || _activeElement_shadowRoot === void 0 ? void 0 : _activeElement_shadowRoot.activeElement))
    activeElement = activeElement.shadowRoot.activeElement;
  return activeElement;
};
function $d4ee10de306f2510$export$e58f029f0fbfdb29(event) {
  if ((0, $f4e2df6bd15f8569$export$98658e8c59125e6a)() && event.target.shadowRoot) {
    if (event.composedPath)
      return event.composedPath()[0];
  }
  return event.target;
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/ShadowTreeWalker.mjs
var $dfc540311bf7f109$export$63eb3ababa9c55c4 = class {
  get currentNode() {
    return this._currentNode;
  }
  set currentNode(node) {
    if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(this.root, node))
      throw new Error("Cannot set currentNode to a node that is not contained by the root node.");
    const walkers = [];
    let curNode = node;
    let currentWalkerCurrentNode = node;
    this._currentNode = node;
    while (curNode && curNode !== this.root)
      if (curNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        const shadowRoot = curNode;
        const walker2 = this._doc.createTreeWalker(shadowRoot, this.whatToShow, {
          acceptNode: this._acceptNode
        });
        walkers.push(walker2);
        walker2.currentNode = currentWalkerCurrentNode;
        this._currentSetFor.add(walker2);
        curNode = currentWalkerCurrentNode = shadowRoot.host;
      } else
        curNode = curNode.parentNode;
    const walker = this._doc.createTreeWalker(this.root, this.whatToShow, {
      acceptNode: this._acceptNode
    });
    walkers.push(walker);
    walker.currentNode = currentWalkerCurrentNode;
    this._currentSetFor.add(walker);
    this._walkerStack = walkers;
  }
  get doc() {
    return this._doc;
  }
  firstChild() {
    let currentNode = this.currentNode;
    let newNode = this.nextNode();
    if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(currentNode, newNode)) {
      this.currentNode = currentNode;
      return null;
    }
    if (newNode)
      this.currentNode = newNode;
    return newNode;
  }
  lastChild() {
    let walker = this._walkerStack[0];
    let newNode = walker.lastChild();
    if (newNode)
      this.currentNode = newNode;
    return newNode;
  }
  nextNode() {
    const nextNode = this._walkerStack[0].nextNode();
    if (nextNode) {
      const shadowRoot = nextNode.shadowRoot;
      if (shadowRoot) {
        var _this_filter;
        let nodeResult;
        if (typeof this.filter === "function")
          nodeResult = this.filter(nextNode);
        else if ((_this_filter = this.filter) === null || _this_filter === void 0 ? void 0 : _this_filter.acceptNode)
          nodeResult = this.filter.acceptNode(nextNode);
        if (nodeResult === NodeFilter.FILTER_ACCEPT) {
          this.currentNode = nextNode;
          return nextNode;
        }
        let newNode = this.nextNode();
        if (newNode)
          this.currentNode = newNode;
        return newNode;
      }
      if (nextNode)
        this.currentNode = nextNode;
      return nextNode;
    } else {
      if (this._walkerStack.length > 1) {
        this._walkerStack.shift();
        let newNode = this.nextNode();
        if (newNode)
          this.currentNode = newNode;
        return newNode;
      } else
        return null;
    }
  }
  previousNode() {
    const currentWalker = this._walkerStack[0];
    if (currentWalker.currentNode === currentWalker.root) {
      if (this._currentSetFor.has(currentWalker)) {
        this._currentSetFor.delete(currentWalker);
        if (this._walkerStack.length > 1) {
          this._walkerStack.shift();
          let newNode = this.previousNode();
          if (newNode)
            this.currentNode = newNode;
          return newNode;
        } else
          return null;
      }
      return null;
    }
    const previousNode = currentWalker.previousNode();
    if (previousNode) {
      const shadowRoot = previousNode.shadowRoot;
      if (shadowRoot) {
        var _this_filter;
        let nodeResult;
        if (typeof this.filter === "function")
          nodeResult = this.filter(previousNode);
        else if ((_this_filter = this.filter) === null || _this_filter === void 0 ? void 0 : _this_filter.acceptNode)
          nodeResult = this.filter.acceptNode(previousNode);
        if (nodeResult === NodeFilter.FILTER_ACCEPT) {
          if (previousNode)
            this.currentNode = previousNode;
          return previousNode;
        }
        let newNode = this.lastChild();
        if (newNode)
          this.currentNode = newNode;
        return newNode;
      }
      if (previousNode)
        this.currentNode = previousNode;
      return previousNode;
    } else {
      if (this._walkerStack.length > 1) {
        this._walkerStack.shift();
        let newNode = this.previousNode();
        if (newNode)
          this.currentNode = newNode;
        return newNode;
      } else
        return null;
    }
  }
  /**
   * @deprecated
   */
  nextSibling() {
    return null;
  }
  /**
   * @deprecated
   */
  previousSibling() {
    return null;
  }
  /**
   * @deprecated
   */
  parentNode() {
    return null;
  }
  constructor(doc, root, whatToShow, filter) {
    this._walkerStack = [];
    this._currentSetFor = /* @__PURE__ */ new Set();
    this._acceptNode = (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const shadowRoot2 = node.shadowRoot;
        if (shadowRoot2) {
          const walker = this._doc.createTreeWalker(shadowRoot2, this.whatToShow, {
            acceptNode: this._acceptNode
          });
          this._walkerStack.unshift(walker);
          return NodeFilter.FILTER_ACCEPT;
        } else {
          var _this_filter;
          if (typeof this.filter === "function")
            return this.filter(node);
          else if ((_this_filter = this.filter) === null || _this_filter === void 0 ? void 0 : _this_filter.acceptNode)
            return this.filter.acceptNode(node);
          else if (this.filter === null)
            return NodeFilter.FILTER_ACCEPT;
        }
      }
      return NodeFilter.FILTER_SKIP;
    };
    this._doc = doc;
    this.root = root;
    this.filter = filter !== null && filter !== void 0 ? filter : null;
    this.whatToShow = whatToShow !== null && whatToShow !== void 0 ? whatToShow : NodeFilter.SHOW_ALL;
    this._currentNode = root;
    this._walkerStack.unshift(doc.createTreeWalker(root, whatToShow, this._acceptNode));
    const shadowRoot = root.shadowRoot;
    if (shadowRoot) {
      const walker = this._doc.createTreeWalker(shadowRoot, this.whatToShow, {
        acceptNode: this._acceptNode
      });
      this._walkerStack.unshift(walker);
    }
  }
};
function $dfc540311bf7f109$export$4d0f8be8b12a7ef6(doc, root, whatToShow, filter) {
  if ((0, $f4e2df6bd15f8569$export$98658e8c59125e6a)())
    return new $dfc540311bf7f109$export$63eb3ababa9c55c4(doc, root, whatToShow, filter);
  return doc.createTreeWalker(root, whatToShow, filter);
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/mergeProps.mjs
import $7jXr9$clsx from "clsx";
function $3ef42575df84b30b$export$9d1611c77c2fe928(...args) {
  let result = __spreadValues({}, args[0]);
  for (let i = 1; i < args.length; i++) {
    let props = args[i];
    for (let key in props) {
      let a = result[key];
      let b = props[key];
      if (typeof a === "function" && typeof b === "function" && // This is a lot faster than a regex.
      key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= /* 'A' */
      65 && key.charCodeAt(2) <= /* 'Z' */
      90)
        result[key] = (0, $ff5963eb1fccf552$export$e08e3b67e392101e)(a, b);
      else if ((key === "className" || key === "UNSAFE_className") && typeof a === "string" && typeof b === "string")
        result[key] = (0, $7jXr9$clsx)(a, b);
      else if (key === "id" && a && b)
        result.id = (0, $bdb11010cef70236$export$cd8c9cb68f842629)(a, b);
      else
        result[key] = b !== void 0 ? b : a;
    }
  }
  return result;
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/filterDOMProps.mjs
var $65484d02dcb7eb3e$var$DOMPropNames = /* @__PURE__ */ new Set([
  "id"
]);
var $65484d02dcb7eb3e$var$labelablePropNames = /* @__PURE__ */ new Set([
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-details"
]);
var $65484d02dcb7eb3e$var$linkPropNames = /* @__PURE__ */ new Set([
  "href",
  "hrefLang",
  "target",
  "rel",
  "download",
  "ping",
  "referrerPolicy"
]);
var $65484d02dcb7eb3e$var$globalAttrs = /* @__PURE__ */ new Set([
  "dir",
  "lang",
  "hidden",
  "inert",
  "translate"
]);
var $65484d02dcb7eb3e$var$globalEvents = /* @__PURE__ */ new Set([
  "onClick",
  "onAuxClick",
  "onContextMenu",
  "onDoubleClick",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
  "onTouchCancel",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart",
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut",
  "onGotPointerCapture",
  "onLostPointerCapture",
  "onScroll",
  "onWheel",
  "onAnimationStart",
  "onAnimationEnd",
  "onAnimationIteration",
  "onTransitionCancel",
  "onTransitionEnd",
  "onTransitionRun",
  "onTransitionStart"
]);
var $65484d02dcb7eb3e$var$propRe = /^(data-.*)$/;
function $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, opts = {}) {
  let { labelable, isLink, global, events = global, propNames } = opts;
  let filteredProps = {};
  for (const prop in props)
    if (Object.prototype.hasOwnProperty.call(props, prop) && ($65484d02dcb7eb3e$var$DOMPropNames.has(prop) || labelable && $65484d02dcb7eb3e$var$labelablePropNames.has(prop) || isLink && $65484d02dcb7eb3e$var$linkPropNames.has(prop) || global && $65484d02dcb7eb3e$var$globalAttrs.has(prop) || events && ($65484d02dcb7eb3e$var$globalEvents.has(prop) || prop.endsWith("Capture") && $65484d02dcb7eb3e$var$globalEvents.has(prop.slice(0, -7))) || (propNames === null || propNames === void 0 ? void 0 : propNames.has(prop)) || $65484d02dcb7eb3e$var$propRe.test(prop)))
      filteredProps[prop] = props[prop];
  return filteredProps;
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/focusWithoutScrolling.mjs
function $7215afc6de606d6b$export$de79e2c695e052f3(element) {
  if ($7215afc6de606d6b$var$supportsPreventScroll())
    element.focus({
      preventScroll: true
    });
  else {
    let scrollableElements = $7215afc6de606d6b$var$getScrollableElements(element);
    element.focus();
    $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements);
  }
}
var $7215afc6de606d6b$var$supportsPreventScrollCached = null;
function $7215afc6de606d6b$var$supportsPreventScroll() {
  if ($7215afc6de606d6b$var$supportsPreventScrollCached == null) {
    $7215afc6de606d6b$var$supportsPreventScrollCached = false;
    try {
      let focusElem = document.createElement("div");
      focusElem.focus({
        get preventScroll() {
          $7215afc6de606d6b$var$supportsPreventScrollCached = true;
          return true;
        }
      });
    } catch (e) {
    }
  }
  return $7215afc6de606d6b$var$supportsPreventScrollCached;
}
function $7215afc6de606d6b$var$getScrollableElements(element) {
  let parent = element.parentNode;
  let scrollableElements = [];
  let rootScrollingElement = document.scrollingElement || document.documentElement;
  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth)
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft
      });
    parent = parent.parentNode;
  }
  if (rootScrollingElement instanceof HTMLElement)
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft
    });
  return scrollableElements;
}
function $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements) {
  for (let { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/platform.mjs
function $c87311424ea30a05$var$testUserAgent(re) {
  var _window_navigator_userAgentData;
  if (typeof window === "undefined" || window.navigator == null)
    return false;
  let brands = (_window_navigator_userAgentData = window.navigator["userAgentData"]) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.brands;
  return Array.isArray(brands) && brands.some((brand) => re.test(brand.brand)) || re.test(window.navigator.userAgent);
}
function $c87311424ea30a05$var$testPlatform(re) {
  var _window_navigator_userAgentData;
  return typeof window !== "undefined" && window.navigator != null ? re.test(((_window_navigator_userAgentData = window.navigator["userAgentData"]) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.platform) || window.navigator.platform) : false;
}
function $c87311424ea30a05$var$cached(fn) {
  if (false)
    return fn;
  let res = null;
  return () => {
    if (res == null)
      res = fn();
    return res;
  };
}
var $c87311424ea30a05$export$9ac100e40613ea10 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testPlatform(/^Mac/i);
});
var $c87311424ea30a05$export$186c6964ca17d99 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testPlatform(/^iPhone/i);
});
var $c87311424ea30a05$export$7bef049ce92e4224 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  $c87311424ea30a05$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
});
var $c87311424ea30a05$export$fedb369cb70207f1 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$export$186c6964ca17d99() || $c87311424ea30a05$export$7bef049ce92e4224();
});
var $c87311424ea30a05$export$e1865c3bedcd822b = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$export$9ac100e40613ea10() || $c87311424ea30a05$export$fedb369cb70207f1();
});
var $c87311424ea30a05$export$78551043582a6a98 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) && !$c87311424ea30a05$export$6446a186d09e379e();
});
var $c87311424ea30a05$export$6446a186d09e379e = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
});
var $c87311424ea30a05$export$a11b0059900ceec8 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/Android/i);
});
var $c87311424ea30a05$export$b7d78993b74f766d = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/Firefox/i);
});

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/openLink.mjs
import $g3jFn$react, { createContext as $g3jFn$createContext, useMemo as $g3jFn$useMemo, useContext as $g3jFn$useContext } from "react";
function $ea8dcbcb9ea1b556$export$95185d699e05d4d7(target, modifiers, setOpening = true) {
  var _window_event_type, _window_event;
  let { metaKey, ctrlKey, altKey, shiftKey } = modifiers;
  if ((0, $c87311424ea30a05$export$b7d78993b74f766d)() && ((_window_event = window.event) === null || _window_event === void 0 ? void 0 : (_window_event_type = _window_event.type) === null || _window_event_type === void 0 ? void 0 : _window_event_type.startsWith("key")) && target.target === "_blank") {
    if ((0, $c87311424ea30a05$export$9ac100e40613ea10)())
      metaKey = true;
    else
      ctrlKey = true;
  }
  let event = (0, $c87311424ea30a05$export$78551043582a6a98)() && (0, $c87311424ea30a05$export$9ac100e40613ea10)() && !(0, $c87311424ea30a05$export$7bef049ce92e4224)() && true ? new KeyboardEvent("keydown", {
    keyIdentifier: "Enter",
    metaKey,
    ctrlKey,
    altKey,
    shiftKey
  }) : new MouseEvent("click", {
    metaKey,
    ctrlKey,
    altKey,
    shiftKey,
    detail: 1,
    bubbles: true,
    cancelable: true
  });
  $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = setOpening;
  (0, $7215afc6de606d6b$export$de79e2c695e052f3)(target);
  target.dispatchEvent(event);
  $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
}
$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/runAfterTransition.mjs
var $bbed8b41f857bcc0$var$transitionsByElement = /* @__PURE__ */ new Map();
var $bbed8b41f857bcc0$var$transitionCallbacks = /* @__PURE__ */ new Set();
function $bbed8b41f857bcc0$var$setupGlobalEvents() {
  if (typeof window === "undefined")
    return;
  function isTransitionEvent(event) {
    return "propertyName" in event;
  }
  let onTransitionStart = (e) => {
    if (!isTransitionEvent(e) || !e.target)
      return;
    let transitions = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
    if (!transitions) {
      transitions = /* @__PURE__ */ new Set();
      $bbed8b41f857bcc0$var$transitionsByElement.set(e.target, transitions);
      e.target.addEventListener("transitioncancel", onTransitionEnd, {
        once: true
      });
    }
    transitions.add(e.propertyName);
  };
  let onTransitionEnd = (e) => {
    if (!isTransitionEvent(e) || !e.target)
      return;
    let properties = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
    if (!properties)
      return;
    properties.delete(e.propertyName);
    if (properties.size === 0) {
      e.target.removeEventListener("transitioncancel", onTransitionEnd);
      $bbed8b41f857bcc0$var$transitionsByElement.delete(e.target);
    }
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) {
      for (let cb of $bbed8b41f857bcc0$var$transitionCallbacks)
        cb();
      $bbed8b41f857bcc0$var$transitionCallbacks.clear();
    }
  };
  document.body.addEventListener("transitionrun", onTransitionStart);
  document.body.addEventListener("transitionend", onTransitionEnd);
}
if (typeof document !== "undefined") {
  if (document.readyState !== "loading")
    $bbed8b41f857bcc0$var$setupGlobalEvents();
  else
    document.addEventListener("DOMContentLoaded", $bbed8b41f857bcc0$var$setupGlobalEvents);
}
function $bbed8b41f857bcc0$var$cleanupDetachedElements() {
  for (const [eventTarget] of $bbed8b41f857bcc0$var$transitionsByElement)
    if ("isConnected" in eventTarget && !eventTarget.isConnected)
      $bbed8b41f857bcc0$var$transitionsByElement.delete(eventTarget);
}
function $bbed8b41f857bcc0$export$24490316f764c430(fn) {
  requestAnimationFrame(() => {
    $bbed8b41f857bcc0$var$cleanupDetachedElements();
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0)
      fn();
    else
      $bbed8b41f857bcc0$var$transitionCallbacks.add(fn);
  });
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/useGlobalListeners.mjs
import { useRef as $lPAwt$useRef, useCallback as $lPAwt$useCallback, useEffect as $lPAwt$useEffect } from "react";
function $03deb23ff14920c4$export$4eaf04e54aa8eed6() {
  let globalListeners = (0, $lPAwt$useRef)(/* @__PURE__ */ new Map());
  let addGlobalListener = (0, $lPAwt$useCallback)((eventTarget, type, listener, options) => {
    let fn = (options === null || options === void 0 ? void 0 : options.once) ? (...args) => {
      globalListeners.current.delete(listener);
      listener(...args);
    } : listener;
    globalListeners.current.set(listener, {
      type,
      eventTarget,
      fn,
      options
    });
    eventTarget.addEventListener(type, fn, options);
  }, []);
  let removeGlobalListener = (0, $lPAwt$useCallback)((eventTarget, type, listener, options) => {
    var _globalListeners_current_get;
    let fn = ((_globalListeners_current_get = globalListeners.current.get(listener)) === null || _globalListeners_current_get === void 0 ? void 0 : _globalListeners_current_get.fn) || listener;
    eventTarget.removeEventListener(type, fn, options);
    globalListeners.current.delete(listener);
  }, []);
  let removeAllGlobalListeners = (0, $lPAwt$useCallback)(() => {
    globalListeners.current.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  }, [
    removeGlobalListener
  ]);
  (0, $lPAwt$useEffect)(() => {
    return removeAllGlobalListeners;
  }, [
    removeAllGlobalListeners
  ]);
  return {
    addGlobalListener,
    removeGlobalListener,
    removeAllGlobalListeners
  };
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/useLabels.mjs
function $313b98861ee5dd6c$export$d6875122194c7b44(props, defaultLabel) {
  let { id, "aria-label": label, "aria-labelledby": labelledBy } = props;
  id = (0, $bdb11010cef70236$export$f680877a34711e37)(id);
  if (labelledBy && label) {
    let ids = /* @__PURE__ */ new Set([
      id,
      ...labelledBy.trim().split(/\s+/)
    ]);
    labelledBy = [
      ...ids
    ].join(" ");
  } else if (labelledBy)
    labelledBy = labelledBy.trim().split(/\s+/).join(" ");
  if (!label && !labelledBy && defaultLabel)
    label = defaultLabel;
  return {
    id,
    "aria-label": label,
    "aria-labelledby": labelledBy
  };
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/useEffectEvent.mjs
import $lmaYr$react, { useRef as $lmaYr$useRef, useCallback as $lmaYr$useCallback } from "react";
var $8ae05eaa5c114e9c$var$_React_useInsertionEffect;
var $8ae05eaa5c114e9c$var$useEarlyEffect = ($8ae05eaa5c114e9c$var$_React_useInsertionEffect = (0, $lmaYr$react)["useInsertionEffect"]) !== null && $8ae05eaa5c114e9c$var$_React_useInsertionEffect !== void 0 ? $8ae05eaa5c114e9c$var$_React_useInsertionEffect : (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c);
function $8ae05eaa5c114e9c$export$7f54fc3180508a52(fn) {
  const ref = (0, $lmaYr$useRef)(null);
  $8ae05eaa5c114e9c$var$useEarlyEffect(() => {
    ref.current = fn;
  }, [
    fn
  ]);
  return (0, $lmaYr$useCallback)((...args) => {
    const f = ref.current;
    return f === null || f === void 0 ? void 0 : f(...args);
  }, []);
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/useSyncRef.mjs
function $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref) {
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    if (context && context.ref && ref) {
      context.ref.current = ref.current;
      return () => {
        if (context.ref)
          context.ref.current = null;
      };
    }
  });
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/isScrollable.mjs
function $cc38e7bd3fc7b213$export$2bb74740c4e19def(node, checkForOverflow) {
  if (!node)
    return false;
  let style = window.getComputedStyle(node);
  let isScrollable = /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
  if (isScrollable && checkForOverflow)
    isScrollable = node.scrollHeight !== node.clientHeight || node.scrollWidth !== node.clientWidth;
  return isScrollable;
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/getScrollParent.mjs
function $62d8ded9296f3872$export$cfa2225e87938781(node, checkForOverflow) {
  let scrollableNode = node;
  if ((0, $cc38e7bd3fc7b213$export$2bb74740c4e19def)(scrollableNode, checkForOverflow))
    scrollableNode = scrollableNode.parentElement;
  while (scrollableNode && !(0, $cc38e7bd3fc7b213$export$2bb74740c4e19def)(scrollableNode, checkForOverflow))
    scrollableNode = scrollableNode.parentElement;
  return scrollableNode || document.scrollingElement || document.documentElement;
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/keyboard.mjs
var $21f1aa98acb08317$var$nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function $21f1aa98acb08317$export$c57958e35f31ed73(target) {
  return target instanceof HTMLInputElement && !$21f1aa98acb08317$var$nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/isVirtualEvent.mjs
function $6a7db85432448f7f$export$60278871457622de(event) {
  if (event.pointerType === "" && event.isTrusted)
    return true;
  if ((0, $c87311424ea30a05$export$a11b0059900ceec8)() && event.pointerType)
    return event.type === "click" && event.buttons === 1;
  return event.detail === 0 && !event.pointerType;
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/useFormReset.mjs
import { useEffect as $8rM3G$useEffect } from "react";
function $99facab73266f662$export$5add1d006293d136(ref, initialValue, onReset) {
  let handleReset = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(() => {
    if (onReset)
      onReset(initialValue);
  });
  (0, $8rM3G$useEffect)(() => {
    var _ref_current;
    let form = ref === null || ref === void 0 ? void 0 : (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.form;
    form === null || form === void 0 ? void 0 : form.addEventListener("reset", handleReset);
    return () => {
      form === null || form === void 0 ? void 0 : form.removeEventListener("reset", handleReset);
    };
  }, [
    ref
  ]);
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/isElementVisible.mjs
var $7d2416ea0959daaa$var$supportsCheckVisibility = typeof Element !== "undefined" && "checkVisibility" in Element.prototype;
function $7d2416ea0959daaa$var$isStyleVisible(element) {
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  if (!(element instanceof windowObject.HTMLElement) && !(element instanceof windowObject.SVGElement))
    return false;
  let { display, visibility } = element.style;
  let isVisible = display !== "none" && visibility !== "hidden" && visibility !== "collapse";
  if (isVisible) {
    const { getComputedStyle } = element.ownerDocument.defaultView;
    let { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element);
    isVisible = computedDisplay !== "none" && computedVisibility !== "hidden" && computedVisibility !== "collapse";
  }
  return isVisible;
}
function $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) {
  return !element.hasAttribute("hidden") && // Ignore HiddenSelect when tree walking.
  !element.hasAttribute("data-react-aria-prevent-focus") && (element.nodeName === "DETAILS" && childElement && childElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true);
}
function $7d2416ea0959daaa$export$e989c0fffaa6b27a(element, childElement) {
  if ($7d2416ea0959daaa$var$supportsCheckVisibility)
    return element.checkVisibility({
      visibilityProperty: true
    }) && !element.closest("[data-react-aria-prevent-focus]");
  return element.nodeName !== "#comment" && $7d2416ea0959daaa$var$isStyleVisible(element) && $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) && (!element.parentElement || $7d2416ea0959daaa$export$e989c0fffaa6b27a(element.parentElement, element));
}

// ../../node_modules/.pnpm/@react-aria+utils@3.32.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/utils/dist/isFocusable.mjs
var $b4b717babfbb907b$var$focusableElements = [
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "a[href]",
  "area[href]",
  "summary",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable^="false"])',
  "permission"
];
var $b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
$b4b717babfbb907b$var$focusableElements.push('[tabindex]:not([tabindex="-1"]):not([disabled])');
var $b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(':not([hidden]):not([tabindex="-1"]),');
function $b4b717babfbb907b$export$4c063cf1350e6fed(element) {
  return element.matches($b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR) && (0, $7d2416ea0959daaa$export$e989c0fffaa6b27a)(element) && !$b4b717babfbb907b$var$isInert(element);
}
function $b4b717babfbb907b$export$bebd5a1431fec25d(element) {
  return element.matches($b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR) && (0, $7d2416ea0959daaa$export$e989c0fffaa6b27a)(element) && !$b4b717babfbb907b$var$isInert(element);
}
function $b4b717babfbb907b$var$isInert(element) {
  let node = element;
  while (node != null) {
    if (node instanceof node.ownerDocument.defaultView.HTMLElement && node.inert)
      return true;
    node = node.parentElement;
  }
  return false;
}

// ../../node_modules/.pnpm/@react-stately+utils@3.11.0_react@19.2.1/node_modules/@react-stately/utils/dist/useControlledState.mjs
import $3whtM$react, { useState as $3whtM$useState, useRef as $3whtM$useRef, useEffect as $3whtM$useEffect, useReducer as $3whtM$useReducer, useCallback as $3whtM$useCallback } from "react";
var $458b0a5536c1a7cf$var$_React_useInsertionEffect;
var $458b0a5536c1a7cf$var$useEarlyEffect = typeof document !== "undefined" ? ($458b0a5536c1a7cf$var$_React_useInsertionEffect = (0, $3whtM$react)["useInsertionEffect"]) !== null && $458b0a5536c1a7cf$var$_React_useInsertionEffect !== void 0 ? $458b0a5536c1a7cf$var$_React_useInsertionEffect : (0, $3whtM$react).useLayoutEffect : () => {
};
function $458b0a5536c1a7cf$export$40bfa8c7b0832715(value, defaultValue, onChange) {
  let [stateValue, setStateValue] = (0, $3whtM$useState)(value || defaultValue);
  let valueRef = (0, $3whtM$useRef)(stateValue);
  let isControlledRef = (0, $3whtM$useRef)(value !== void 0);
  let isControlled = value !== void 0;
  (0, $3whtM$useEffect)(() => {
    let wasControlled = isControlledRef.current;
    if (wasControlled !== isControlled && true)
      console.warn(`WARN: A component changed from ${wasControlled ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}.`);
    isControlledRef.current = isControlled;
  }, [
    isControlled
  ]);
  let currentValue = isControlled ? value : stateValue;
  $458b0a5536c1a7cf$var$useEarlyEffect(() => {
    valueRef.current = currentValue;
  });
  let [, forceUpdate] = (0, $3whtM$useReducer)(() => ({}), {});
  let setValue = (0, $3whtM$useCallback)((value2, ...args) => {
    let newValue = typeof value2 === "function" ? value2(valueRef.current) : value2;
    if (!Object.is(valueRef.current, newValue)) {
      valueRef.current = newValue;
      setStateValue(newValue);
      forceUpdate();
      onChange === null || onChange === void 0 ? void 0 : onChange(newValue, ...args);
    }
  }, [
    onChange
  ]);
  return [
    currentValue,
    setValue
  ];
}

// ../../node_modules/.pnpm/@react-aria+i18n@3.12.14_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/i18n/dist/utils.mjs
var $148a7a147e38ea7f$var$RTL_SCRIPTS = /* @__PURE__ */ new Set([
  "Arab",
  "Syrc",
  "Samr",
  "Mand",
  "Thaa",
  "Mend",
  "Nkoo",
  "Adlm",
  "Rohg",
  "Hebr"
]);
var $148a7a147e38ea7f$var$RTL_LANGS = /* @__PURE__ */ new Set([
  "ae",
  "ar",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "nqo",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi"
]);
function $148a7a147e38ea7f$export$702d680b21cbd764(localeString) {
  if (Intl.Locale) {
    let locale = new Intl.Locale(localeString).maximize();
    let textInfo = typeof locale.getTextInfo === "function" ? locale.getTextInfo() : locale.textInfo;
    if (textInfo)
      return textInfo.direction === "rtl";
    if (locale.script)
      return $148a7a147e38ea7f$var$RTL_SCRIPTS.has(locale.script);
  }
  let lang = localeString.split("-")[0];
  return $148a7a147e38ea7f$var$RTL_LANGS.has(lang);
}

// ../../node_modules/.pnpm/@react-aria+i18n@3.12.14_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/i18n/dist/useDefaultLocale.mjs
import { useState as $ffhGL$useState, useEffect as $ffhGL$useEffect } from "react";
var $1e5a04cdaf7d1af8$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
function $1e5a04cdaf7d1af8$export$f09106e7c6677ec5() {
  let locale = typeof window !== "undefined" && window[$1e5a04cdaf7d1af8$var$localeSymbol] || typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US";
  try {
    Intl.DateTimeFormat.supportedLocalesOf([
      locale
    ]);
  } catch (e) {
    locale = "en-US";
  }
  return {
    locale,
    direction: (0, $148a7a147e38ea7f$export$702d680b21cbd764)(locale) ? "rtl" : "ltr"
  };
}
var $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
var $1e5a04cdaf7d1af8$var$listeners = /* @__PURE__ */ new Set();
function $1e5a04cdaf7d1af8$var$updateLocale() {
  $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
  for (let listener of $1e5a04cdaf7d1af8$var$listeners)
    listener($1e5a04cdaf7d1af8$var$currentLocale);
}
function $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a() {
  let isSSR = (0, $b5e257d569688ac6$export$535bd6ca7f90a273)();
  let [defaultLocale, setDefaultLocale] = (0, $ffhGL$useState)($1e5a04cdaf7d1af8$var$currentLocale);
  (0, $ffhGL$useEffect)(() => {
    if ($1e5a04cdaf7d1af8$var$listeners.size === 0)
      window.addEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
    $1e5a04cdaf7d1af8$var$listeners.add(setDefaultLocale);
    return () => {
      $1e5a04cdaf7d1af8$var$listeners.delete(setDefaultLocale);
      if ($1e5a04cdaf7d1af8$var$listeners.size === 0)
        window.removeEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
    };
  }, []);
  if (isSSR) {
    let locale = typeof window !== "undefined" && window[$1e5a04cdaf7d1af8$var$localeSymbol];
    return {
      locale: locale || "en-US",
      direction: "ltr"
    };
  }
  return defaultLocale;
}

// ../../node_modules/.pnpm/@react-aria+i18n@3.12.14_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/i18n/dist/context.mjs
import $h9FiU$react, { useContext as $h9FiU$useContext } from "react";
var $18f2051aff69b9bf$var$I18nContext = /* @__PURE__ */ (0, $h9FiU$react).createContext(null);
function $18f2051aff69b9bf$export$43bb16f9c6d9e3f7() {
  let defaultLocale = (0, $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a)();
  let context = (0, $h9FiU$useContext)($18f2051aff69b9bf$var$I18nContext);
  return context || defaultLocale;
}

// ../../node_modules/.pnpm/@internationalized+string@3.2.7/node_modules/@internationalized/string/dist/LocalizedStringDictionary.mjs
var $5b160d28a433310d$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
var $5b160d28a433310d$var$stringsSymbol = Symbol.for("react-aria.i18n.strings");
var $5b160d28a433310d$var$cachedGlobalStrings = void 0;
var $5b160d28a433310d$export$c17fa47878dc55b6 = class _$5b160d28a433310d$export$c17fa47878dc55b6 {
  /** Returns a localized string for the given key and locale. */
  getStringForLocale(key, locale) {
    let strings = this.getStringsForLocale(locale);
    let string = strings[key];
    if (!string)
      throw new Error(`Could not find intl message ${key} in ${locale} locale`);
    return string;
  }
  /** Returns all localized strings for the given locale. */
  getStringsForLocale(locale) {
    let strings = this.strings[locale];
    if (!strings) {
      strings = $5b160d28a433310d$var$getStringsForLocale(locale, this.strings, this.defaultLocale);
      this.strings[locale] = strings;
    }
    return strings;
  }
  static getGlobalDictionaryForPackage(packageName) {
    if (typeof window === "undefined")
      return null;
    let locale = window[$5b160d28a433310d$var$localeSymbol];
    if ($5b160d28a433310d$var$cachedGlobalStrings === void 0) {
      let globalStrings = window[$5b160d28a433310d$var$stringsSymbol];
      if (!globalStrings)
        return null;
      $5b160d28a433310d$var$cachedGlobalStrings = {};
      for (let pkg in globalStrings)
        $5b160d28a433310d$var$cachedGlobalStrings[pkg] = new _$5b160d28a433310d$export$c17fa47878dc55b6({
          [locale]: globalStrings[pkg]
        }, locale);
    }
    let dictionary = $5b160d28a433310d$var$cachedGlobalStrings === null || $5b160d28a433310d$var$cachedGlobalStrings === void 0 ? void 0 : $5b160d28a433310d$var$cachedGlobalStrings[packageName];
    if (!dictionary)
      throw new Error(`Strings for package "${packageName}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
    return dictionary;
  }
  constructor(messages, defaultLocale = "en-US") {
    this.strings = Object.fromEntries(Object.entries(messages).filter(([, v]) => v));
    this.defaultLocale = defaultLocale;
  }
};
function $5b160d28a433310d$var$getStringsForLocale(locale, strings, defaultLocale = "en-US") {
  if (strings[locale])
    return strings[locale];
  let language = $5b160d28a433310d$var$getLanguage(locale);
  if (strings[language])
    return strings[language];
  for (let key in strings) {
    if (key.startsWith(language + "-"))
      return strings[key];
  }
  return strings[defaultLocale];
}
function $5b160d28a433310d$var$getLanguage(locale) {
  if (Intl.Locale)
    return new Intl.Locale(locale).language;
  return locale.split("-")[0];
}

// ../../node_modules/.pnpm/@internationalized+string@3.2.7/node_modules/@internationalized/string/dist/LocalizedStringFormatter.mjs
var $6db58dc88e78b024$var$pluralRulesCache = /* @__PURE__ */ new Map();
var $6db58dc88e78b024$var$numberFormatCache = /* @__PURE__ */ new Map();
var $6db58dc88e78b024$export$2f817fcdc4b89ae0 = class {
  /** Formats a localized string for the given key with the provided variables. */
  format(key, variables) {
    let message = this.strings.getStringForLocale(key, this.locale);
    return typeof message === "function" ? message(variables, this) : message;
  }
  plural(count, options, type = "cardinal") {
    let opt = options["=" + count];
    if (opt)
      return typeof opt === "function" ? opt() : opt;
    let key = this.locale + ":" + type;
    let pluralRules = $6db58dc88e78b024$var$pluralRulesCache.get(key);
    if (!pluralRules) {
      pluralRules = new Intl.PluralRules(this.locale, {
        type
      });
      $6db58dc88e78b024$var$pluralRulesCache.set(key, pluralRules);
    }
    let selected = pluralRules.select(count);
    opt = options[selected] || options.other;
    return typeof opt === "function" ? opt() : opt;
  }
  number(value) {
    let numberFormat = $6db58dc88e78b024$var$numberFormatCache.get(this.locale);
    if (!numberFormat) {
      numberFormat = new Intl.NumberFormat(this.locale);
      $6db58dc88e78b024$var$numberFormatCache.set(this.locale, numberFormat);
    }
    return numberFormat.format(value);
  }
  select(options, value) {
    let opt = options[value] || options.other;
    return typeof opt === "function" ? opt() : opt;
  }
  constructor(locale, strings) {
    this.locale = locale;
    this.strings = strings;
  }
};

// ../../node_modules/.pnpm/@react-aria+i18n@3.12.14_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/i18n/dist/useLocalizedStringFormatter.mjs
import { useMemo as $6ksNp$useMemo } from "react";
var $fca6afa0e843324b$var$cache = /* @__PURE__ */ new WeakMap();
function $fca6afa0e843324b$var$getCachedDictionary(strings) {
  let dictionary = $fca6afa0e843324b$var$cache.get(strings);
  if (!dictionary) {
    dictionary = new (0, $5b160d28a433310d$export$c17fa47878dc55b6)(strings);
    $fca6afa0e843324b$var$cache.set(strings, dictionary);
  }
  return dictionary;
}
function $fca6afa0e843324b$export$87b761675e8eaa10(strings, packageName) {
  return packageName && (0, $5b160d28a433310d$export$c17fa47878dc55b6).getGlobalDictionaryForPackage(packageName) || $fca6afa0e843324b$var$getCachedDictionary(strings);
}
function $fca6afa0e843324b$export$f12b703ca79dfbb1(strings, packageName) {
  let { locale } = (0, $18f2051aff69b9bf$export$43bb16f9c6d9e3f7)();
  let dictionary = $fca6afa0e843324b$export$87b761675e8eaa10(strings, packageName);
  return (0, $6ksNp$useMemo)(() => new (0, $6db58dc88e78b024$export$2f817fcdc4b89ae0)(locale, dictionary), [
    locale,
    dictionary
  ]);
}

// ../../node_modules/.pnpm/@react-aria+interactions@3.26.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/interactions/dist/utils.mjs
import { useRef as $6dfIe$useRef, useCallback as $6dfIe$useCallback } from "react";
function $8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent) {
  let event = nativeEvent;
  event.nativeEvent = nativeEvent;
  event.isDefaultPrevented = () => event.defaultPrevented;
  event.isPropagationStopped = () => event.cancelBubble;
  event.persist = () => {
  };
  return event;
}
function $8a9cb279dc87e130$export$c2b7abe5d61ec696(event, target) {
  Object.defineProperty(event, "target", {
    value: target
  });
  Object.defineProperty(event, "currentTarget", {
    value: target
  });
}
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
  let stateRef = (0, $6dfIe$useRef)({
    isFocused: false,
    observer: null
  });
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    const state = stateRef.current;
    return () => {
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
    };
  }, []);
  return (0, $6dfIe$useCallback)((e) => {
    if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
      stateRef.current.isFocused = true;
      let target = e.target;
      let onBlurHandler = (e2) => {
        stateRef.current.isFocused = false;
        if (target.disabled) {
          let event = $8a9cb279dc87e130$export$525bc4921d56d4a(e2);
          onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
        }
        if (stateRef.current.observer) {
          stateRef.current.observer.disconnect();
          stateRef.current.observer = null;
        }
      };
      target.addEventListener("focusout", onBlurHandler, {
        once: true
      });
      stateRef.current.observer = new MutationObserver(() => {
        if (stateRef.current.isFocused && target.disabled) {
          var _stateRef_current_observer;
          (_stateRef_current_observer = stateRef.current.observer) === null || _stateRef_current_observer === void 0 ? void 0 : _stateRef_current_observer.disconnect();
          let relatedTargetEl = target === document.activeElement ? null : document.activeElement;
          target.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: relatedTargetEl
          }));
          target.dispatchEvent(new FocusEvent("focusout", {
            bubbles: true,
            relatedTarget: relatedTargetEl
          }));
        }
      });
      stateRef.current.observer.observe(target, {
        attributes: true,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    onBlur
  ]);
}
var $8a9cb279dc87e130$export$fda7da73ab5d4c48 = false;

// ../../node_modules/.pnpm/@react-aria+interactions@3.26.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/interactions/dist/useFocusVisible.mjs
import { useState as $28AnR$useState, useEffect as $28AnR$useEffect } from "react";
var $507fabe10e71c6fb$var$currentModality = null;
var $507fabe10e71c6fb$var$currentPointerType = "keyboard";
var $507fabe10e71c6fb$var$changeHandlers = /* @__PURE__ */ new Set();
var $507fabe10e71c6fb$export$d90243b58daecda7 = /* @__PURE__ */ new Map();
var $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
var $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e) {
  for (let handler of $507fabe10e71c6fb$var$changeHandlers)
    handler(modality, e);
}
function $507fabe10e71c6fb$var$isValidKey(e) {
  return !(e.metaKey || !(0, $c87311424ea30a05$export$9ac100e40613ea10)() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e) {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
  if (!(0, $ea8dcbcb9ea1b556$export$95185d699e05d4d7).isOpening && $507fabe10e71c6fb$var$isValidKey(e)) {
    $507fabe10e71c6fb$var$currentModality = "keyboard";
    $507fabe10e71c6fb$var$currentPointerType = "keyboard";
    $507fabe10e71c6fb$var$triggerChangeHandlers("keyboard", e);
  }
}
function $507fabe10e71c6fb$var$handlePointerEvent(e) {
  $507fabe10e71c6fb$var$currentModality = "pointer";
  $507fabe10e71c6fb$var$currentPointerType = "pointerType" in e ? e.pointerType : "mouse";
  if (e.type === "mousedown" || e.type === "pointerdown") {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$triggerChangeHandlers("pointer", e);
  }
}
function $507fabe10e71c6fb$var$handleClickEvent(e) {
  if (!(0, $ea8dcbcb9ea1b556$export$95185d699e05d4d7).isOpening && (0, $6a7db85432448f7f$export$60278871457622de)(e)) {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$currentModality = "virtual";
    $507fabe10e71c6fb$var$currentPointerType = "virtual";
  }
}
function $507fabe10e71c6fb$var$handleFocusEvent(e) {
  if (e.target === window || e.target === document || (0, $8a9cb279dc87e130$export$fda7da73ab5d4c48) || !e.isTrusted)
    return;
  if (!$507fabe10e71c6fb$var$hasEventBeforeFocus && !$507fabe10e71c6fb$var$hasBlurredWindowRecently) {
    $507fabe10e71c6fb$var$currentModality = "virtual";
    $507fabe10e71c6fb$var$currentPointerType = "virtual";
    $507fabe10e71c6fb$var$triggerChangeHandlers("virtual", e);
  }
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
  if (0, $8a9cb279dc87e130$export$fda7da73ab5d4c48)
    return;
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = true;
}
function $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) {
  if (typeof window === "undefined" || typeof document === "undefined" || $507fabe10e71c6fb$export$d90243b58daecda7.get((0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element)))
    return;
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  let focus = windowObject.HTMLElement.prototype.focus;
  windowObject.HTMLElement.prototype.focus = function() {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  };
  documentObject.addEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.addEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.addEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, true);
  windowObject.addEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, true);
  windowObject.addEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    documentObject.addEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  } else if (false) {
    documentObject.addEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  }
  windowObject.addEventListener("beforeunload", () => {
    $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element);
  }, {
    once: true
  });
  $507fabe10e71c6fb$export$d90243b58daecda7.set(windowObject, {
    focus
  });
}
var $507fabe10e71c6fb$var$tearDownWindowFocusTracking = (element, loadListener) => {
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  if (loadListener)
    documentObject.removeEventListener("DOMContentLoaded", loadListener);
  if (!$507fabe10e71c6fb$export$d90243b58daecda7.has(windowObject))
    return;
  windowObject.HTMLElement.prototype.focus = $507fabe10e71c6fb$export$d90243b58daecda7.get(windowObject).focus;
  documentObject.removeEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.removeEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.removeEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, true);
  windowObject.removeEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, true);
  windowObject.removeEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    documentObject.removeEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  } else if (false) {
    documentObject.removeEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  }
  $507fabe10e71c6fb$export$d90243b58daecda7.delete(windowObject);
};
function $507fabe10e71c6fb$export$2f1888112f558a7d(element) {
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  let loadListener;
  if (documentObject.readyState !== "loading")
    $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
  else {
    loadListener = () => {
      $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
    };
    documentObject.addEventListener("DOMContentLoaded", loadListener);
  }
  return () => $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element, loadListener);
}
if (typeof document !== "undefined")
  $507fabe10e71c6fb$export$2f1888112f558a7d();
function $507fabe10e71c6fb$export$630ff653c5ada6a9() {
  return $507fabe10e71c6fb$var$currentModality;
}
function $507fabe10e71c6fb$export$8397ddfc504fdb9a(modality) {
  $507fabe10e71c6fb$var$currentModality = modality;
  $507fabe10e71c6fb$var$currentPointerType = modality === "pointer" ? "mouse" : modality;
  $507fabe10e71c6fb$var$triggerChangeHandlers(modality, null);
}

// ../../node_modules/.pnpm/@react-aria+interactions@3.26.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/interactions/dist/focusSafely.mjs
function $3ad3f6e1647bc98d$export$80f3e147d781571c(element) {
  const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  if ((0, $507fabe10e71c6fb$export$630ff653c5ada6a9)() === "virtual") {
    let lastFocusedElement = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument);
    (0, $bbed8b41f857bcc0$export$24490316f764c430)(() => {
      const activeElement = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument);
      if ((activeElement === lastFocusedElement || activeElement === ownerDocument.body) && element.isConnected)
        (0, $7215afc6de606d6b$export$de79e2c695e052f3)(element);
    });
  } else
    (0, $7215afc6de606d6b$export$de79e2c695e052f3)(element);
}

// ../../node_modules/.pnpm/@react-aria+interactions@3.26.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/interactions/dist/useFocus.mjs
import { useCallback as $hf0lj$useCallback } from "react";
function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props) {
  let { isDisabled, onFocus: onFocusProp, onBlur: onBlurProp, onFocusChange } = props;
  const onBlur = (0, $hf0lj$useCallback)((e) => {
    if (e.target === e.currentTarget) {
      if (onBlurProp)
        onBlurProp(e);
      if (onFocusChange)
        onFocusChange(false);
      return true;
    }
  }, [
    onBlurProp,
    onFocusChange
  ]);
  const onSyntheticFocus = (0, $8a9cb279dc87e130$export$715c682d09d639cc)(onBlur);
  const onFocus = (0, $hf0lj$useCallback)((e) => {
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(e.target);
    const activeElement = ownerDocument ? (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument) : (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)();
    if (e.target === e.currentTarget && activeElement === (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e.nativeEvent)) {
      if (onFocusProp)
        onFocusProp(e);
      if (onFocusChange)
        onFocusChange(true);
      onSyntheticFocus(e);
    }
  }, [
    onFocusChange,
    onFocusProp,
    onSyntheticFocus
  ]);
  return {
    focusProps: {
      onFocus: !isDisabled && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : void 0,
      onBlur: !isDisabled && (onBlurProp || onFocusChange) ? onBlur : void 0
    }
  };
}

// ../../node_modules/.pnpm/@react-aria+interactions@3.26.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/interactions/dist/createEventHandler.mjs
function $93925083ecbb358c$export$48d1ea6320830260(handler) {
  if (!handler)
    return void 0;
  let shouldStopPropagation = true;
  return (e) => {
    let event = __spreadProps(__spreadValues({}, e), {
      preventDefault() {
        e.preventDefault();
      },
      isDefaultPrevented() {
        return e.isDefaultPrevented();
      },
      stopPropagation() {
        if (shouldStopPropagation && true)
          console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.");
        else
          shouldStopPropagation = true;
      },
      continuePropagation() {
        shouldStopPropagation = false;
      },
      isPropagationStopped() {
        return shouldStopPropagation;
      }
    });
    handler(event);
    if (shouldStopPropagation)
      e.stopPropagation();
  };
}

// ../../node_modules/.pnpm/@react-aria+interactions@3.26.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/interactions/dist/useKeyboard.mjs
function $46d819fcbaf35654$export$8f71654801c2f7cd(props) {
  return {
    keyboardProps: props.isDisabled ? {} : {
      onKeyDown: (0, $93925083ecbb358c$export$48d1ea6320830260)(props.onKeyDown),
      onKeyUp: (0, $93925083ecbb358c$export$48d1ea6320830260)(props.onKeyUp)
    }
  };
}

// ../../node_modules/.pnpm/@react-aria+interactions@3.26.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/interactions/dist/useFocusable.mjs
import $fcPuG$react, { useContext as $fcPuG$useContext, useRef as $fcPuG$useRef, useEffect as $fcPuG$useEffect, forwardRef as $fcPuG$forwardRef } from "react";
var $f645667febf57a63$export$f9762fab77588ecb = /* @__PURE__ */ (0, $fcPuG$react).createContext(null);
function $f645667febf57a63$var$useFocusableContext(ref) {
  let context = (0, $fcPuG$useContext)($f645667febf57a63$export$f9762fab77588ecb) || {};
  (0, $e7801be82b4b2a53$export$4debdb1a3f0fa79e)(context, ref);
  let _a = context, { ref: _ } = _a, otherProps = __objRest(_a, ["ref"]);
  return otherProps;
}
function $f645667febf57a63$export$4c014de7c8940b4c(props, domRef) {
  let { focusProps } = (0, $a1ea59d68270f0dd$export$f8168d8dd8fd66e6)(props);
  let { keyboardProps } = (0, $46d819fcbaf35654$export$8f71654801c2f7cd)(props);
  let interactions = (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(focusProps, keyboardProps);
  let domProps = $f645667febf57a63$var$useFocusableContext(domRef);
  let interactionProps = props.isDisabled ? {} : domProps;
  let autoFocusRef = (0, $fcPuG$useRef)(props.autoFocus);
  (0, $fcPuG$useEffect)(() => {
    if (autoFocusRef.current && domRef.current)
      (0, $3ad3f6e1647bc98d$export$80f3e147d781571c)(domRef.current);
    autoFocusRef.current = false;
  }, [
    domRef
  ]);
  let tabIndex = props.excludeFromTabOrder ? -1 : 0;
  if (props.isDisabled)
    tabIndex = void 0;
  return {
    focusableProps: (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(__spreadProps(__spreadValues({}, interactions), {
      tabIndex
    }), interactionProps)
  };
}

// ../../node_modules/.pnpm/@react-aria+interactions@3.26.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/interactions/dist/useFocusWithin.mjs
import { useRef as $3b9Q0$useRef, useCallback as $3b9Q0$useCallback } from "react";
function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
  let { isDisabled, onBlurWithin, onFocusWithin, onFocusWithinChange } = props;
  let state = (0, $3b9Q0$useRef)({
    isFocusWithin: false
  });
  let { addGlobalListener, removeAllGlobalListeners } = (0, $03deb23ff14920c4$export$4eaf04e54aa8eed6)();
  let onBlur = (0, $3b9Q0$useCallback)((e) => {
    if (!e.currentTarget.contains(e.target))
      return;
    if (state.current.isFocusWithin && !e.currentTarget.contains(e.relatedTarget)) {
      state.current.isFocusWithin = false;
      removeAllGlobalListeners();
      if (onBlurWithin)
        onBlurWithin(e);
      if (onFocusWithinChange)
        onFocusWithinChange(false);
    }
  }, [
    onBlurWithin,
    onFocusWithinChange,
    state,
    removeAllGlobalListeners
  ]);
  let onSyntheticFocus = (0, $8a9cb279dc87e130$export$715c682d09d639cc)(onBlur);
  let onFocus = (0, $3b9Q0$useCallback)((e) => {
    if (!e.currentTarget.contains(e.target))
      return;
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(e.target);
    const activeElement = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument);
    if (!state.current.isFocusWithin && activeElement === (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e.nativeEvent)) {
      if (onFocusWithin)
        onFocusWithin(e);
      if (onFocusWithinChange)
        onFocusWithinChange(true);
      state.current.isFocusWithin = true;
      onSyntheticFocus(e);
      let currentTarget = e.currentTarget;
      addGlobalListener(ownerDocument, "focus", (e2) => {
        if (state.current.isFocusWithin && !(0, $d4ee10de306f2510$export$4282f70798064fe0)(currentTarget, e2.target)) {
          let nativeEvent = new ownerDocument.defaultView.FocusEvent("blur", {
            relatedTarget: e2.target
          });
          (0, $8a9cb279dc87e130$export$c2b7abe5d61ec696)(nativeEvent, currentTarget);
          let event = (0, $8a9cb279dc87e130$export$525bc4921d56d4a)(nativeEvent);
          onBlur(event);
        }
      }, {
        capture: true
      });
    }
  }, [
    onFocusWithin,
    onFocusWithinChange,
    onSyntheticFocus,
    addGlobalListener,
    onBlur
  ]);
  if (isDisabled)
    return {
      focusWithinProps: {
        // These cannot be null, that would conflict in mergeProps
        onFocus: void 0,
        onBlur: void 0
      }
    };
  return {
    focusWithinProps: {
      onFocus,
      onBlur
    }
  };
}

// ../../node_modules/.pnpm/@react-aria+interactions@3.26.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/interactions/dist/useInteractOutside.mjs
import { useRef as $ispOf$useRef, useEffect as $ispOf$useEffect } from "react";
function $e0b6e0b68ec7f50f$export$872b660ac5a1ff98(props) {
  let { ref, onInteractOutside, isDisabled, onInteractOutsideStart } = props;
  let stateRef = (0, $ispOf$useRef)({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false
  });
  let onPointerDown = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e) => {
    if (onInteractOutside && $e0b6e0b68ec7f50f$var$isValidEvent(e, ref)) {
      if (onInteractOutsideStart)
        onInteractOutsideStart(e);
      stateRef.current.isPointerDown = true;
    }
  });
  let triggerInteractOutside = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e) => {
    if (onInteractOutside)
      onInteractOutside(e);
  });
  (0, $ispOf$useEffect)(() => {
    let state = stateRef.current;
    if (isDisabled)
      return;
    const element = ref.current;
    const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
    if (typeof PointerEvent !== "undefined") {
      let onClick = (e) => {
        if (state.isPointerDown && $e0b6e0b68ec7f50f$var$isValidEvent(e, ref))
          triggerInteractOutside(e);
        state.isPointerDown = false;
      };
      documentObject.addEventListener("pointerdown", onPointerDown, true);
      documentObject.addEventListener("click", onClick, true);
      return () => {
        documentObject.removeEventListener("pointerdown", onPointerDown, true);
        documentObject.removeEventListener("click", onClick, true);
      };
    } else if (false) {
      let onMouseUp = (e) => {
        if (state.ignoreEmulatedMouseEvents)
          state.ignoreEmulatedMouseEvents = false;
        else if (state.isPointerDown && $e0b6e0b68ec7f50f$var$isValidEvent(e, ref))
          triggerInteractOutside(e);
        state.isPointerDown = false;
      };
      let onTouchEnd = (e) => {
        state.ignoreEmulatedMouseEvents = true;
        if (state.isPointerDown && $e0b6e0b68ec7f50f$var$isValidEvent(e, ref))
          triggerInteractOutside(e);
        state.isPointerDown = false;
      };
      documentObject.addEventListener("mousedown", onPointerDown, true);
      documentObject.addEventListener("mouseup", onMouseUp, true);
      documentObject.addEventListener("touchstart", onPointerDown, true);
      documentObject.addEventListener("touchend", onTouchEnd, true);
      return () => {
        documentObject.removeEventListener("mousedown", onPointerDown, true);
        documentObject.removeEventListener("mouseup", onMouseUp, true);
        documentObject.removeEventListener("touchstart", onPointerDown, true);
        documentObject.removeEventListener("touchend", onTouchEnd, true);
      };
    }
  }, [
    ref,
    isDisabled
  ]);
}
function $e0b6e0b68ec7f50f$var$isValidEvent(event, ref) {
  if (event.button > 0)
    return false;
  if (event.target) {
    const ownerDocument = event.target.ownerDocument;
    if (!ownerDocument || !ownerDocument.documentElement.contains(event.target))
      return false;
    if (event.target.closest("[data-react-aria-top-layer]"))
      return false;
  }
  if (!ref.current)
    return false;
  return !event.composedPath().includes(ref.current);
}

// ../../node_modules/.pnpm/@react-aria+focus@3.21.3_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/focus/dist/FocusScope.mjs
import $cgawC$react, { useRef as $cgawC$useRef, useContext as $cgawC$useContext, useMemo as $cgawC$useMemo, useEffect as $cgawC$useEffect } from "react";
var $9bf71ea28793e738$var$FocusContext = /* @__PURE__ */ (0, $cgawC$react).createContext(null);
var $9bf71ea28793e738$var$RESTORE_FOCUS_EVENT = "react-aria-focus-scope-restore";
var $9bf71ea28793e738$var$activeScope = null;
function $9bf71ea28793e738$export$20e40289641fbbb6(props) {
  let { children, contain, restoreFocus, autoFocus } = props;
  let startRef = (0, $cgawC$useRef)(null);
  let endRef = (0, $cgawC$useRef)(null);
  let scopeRef = (0, $cgawC$useRef)([]);
  let { parentNode } = (0, $cgawC$useContext)($9bf71ea28793e738$var$FocusContext) || {};
  let node = (0, $cgawC$useMemo)(() => new $9bf71ea28793e738$var$TreeNode({
    scopeRef
  }), [
    scopeRef
  ]);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    let parent = parentNode || $9bf71ea28793e738$export$d06fae2ee68b101e.root;
    if ($9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(parent.scopeRef) && $9bf71ea28793e738$var$activeScope && !$9bf71ea28793e738$var$isAncestorScope($9bf71ea28793e738$var$activeScope, parent.scopeRef)) {
      let activeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode($9bf71ea28793e738$var$activeScope);
      if (activeNode)
        parent = activeNode;
    }
    parent.addChild(node);
    $9bf71ea28793e738$export$d06fae2ee68b101e.addNode(node);
  }, [
    node,
    parentNode
  ]);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    let node2 = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef);
    if (node2)
      node2.contain = !!contain;
  }, [
    contain
  ]);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    var _startRef_current;
    let node2 = (_startRef_current = startRef.current) === null || _startRef_current === void 0 ? void 0 : _startRef_current.nextSibling;
    let nodes = [];
    let stopPropagation = (e) => e.stopPropagation();
    while (node2 && node2 !== endRef.current) {
      nodes.push(node2);
      node2.addEventListener($9bf71ea28793e738$var$RESTORE_FOCUS_EVENT, stopPropagation);
      node2 = node2.nextSibling;
    }
    scopeRef.current = nodes;
    return () => {
      for (let node3 of nodes)
        node3.removeEventListener($9bf71ea28793e738$var$RESTORE_FOCUS_EVENT, stopPropagation);
    };
  }, [
    children
  ]);
  $9bf71ea28793e738$var$useActiveScopeTracker(scopeRef, restoreFocus, contain);
  $9bf71ea28793e738$var$useFocusContainment(scopeRef, contain);
  $9bf71ea28793e738$var$useRestoreFocus(scopeRef, restoreFocus, contain);
  $9bf71ea28793e738$var$useAutoFocus(scopeRef, autoFocus);
  (0, $cgawC$useEffect)(() => {
    const activeElement = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)((0, $431fbd86ca7dc216$export$b204af158042fbac)(scopeRef.current ? scopeRef.current[0] : void 0));
    let scope = null;
    if ($9bf71ea28793e738$var$isElementInScope(activeElement, scopeRef.current)) {
      for (let node2 of $9bf71ea28793e738$export$d06fae2ee68b101e.traverse())
        if (node2.scopeRef && $9bf71ea28793e738$var$isElementInScope(activeElement, node2.scopeRef.current))
          scope = node2;
      if (scope === $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef))
        $9bf71ea28793e738$var$activeScope = scope.scopeRef;
    }
  }, [
    scopeRef
  ]);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    return () => {
      var _focusScopeTree_getTreeNode_parent, _focusScopeTree_getTreeNode;
      var _focusScopeTree_getTreeNode_parent_scopeRef;
      let parentScope = (_focusScopeTree_getTreeNode_parent_scopeRef = (_focusScopeTree_getTreeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef)) === null || _focusScopeTree_getTreeNode === void 0 ? void 0 : (_focusScopeTree_getTreeNode_parent = _focusScopeTree_getTreeNode.parent) === null || _focusScopeTree_getTreeNode_parent === void 0 ? void 0 : _focusScopeTree_getTreeNode_parent.scopeRef) !== null && _focusScopeTree_getTreeNode_parent_scopeRef !== void 0 ? _focusScopeTree_getTreeNode_parent_scopeRef : null;
      if ((scopeRef === $9bf71ea28793e738$var$activeScope || $9bf71ea28793e738$var$isAncestorScope(scopeRef, $9bf71ea28793e738$var$activeScope)) && (!parentScope || $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(parentScope)))
        $9bf71ea28793e738$var$activeScope = parentScope;
      $9bf71ea28793e738$export$d06fae2ee68b101e.removeTreeNode(scopeRef);
    };
  }, [
    scopeRef
  ]);
  let focusManager = (0, $cgawC$useMemo)(() => $9bf71ea28793e738$var$createFocusManagerForScope(scopeRef), []);
  let value = (0, $cgawC$useMemo)(() => ({
    focusManager,
    parentNode: node
  }), [
    node,
    focusManager
  ]);
  return /* @__PURE__ */ (0, $cgawC$react).createElement($9bf71ea28793e738$var$FocusContext.Provider, {
    value
  }, /* @__PURE__ */ (0, $cgawC$react).createElement("span", {
    "data-focus-scope-start": true,
    hidden: true,
    ref: startRef
  }), children, /* @__PURE__ */ (0, $cgawC$react).createElement("span", {
    "data-focus-scope-end": true,
    hidden: true,
    ref: endRef
  }));
}
function $9bf71ea28793e738$var$createFocusManagerForScope(scopeRef) {
  return {
    focusNext(opts = {}) {
      let scope = scopeRef.current;
      let { from, tabbable, wrap, accept } = opts;
      var _scope_;
      let node = from || (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)((0, $431fbd86ca7dc216$export$b204af158042fbac)((_scope_ = scope[0]) !== null && _scope_ !== void 0 ? _scope_ : void 0));
      let sentinel = scope[0].previousElementSibling;
      let scopeRoot = $9bf71ea28793e738$var$getScopeRoot(scope);
      let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(scopeRoot, {
        tabbable,
        accept
      }, scope);
      walker.currentNode = $9bf71ea28793e738$var$isElementInScope(node, scope) ? node : sentinel;
      let nextNode = walker.nextNode();
      if (!nextNode && wrap) {
        walker.currentNode = sentinel;
        nextNode = walker.nextNode();
      }
      if (nextNode)
        $9bf71ea28793e738$var$focusElement(nextNode, true);
      return nextNode;
    },
    focusPrevious(opts = {}) {
      let scope = scopeRef.current;
      let { from, tabbable, wrap, accept } = opts;
      var _scope_;
      let node = from || (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)((0, $431fbd86ca7dc216$export$b204af158042fbac)((_scope_ = scope[0]) !== null && _scope_ !== void 0 ? _scope_ : void 0));
      let sentinel = scope[scope.length - 1].nextElementSibling;
      let scopeRoot = $9bf71ea28793e738$var$getScopeRoot(scope);
      let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(scopeRoot, {
        tabbable,
        accept
      }, scope);
      walker.currentNode = $9bf71ea28793e738$var$isElementInScope(node, scope) ? node : sentinel;
      let previousNode = walker.previousNode();
      if (!previousNode && wrap) {
        walker.currentNode = sentinel;
        previousNode = walker.previousNode();
      }
      if (previousNode)
        $9bf71ea28793e738$var$focusElement(previousNode, true);
      return previousNode;
    },
    focusFirst(opts = {}) {
      let scope = scopeRef.current;
      let { tabbable, accept } = opts;
      let scopeRoot = $9bf71ea28793e738$var$getScopeRoot(scope);
      let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(scopeRoot, {
        tabbable,
        accept
      }, scope);
      walker.currentNode = scope[0].previousElementSibling;
      let nextNode = walker.nextNode();
      if (nextNode)
        $9bf71ea28793e738$var$focusElement(nextNode, true);
      return nextNode;
    },
    focusLast(opts = {}) {
      let scope = scopeRef.current;
      let { tabbable, accept } = opts;
      let scopeRoot = $9bf71ea28793e738$var$getScopeRoot(scope);
      let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(scopeRoot, {
        tabbable,
        accept
      }, scope);
      walker.currentNode = scope[scope.length - 1].nextElementSibling;
      let previousNode = walker.previousNode();
      if (previousNode)
        $9bf71ea28793e738$var$focusElement(previousNode, true);
      return previousNode;
    }
  };
}
function $9bf71ea28793e738$var$getScopeRoot(scope) {
  return scope[0].parentElement;
}
function $9bf71ea28793e738$var$shouldContainFocus(scopeRef) {
  let scope = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode($9bf71ea28793e738$var$activeScope);
  while (scope && scope.scopeRef !== scopeRef) {
    if (scope.contain)
      return false;
    scope = scope.parent;
  }
  return true;
}
function $9bf71ea28793e738$var$isTabbableRadio(element) {
  if (element.checked)
    return true;
  let radios = [];
  if (!element.form)
    radios = [
      ...(0, $431fbd86ca7dc216$export$b204af158042fbac)(element).querySelectorAll(`input[type="radio"][name="${CSS.escape(element.name)}"]`)
    ].filter((radio) => !radio.form);
  else {
    var _element_form_elements, _element_form;
    let radioList = (_element_form = element.form) === null || _element_form === void 0 ? void 0 : (_element_form_elements = _element_form.elements) === null || _element_form_elements === void 0 ? void 0 : _element_form_elements.namedItem(element.name);
    radios = [
      ...radioList !== null && radioList !== void 0 ? radioList : []
    ];
  }
  if (!radios)
    return false;
  let anyChecked = radios.some((radio) => radio.checked);
  return !anyChecked;
}
function $9bf71ea28793e738$var$useFocusContainment(scopeRef, contain) {
  let focusedNode = (0, $cgawC$useRef)(void 0);
  let raf = (0, $cgawC$useRef)(void 0);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    let scope = scopeRef.current;
    if (!contain) {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = void 0;
      }
      return;
    }
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(scope ? scope[0] : void 0);
    let onKeyDown = (e) => {
      if (e.key !== "Tab" || e.altKey || e.ctrlKey || e.metaKey || !$9bf71ea28793e738$var$shouldContainFocus(scopeRef) || e.isComposing)
        return;
      let focusedElement = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument);
      let scope2 = scopeRef.current;
      if (!scope2 || !$9bf71ea28793e738$var$isElementInScope(focusedElement, scope2))
        return;
      let scopeRoot = $9bf71ea28793e738$var$getScopeRoot(scope2);
      let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(scopeRoot, {
        tabbable: true
      }, scope2);
      if (!focusedElement)
        return;
      walker.currentNode = focusedElement;
      let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
      if (!nextElement) {
        walker.currentNode = e.shiftKey ? scope2[scope2.length - 1].nextElementSibling : scope2[0].previousElementSibling;
        nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
      }
      e.preventDefault();
      if (nextElement)
        $9bf71ea28793e738$var$focusElement(nextElement, true);
    };
    let onFocus = (e) => {
      if ((!$9bf71ea28793e738$var$activeScope || $9bf71ea28793e738$var$isAncestorScope($9bf71ea28793e738$var$activeScope, scopeRef)) && $9bf71ea28793e738$var$isElementInScope((0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e), scopeRef.current)) {
        $9bf71ea28793e738$var$activeScope = scopeRef;
        focusedNode.current = (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e);
      } else if ($9bf71ea28793e738$var$shouldContainFocus(scopeRef) && !$9bf71ea28793e738$var$isElementInChildScope((0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e), scopeRef)) {
        if (focusedNode.current)
          focusedNode.current.focus();
        else if ($9bf71ea28793e738$var$activeScope && $9bf71ea28793e738$var$activeScope.current)
          $9bf71ea28793e738$var$focusFirstInScope($9bf71ea28793e738$var$activeScope.current);
      } else if ($9bf71ea28793e738$var$shouldContainFocus(scopeRef))
        focusedNode.current = (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e);
    };
    let onBlur = (e) => {
      if (raf.current)
        cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        let modality = (0, $507fabe10e71c6fb$export$630ff653c5ada6a9)();
        let shouldSkipFocusRestore = (modality === "virtual" || modality === null) && (0, $c87311424ea30a05$export$a11b0059900ceec8)() && (0, $c87311424ea30a05$export$6446a186d09e379e)();
        let activeElement = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument);
        if (!shouldSkipFocusRestore && activeElement && $9bf71ea28793e738$var$shouldContainFocus(scopeRef) && !$9bf71ea28793e738$var$isElementInChildScope(activeElement, scopeRef)) {
          $9bf71ea28793e738$var$activeScope = scopeRef;
          let target = (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e);
          if (target && target.isConnected) {
            var _focusedNode_current;
            focusedNode.current = target;
            (_focusedNode_current = focusedNode.current) === null || _focusedNode_current === void 0 ? void 0 : _focusedNode_current.focus();
          } else if ($9bf71ea28793e738$var$activeScope.current)
            $9bf71ea28793e738$var$focusFirstInScope($9bf71ea28793e738$var$activeScope.current);
        }
      });
    };
    ownerDocument.addEventListener("keydown", onKeyDown, false);
    ownerDocument.addEventListener("focusin", onFocus, false);
    scope === null || scope === void 0 ? void 0 : scope.forEach((element) => element.addEventListener("focusin", onFocus, false));
    scope === null || scope === void 0 ? void 0 : scope.forEach((element) => element.addEventListener("focusout", onBlur, false));
    return () => {
      ownerDocument.removeEventListener("keydown", onKeyDown, false);
      ownerDocument.removeEventListener("focusin", onFocus, false);
      scope === null || scope === void 0 ? void 0 : scope.forEach((element) => element.removeEventListener("focusin", onFocus, false));
      scope === null || scope === void 0 ? void 0 : scope.forEach((element) => element.removeEventListener("focusout", onBlur, false));
    };
  }, [
    scopeRef,
    contain
  ]);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    return () => {
      if (raf.current)
        cancelAnimationFrame(raf.current);
    };
  }, [
    raf
  ]);
}
function $9bf71ea28793e738$var$isElementInAnyScope(element) {
  return $9bf71ea28793e738$var$isElementInChildScope(element);
}
function $9bf71ea28793e738$var$isElementInScope(element, scope) {
  if (!element)
    return false;
  if (!scope)
    return false;
  return scope.some((node) => node.contains(element));
}
function $9bf71ea28793e738$var$isElementInChildScope(element, scope = null) {
  if (element instanceof Element && element.closest("[data-react-aria-top-layer]"))
    return true;
  for (let { scopeRef: s } of $9bf71ea28793e738$export$d06fae2ee68b101e.traverse($9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scope))) {
    if (s && $9bf71ea28793e738$var$isElementInScope(element, s.current))
      return true;
  }
  return false;
}
function $9bf71ea28793e738$export$1258395f99bf9cbf(element) {
  return $9bf71ea28793e738$var$isElementInChildScope(element, $9bf71ea28793e738$var$activeScope);
}
function $9bf71ea28793e738$var$isAncestorScope(ancestor, scope) {
  var _focusScopeTree_getTreeNode;
  let parent = (_focusScopeTree_getTreeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scope)) === null || _focusScopeTree_getTreeNode === void 0 ? void 0 : _focusScopeTree_getTreeNode.parent;
  while (parent) {
    if (parent.scopeRef === ancestor)
      return true;
    parent = parent.parent;
  }
  return false;
}
function $9bf71ea28793e738$var$focusElement(element, scroll = false) {
  if (element != null && !scroll)
    try {
      (0, $3ad3f6e1647bc98d$export$80f3e147d781571c)(element);
    } catch (e) {
    }
  else if (element != null)
    try {
      element.focus();
    } catch (e) {
    }
}
function $9bf71ea28793e738$var$getFirstInScope(scope, tabbable = true) {
  let sentinel = scope[0].previousElementSibling;
  let scopeRoot = $9bf71ea28793e738$var$getScopeRoot(scope);
  let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(scopeRoot, {
    tabbable
  }, scope);
  walker.currentNode = sentinel;
  let nextNode = walker.nextNode();
  if (tabbable && !nextNode) {
    scopeRoot = $9bf71ea28793e738$var$getScopeRoot(scope);
    walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(scopeRoot, {
      tabbable: false
    }, scope);
    walker.currentNode = sentinel;
    nextNode = walker.nextNode();
  }
  return nextNode;
}
function $9bf71ea28793e738$var$focusFirstInScope(scope, tabbable = true) {
  $9bf71ea28793e738$var$focusElement($9bf71ea28793e738$var$getFirstInScope(scope, tabbable));
}
function $9bf71ea28793e738$var$useAutoFocus(scopeRef, autoFocus) {
  const autoFocusRef = (0, $cgawC$react).useRef(autoFocus);
  (0, $cgawC$useEffect)(() => {
    if (autoFocusRef.current) {
      $9bf71ea28793e738$var$activeScope = scopeRef;
      const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(scopeRef.current ? scopeRef.current[0] : void 0);
      if (!$9bf71ea28793e738$var$isElementInScope((0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument), $9bf71ea28793e738$var$activeScope.current) && scopeRef.current)
        $9bf71ea28793e738$var$focusFirstInScope(scopeRef.current);
    }
    autoFocusRef.current = false;
  }, [
    scopeRef
  ]);
}
function $9bf71ea28793e738$var$useActiveScopeTracker(scopeRef, restore, contain) {
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    if (restore || contain)
      return;
    let scope = scopeRef.current;
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(scope ? scope[0] : void 0);
    let onFocus = (e) => {
      let target = (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e);
      if ($9bf71ea28793e738$var$isElementInScope(target, scopeRef.current))
        $9bf71ea28793e738$var$activeScope = scopeRef;
      else if (!$9bf71ea28793e738$var$isElementInAnyScope(target))
        $9bf71ea28793e738$var$activeScope = null;
    };
    ownerDocument.addEventListener("focusin", onFocus, false);
    scope === null || scope === void 0 ? void 0 : scope.forEach((element) => element.addEventListener("focusin", onFocus, false));
    return () => {
      ownerDocument.removeEventListener("focusin", onFocus, false);
      scope === null || scope === void 0 ? void 0 : scope.forEach((element) => element.removeEventListener("focusin", onFocus, false));
    };
  }, [
    scopeRef,
    restore,
    contain
  ]);
}
function $9bf71ea28793e738$var$shouldRestoreFocus(scopeRef) {
  let scope = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode($9bf71ea28793e738$var$activeScope);
  while (scope && scope.scopeRef !== scopeRef) {
    if (scope.nodeToRestore)
      return false;
    scope = scope.parent;
  }
  return (scope === null || scope === void 0 ? void 0 : scope.scopeRef) === scopeRef;
}
function $9bf71ea28793e738$var$useRestoreFocus(scopeRef, restoreFocus, contain) {
  const nodeToRestoreRef = (0, $cgawC$useRef)(typeof document !== "undefined" ? (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)((0, $431fbd86ca7dc216$export$b204af158042fbac)(scopeRef.current ? scopeRef.current[0] : void 0)) : null);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    let scope = scopeRef.current;
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(scope ? scope[0] : void 0);
    if (!restoreFocus || contain)
      return;
    let onFocus = () => {
      if ((!$9bf71ea28793e738$var$activeScope || $9bf71ea28793e738$var$isAncestorScope($9bf71ea28793e738$var$activeScope, scopeRef)) && $9bf71ea28793e738$var$isElementInScope((0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument), scopeRef.current))
        $9bf71ea28793e738$var$activeScope = scopeRef;
    };
    ownerDocument.addEventListener("focusin", onFocus, false);
    scope === null || scope === void 0 ? void 0 : scope.forEach((element) => element.addEventListener("focusin", onFocus, false));
    return () => {
      ownerDocument.removeEventListener("focusin", onFocus, false);
      scope === null || scope === void 0 ? void 0 : scope.forEach((element) => element.removeEventListener("focusin", onFocus, false));
    };
  }, [
    scopeRef,
    contain
  ]);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(scopeRef.current ? scopeRef.current[0] : void 0);
    if (!restoreFocus)
      return;
    let onKeyDown = (e) => {
      if (e.key !== "Tab" || e.altKey || e.ctrlKey || e.metaKey || !$9bf71ea28793e738$var$shouldContainFocus(scopeRef) || e.isComposing)
        return;
      let focusedElement = ownerDocument.activeElement;
      if (!$9bf71ea28793e738$var$isElementInChildScope(focusedElement, scopeRef) || !$9bf71ea28793e738$var$shouldRestoreFocus(scopeRef))
        return;
      let treeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef);
      if (!treeNode)
        return;
      let nodeToRestore = treeNode.nodeToRestore;
      let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(ownerDocument.body, {
        tabbable: true
      });
      walker.currentNode = focusedElement;
      let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
      if (!nodeToRestore || !nodeToRestore.isConnected || nodeToRestore === ownerDocument.body) {
        nodeToRestore = void 0;
        treeNode.nodeToRestore = void 0;
      }
      if ((!nextElement || !$9bf71ea28793e738$var$isElementInChildScope(nextElement, scopeRef)) && nodeToRestore) {
        walker.currentNode = nodeToRestore;
        do
          nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
        while ($9bf71ea28793e738$var$isElementInChildScope(nextElement, scopeRef));
        e.preventDefault();
        e.stopPropagation();
        if (nextElement)
          $9bf71ea28793e738$var$focusElement(nextElement, true);
        else if (!$9bf71ea28793e738$var$isElementInAnyScope(nodeToRestore))
          focusedElement.blur();
        else
          $9bf71ea28793e738$var$focusElement(nodeToRestore, true);
      }
    };
    if (!contain)
      ownerDocument.addEventListener("keydown", onKeyDown, true);
    return () => {
      if (!contain)
        ownerDocument.removeEventListener("keydown", onKeyDown, true);
    };
  }, [
    scopeRef,
    restoreFocus,
    contain
  ]);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(scopeRef.current ? scopeRef.current[0] : void 0);
    if (!restoreFocus)
      return;
    let treeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef);
    if (!treeNode)
      return;
    var _nodeToRestoreRef_current;
    treeNode.nodeToRestore = (_nodeToRestoreRef_current = nodeToRestoreRef.current) !== null && _nodeToRestoreRef_current !== void 0 ? _nodeToRestoreRef_current : void 0;
    return () => {
      let treeNode2 = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef);
      if (!treeNode2)
        return;
      let nodeToRestore = treeNode2.nodeToRestore;
      let activeElement = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument);
      if (restoreFocus && nodeToRestore && (activeElement && $9bf71ea28793e738$var$isElementInChildScope(activeElement, scopeRef) || activeElement === ownerDocument.body && $9bf71ea28793e738$var$shouldRestoreFocus(scopeRef))) {
        let clonedTree = $9bf71ea28793e738$export$d06fae2ee68b101e.clone();
        requestAnimationFrame(() => {
          if (ownerDocument.activeElement === ownerDocument.body) {
            let treeNode3 = clonedTree.getTreeNode(scopeRef);
            while (treeNode3) {
              if (treeNode3.nodeToRestore && treeNode3.nodeToRestore.isConnected) {
                $9bf71ea28793e738$var$restoreFocusToElement(treeNode3.nodeToRestore);
                return;
              }
              treeNode3 = treeNode3.parent;
            }
            treeNode3 = clonedTree.getTreeNode(scopeRef);
            while (treeNode3) {
              if (treeNode3.scopeRef && treeNode3.scopeRef.current && $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(treeNode3.scopeRef)) {
                let node = $9bf71ea28793e738$var$getFirstInScope(treeNode3.scopeRef.current, true);
                $9bf71ea28793e738$var$restoreFocusToElement(node);
                return;
              }
              treeNode3 = treeNode3.parent;
            }
          }
        });
      }
    };
  }, [
    scopeRef,
    restoreFocus
  ]);
}
function $9bf71ea28793e738$var$restoreFocusToElement(node) {
  if (node.dispatchEvent(new CustomEvent($9bf71ea28793e738$var$RESTORE_FOCUS_EVENT, {
    bubbles: true,
    cancelable: true
  })))
    $9bf71ea28793e738$var$focusElement(node);
}
function $9bf71ea28793e738$export$2d6ec8fc375ceafa(root, opts, scope) {
  let filter = (opts === null || opts === void 0 ? void 0 : opts.tabbable) ? (0, $b4b717babfbb907b$export$bebd5a1431fec25d) : (0, $b4b717babfbb907b$export$4c063cf1350e6fed);
  let rootElement = (root === null || root === void 0 ? void 0 : root.nodeType) === Node.ELEMENT_NODE ? root : null;
  let doc = (0, $431fbd86ca7dc216$export$b204af158042fbac)(rootElement);
  let walker = (0, $dfc540311bf7f109$export$4d0f8be8b12a7ef6)(doc, root || doc, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      var _opts_from;
      if (opts === null || opts === void 0 ? void 0 : (_opts_from = opts.from) === null || _opts_from === void 0 ? void 0 : _opts_from.contains(node))
        return NodeFilter.FILTER_REJECT;
      if ((opts === null || opts === void 0 ? void 0 : opts.tabbable) && node.tagName === "INPUT" && node.getAttribute("type") === "radio") {
        if (!$9bf71ea28793e738$var$isTabbableRadio(node))
          return NodeFilter.FILTER_REJECT;
        if (walker.currentNode.tagName === "INPUT" && walker.currentNode.type === "radio" && walker.currentNode.name === node.name)
          return NodeFilter.FILTER_REJECT;
      }
      if (filter(node) && (!scope || $9bf71ea28793e738$var$isElementInScope(node, scope)) && (!(opts === null || opts === void 0 ? void 0 : opts.accept) || opts.accept(node)))
        return NodeFilter.FILTER_ACCEPT;
      return NodeFilter.FILTER_SKIP;
    }
  });
  if (opts === null || opts === void 0 ? void 0 : opts.from)
    walker.currentNode = opts.from;
  return walker;
}
var $9bf71ea28793e738$var$Tree = class _$9bf71ea28793e738$var$Tree {
  get size() {
    return this.fastMap.size;
  }
  getTreeNode(data) {
    return this.fastMap.get(data);
  }
  addTreeNode(scopeRef, parent, nodeToRestore) {
    let parentNode = this.fastMap.get(parent !== null && parent !== void 0 ? parent : null);
    if (!parentNode)
      return;
    let node = new $9bf71ea28793e738$var$TreeNode({
      scopeRef
    });
    parentNode.addChild(node);
    node.parent = parentNode;
    this.fastMap.set(scopeRef, node);
    if (nodeToRestore)
      node.nodeToRestore = nodeToRestore;
  }
  addNode(node) {
    this.fastMap.set(node.scopeRef, node);
  }
  removeTreeNode(scopeRef) {
    if (scopeRef === null)
      return;
    let node = this.fastMap.get(scopeRef);
    if (!node)
      return;
    let parentNode = node.parent;
    for (let current of this.traverse())
      if (current !== node && node.nodeToRestore && current.nodeToRestore && node.scopeRef && node.scopeRef.current && $9bf71ea28793e738$var$isElementInScope(current.nodeToRestore, node.scopeRef.current))
        current.nodeToRestore = node.nodeToRestore;
    let children = node.children;
    if (parentNode) {
      parentNode.removeChild(node);
      if (children.size > 0)
        children.forEach((child) => parentNode && parentNode.addChild(child));
    }
    this.fastMap.delete(node.scopeRef);
  }
  // Pre Order Depth First
  *traverse(node = this.root) {
    if (node.scopeRef != null)
      yield node;
    if (node.children.size > 0)
      for (let child of node.children)
        yield* __yieldStar(this.traverse(child));
  }
  clone() {
    var _node_parent;
    let newTree = new _$9bf71ea28793e738$var$Tree();
    var _node_parent_scopeRef;
    for (let node of this.traverse())
      newTree.addTreeNode(node.scopeRef, (_node_parent_scopeRef = (_node_parent = node.parent) === null || _node_parent === void 0 ? void 0 : _node_parent.scopeRef) !== null && _node_parent_scopeRef !== void 0 ? _node_parent_scopeRef : null, node.nodeToRestore);
    return newTree;
  }
  constructor() {
    this.fastMap = /* @__PURE__ */ new Map();
    this.root = new $9bf71ea28793e738$var$TreeNode({
      scopeRef: null
    });
    this.fastMap.set(null, this.root);
  }
};
var $9bf71ea28793e738$var$TreeNode = class {
  addChild(node) {
    this.children.add(node);
    node.parent = this;
  }
  removeChild(node) {
    this.children.delete(node);
    node.parent = void 0;
  }
  constructor(props) {
    this.children = /* @__PURE__ */ new Set();
    this.contain = false;
    this.scopeRef = props.scopeRef;
  }
};
var $9bf71ea28793e738$export$d06fae2ee68b101e = new $9bf71ea28793e738$var$Tree();

// ../../node_modules/.pnpm/@react-aria+overlays@3.31.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/overlays/dist/useOverlay.mjs
import { useEffect as $jtpZv$useEffect } from "react";
var $a11501f3d1d39e6c$var$visibleOverlays = [];
function $a11501f3d1d39e6c$export$ea8f71083e90600f(props, ref) {
  let { onClose, shouldCloseOnBlur, isOpen, isDismissable = false, isKeyboardDismissDisabled = false, shouldCloseOnInteractOutside } = props;
  (0, $jtpZv$useEffect)(() => {
    if (isOpen && !$a11501f3d1d39e6c$var$visibleOverlays.includes(ref)) {
      $a11501f3d1d39e6c$var$visibleOverlays.push(ref);
      return () => {
        let index = $a11501f3d1d39e6c$var$visibleOverlays.indexOf(ref);
        if (index >= 0)
          $a11501f3d1d39e6c$var$visibleOverlays.splice(index, 1);
      };
    }
  }, [
    isOpen,
    ref
  ]);
  let onHide = () => {
    if ($a11501f3d1d39e6c$var$visibleOverlays[$a11501f3d1d39e6c$var$visibleOverlays.length - 1] === ref && onClose)
      onClose();
  };
  let onInteractOutsideStart = (e) => {
    if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target)) {
      if ($a11501f3d1d39e6c$var$visibleOverlays[$a11501f3d1d39e6c$var$visibleOverlays.length - 1] === ref) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  };
  let onInteractOutside = (e) => {
    if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target)) {
      if ($a11501f3d1d39e6c$var$visibleOverlays[$a11501f3d1d39e6c$var$visibleOverlays.length - 1] === ref) {
        e.stopPropagation();
        e.preventDefault();
      }
      onHide();
    }
  };
  let onKeyDown = (e) => {
    if (e.key === "Escape" && !isKeyboardDismissDisabled && !e.nativeEvent.isComposing) {
      e.stopPropagation();
      e.preventDefault();
      onHide();
    }
  };
  (0, $e0b6e0b68ec7f50f$export$872b660ac5a1ff98)({
    ref,
    onInteractOutside: isDismissable && isOpen ? onInteractOutside : void 0,
    onInteractOutsideStart
  });
  let { focusWithinProps } = (0, $9ab94262bd0047c7$export$420e68273165f4ec)({
    isDisabled: !shouldCloseOnBlur,
    onBlurWithin: (e) => {
      if (!e.relatedTarget || (0, $9bf71ea28793e738$export$1258395f99bf9cbf)(e.relatedTarget))
        return;
      if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.relatedTarget))
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }
  });
  let onPointerDownUnderlay = (e) => {
    if (e.target === e.currentTarget)
      e.preventDefault();
  };
  return {
    overlayProps: __spreadValues({
      onKeyDown
    }, focusWithinProps),
    underlayProps: {
      onPointerDown: onPointerDownUnderlay
    }
  };
}

// ../../node_modules/.pnpm/@react-aria+overlays@3.31.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/overlays/dist/usePreventScroll.mjs
var $49c51c25361d4cd2$var$visualViewport = typeof document !== "undefined" && window.visualViewport;
var $49c51c25361d4cd2$var$preventScrollCount = 0;
var $49c51c25361d4cd2$var$restore;
function $49c51c25361d4cd2$export$ee0f7cc6afcd1c18(options = {}) {
  let { isDisabled } = options;
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    if (isDisabled)
      return;
    $49c51c25361d4cd2$var$preventScrollCount++;
    if ($49c51c25361d4cd2$var$preventScrollCount === 1) {
      if ((0, $c87311424ea30a05$export$fedb369cb70207f1)())
        $49c51c25361d4cd2$var$restore = $49c51c25361d4cd2$var$preventScrollMobileSafari();
      else
        $49c51c25361d4cd2$var$restore = $49c51c25361d4cd2$var$preventScrollStandard();
    }
    return () => {
      $49c51c25361d4cd2$var$preventScrollCount--;
      if ($49c51c25361d4cd2$var$preventScrollCount === 0)
        $49c51c25361d4cd2$var$restore();
    };
  }, [
    isDisabled
  ]);
}
function $49c51c25361d4cd2$var$preventScrollStandard() {
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  return (0, $ff5963eb1fccf552$export$e08e3b67e392101e)(scrollbarWidth > 0 && // Use scrollbar-gutter when supported because it also works for fixed positioned elements.
  ("scrollbarGutter" in document.documentElement.style ? $49c51c25361d4cd2$var$setStyle(document.documentElement, "scrollbarGutter", "stable") : $49c51c25361d4cd2$var$setStyle(document.documentElement, "paddingRight", `${scrollbarWidth}px`)), $49c51c25361d4cd2$var$setStyle(document.documentElement, "overflow", "hidden"));
}
function $49c51c25361d4cd2$var$preventScrollMobileSafari() {
  let scrollable;
  let allowTouchMove = false;
  let onTouchStart = (e) => {
    let target = e.target;
    scrollable = (0, $cc38e7bd3fc7b213$export$2bb74740c4e19def)(target) ? target : (0, $62d8ded9296f3872$export$cfa2225e87938781)(target, true);
    allowTouchMove = false;
    let selection = target.ownerDocument.defaultView.getSelection();
    if (selection && !selection.isCollapsed && selection.containsNode(target, true))
      allowTouchMove = true;
    if ("selectionStart" in target && "selectionEnd" in target && target.selectionStart < target.selectionEnd && target.ownerDocument.activeElement === target)
      allowTouchMove = true;
  };
  let style = document.createElement("style");
  style.textContent = `
@layer {
  * {
    overscroll-behavior: contain;
  }
}`.trim();
  document.head.prepend(style);
  let onTouchMove = (e) => {
    if (e.touches.length === 2 || allowTouchMove)
      return;
    if (!scrollable || scrollable === document.documentElement || scrollable === document.body) {
      e.preventDefault();
      return;
    }
    if (scrollable.scrollHeight === scrollable.clientHeight && scrollable.scrollWidth === scrollable.clientWidth)
      e.preventDefault();
  };
  let onBlur = (e) => {
    let target = e.target;
    let relatedTarget = e.relatedTarget;
    if (relatedTarget && (0, $21f1aa98acb08317$export$c57958e35f31ed73)(relatedTarget)) {
      relatedTarget.focus({
        preventScroll: true
      });
      $49c51c25361d4cd2$var$scrollIntoViewWhenReady(relatedTarget, (0, $21f1aa98acb08317$export$c57958e35f31ed73)(target));
    } else if (!relatedTarget) {
      var _target_parentElement;
      let focusable = (_target_parentElement = target.parentElement) === null || _target_parentElement === void 0 ? void 0 : _target_parentElement.closest("[tabindex]");
      focusable === null || focusable === void 0 ? void 0 : focusable.focus({
        preventScroll: true
      });
    }
  };
  let focus = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function(opts) {
    let wasKeyboardVisible = document.activeElement != null && (0, $21f1aa98acb08317$export$c57958e35f31ed73)(document.activeElement);
    focus.call(this, __spreadProps(__spreadValues({}, opts), {
      preventScroll: true
    }));
    if (!opts || !opts.preventScroll)
      $49c51c25361d4cd2$var$scrollIntoViewWhenReady(this, wasKeyboardVisible);
  };
  let removeEvents = (0, $ff5963eb1fccf552$export$e08e3b67e392101e)($49c51c25361d4cd2$var$addEvent(document, "touchstart", onTouchStart, {
    passive: false,
    capture: true
  }), $49c51c25361d4cd2$var$addEvent(document, "touchmove", onTouchMove, {
    passive: false,
    capture: true
  }), $49c51c25361d4cd2$var$addEvent(document, "blur", onBlur, true));
  return () => {
    removeEvents();
    style.remove();
    HTMLElement.prototype.focus = focus;
  };
}
function $49c51c25361d4cd2$var$setStyle(element, style, value) {
  let cur = element.style[style];
  element.style[style] = value;
  return () => {
    element.style[style] = cur;
  };
}
function $49c51c25361d4cd2$var$addEvent(target, event, handler, options) {
  target.addEventListener(event, handler, options);
  return () => {
    target.removeEventListener(event, handler, options);
  };
}
function $49c51c25361d4cd2$var$scrollIntoViewWhenReady(target, wasKeyboardVisible) {
  if (wasKeyboardVisible || !$49c51c25361d4cd2$var$visualViewport)
    $49c51c25361d4cd2$var$scrollIntoView(target);
  else
    $49c51c25361d4cd2$var$visualViewport.addEventListener("resize", () => $49c51c25361d4cd2$var$scrollIntoView(target), {
      once: true
    });
}
function $49c51c25361d4cd2$var$scrollIntoView(target) {
  let root = document.scrollingElement || document.documentElement;
  let nextTarget = target;
  while (nextTarget && nextTarget !== root) {
    let scrollable = (0, $62d8ded9296f3872$export$cfa2225e87938781)(nextTarget);
    if (scrollable !== document.documentElement && scrollable !== document.body && scrollable !== nextTarget) {
      let scrollableRect = scrollable.getBoundingClientRect();
      let targetRect = nextTarget.getBoundingClientRect();
      if (targetRect.top < scrollableRect.top || targetRect.bottom > scrollableRect.top + nextTarget.clientHeight) {
        let bottom = scrollableRect.bottom;
        if ($49c51c25361d4cd2$var$visualViewport)
          bottom = Math.min(bottom, $49c51c25361d4cd2$var$visualViewport.offsetTop + $49c51c25361d4cd2$var$visualViewport.height);
        let adjustment = targetRect.top - scrollableRect.top - ((bottom - scrollableRect.top) / 2 - targetRect.height / 2);
        scrollable.scrollTo({
          // Clamp to the valid range to prevent over-scrolling.
          top: Math.max(0, Math.min(scrollable.scrollHeight - scrollable.clientHeight, scrollable.scrollTop + adjustment)),
          behavior: "smooth"
        });
      }
    }
    nextTarget = scrollable.parentElement;
  }
}

// ../../node_modules/.pnpm/@react-aria+overlays@3.31.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/overlays/dist/ariaHideOutside.mjs
var $5e3802645cc19319$var$supportsInert = typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype;
var $5e3802645cc19319$var$refCountMap = /* @__PURE__ */ new WeakMap();
var $5e3802645cc19319$var$observerStack = [];
function $5e3802645cc19319$export$1c3ebcada18427bf(targets, options) {
  let windowObj = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(targets === null || targets === void 0 ? void 0 : targets[0]);
  let opts = options instanceof windowObj.Element ? {
    root: options
  } : options;
  var _opts_root;
  let root = (_opts_root = opts === null || opts === void 0 ? void 0 : opts.root) !== null && _opts_root !== void 0 ? _opts_root : document.body;
  let shouldUseInert = (opts === null || opts === void 0 ? void 0 : opts.shouldUseInert) && $5e3802645cc19319$var$supportsInert;
  let visibleNodes = new Set(targets);
  let hiddenNodes = /* @__PURE__ */ new Set();
  let getHidden = (element) => {
    return shouldUseInert && element instanceof windowObj.HTMLElement ? element.inert : element.getAttribute("aria-hidden") === "true";
  };
  let setHidden = (element, hidden) => {
    if (shouldUseInert && element instanceof windowObj.HTMLElement)
      element.inert = hidden;
    else if (hidden)
      element.setAttribute("aria-hidden", "true");
    else {
      element.removeAttribute("aria-hidden");
      if (element instanceof windowObj.HTMLElement)
        element.inert = false;
    }
  };
  let walk = (root2) => {
    for (let element of root2.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]"))
      visibleNodes.add(element);
    let acceptNode = (node) => {
      if (hiddenNodes.has(node) || visibleNodes.has(node) || node.parentElement && hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute("role") !== "row")
        return NodeFilter.FILTER_REJECT;
      for (let target of visibleNodes) {
        if (node.contains(target))
          return NodeFilter.FILTER_SKIP;
      }
      return NodeFilter.FILTER_ACCEPT;
    };
    let walker = document.createTreeWalker(root2, NodeFilter.SHOW_ELEMENT, {
      acceptNode
    });
    let acceptRoot = acceptNode(root2);
    if (acceptRoot === NodeFilter.FILTER_ACCEPT)
      hide(root2);
    if (acceptRoot !== NodeFilter.FILTER_REJECT) {
      let node = walker.nextNode();
      while (node != null) {
        hide(node);
        node = walker.nextNode();
      }
    }
  };
  let hide = (node) => {
    var _refCountMap_get;
    let refCount = (_refCountMap_get = $5e3802645cc19319$var$refCountMap.get(node)) !== null && _refCountMap_get !== void 0 ? _refCountMap_get : 0;
    if (getHidden(node) && refCount === 0)
      return;
    if (refCount === 0)
      setHidden(node, true);
    hiddenNodes.add(node);
    $5e3802645cc19319$var$refCountMap.set(node, refCount + 1);
  };
  if ($5e3802645cc19319$var$observerStack.length)
    $5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length - 1].disconnect();
  walk(root);
  let observer = new MutationObserver((changes) => {
    for (let change of changes) {
      if (change.type !== "childList")
        continue;
      if (![
        ...visibleNodes,
        ...hiddenNodes
      ].some((node) => node.contains(change.target)))
        for (let node of change.addedNodes) {
          if ((node instanceof HTMLElement || node instanceof SVGElement) && (node.dataset.liveAnnouncer === "true" || node.dataset.reactAriaTopLayer === "true"))
            visibleNodes.add(node);
          else if (node instanceof Element)
            walk(node);
        }
    }
  });
  observer.observe(root, {
    childList: true,
    subtree: true
  });
  let observerWrapper = {
    visibleNodes,
    hiddenNodes,
    observe() {
      observer.observe(root, {
        childList: true,
        subtree: true
      });
    },
    disconnect() {
      observer.disconnect();
    }
  };
  $5e3802645cc19319$var$observerStack.push(observerWrapper);
  return () => {
    observer.disconnect();
    for (let node of hiddenNodes) {
      let count = $5e3802645cc19319$var$refCountMap.get(node);
      if (count == null)
        continue;
      if (count === 1) {
        setHidden(node, false);
        $5e3802645cc19319$var$refCountMap.delete(node);
      } else
        $5e3802645cc19319$var$refCountMap.set(node, count - 1);
    }
    if (observerWrapper === $5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length - 1]) {
      $5e3802645cc19319$var$observerStack.pop();
      if ($5e3802645cc19319$var$observerStack.length)
        $5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length - 1].observe();
    } else
      $5e3802645cc19319$var$observerStack.splice($5e3802645cc19319$var$observerStack.indexOf(observerWrapper), 1);
  };
}

// ../../node_modules/.pnpm/@react-aria+overlays@3.31.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/overlays/dist/Overlay.mjs
import $1CM7W$react, { useState as $1CM7W$useState, useMemo as $1CM7W$useMemo, useContext as $1CM7W$useContext } from "react";
import $1CM7W$reactdom from "react-dom";
var $337b884510726a0d$export$a2200b96afd16271 = /* @__PURE__ */ (0, $1CM7W$react).createContext(null);
function $337b884510726a0d$export$14c98a7594375490() {
  let ctx = (0, $1CM7W$useContext)($337b884510726a0d$export$a2200b96afd16271);
  let setContain = ctx === null || ctx === void 0 ? void 0 : ctx.setContain;
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    setContain === null || setContain === void 0 ? void 0 : setContain(true);
  }, [
    setContain
  ]);
}

// ../../node_modules/.pnpm/@react-aria+overlays@3.31.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/overlays/dist/useModalOverlay.mjs
import { useEffect as $7Dhkr$useEffect } from "react";
function $8ac8429251c45e4b$export$dbc0f175b25fb0fb(props, state, ref) {
  let { overlayProps, underlayProps } = (0, $a11501f3d1d39e6c$export$ea8f71083e90600f)(__spreadProps(__spreadValues({}, props), {
    isOpen: state.isOpen,
    onClose: state.close
  }), ref);
  (0, $49c51c25361d4cd2$export$ee0f7cc6afcd1c18)({
    isDisabled: !state.isOpen
  });
  (0, $337b884510726a0d$export$14c98a7594375490)();
  (0, $7Dhkr$useEffect)(() => {
    if (state.isOpen && ref.current)
      return (0, $5e3802645cc19319$export$1c3ebcada18427bf)([
        ref.current
      ], {
        shouldUseInert: true
      });
  }, [
    state.isOpen,
    ref
  ]);
  return {
    modalProps: (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(overlayProps),
    underlayProps
  };
}

// ../../node_modules/.pnpm/@react-stately+overlays@3.6.21_react@19.2.1/node_modules/@react-stately/overlays/dist/useOverlayTriggerState.mjs
import { useCallback as $hnMvi$useCallback } from "react";
function $fc909762b330b746$export$61c6a8c84e605fb6(props) {
  let [isOpen, setOpen] = (0, $458b0a5536c1a7cf$export$40bfa8c7b0832715)(props.isOpen, props.defaultOpen || false, props.onOpenChange);
  const open = (0, $hnMvi$useCallback)(() => {
    setOpen(true);
  }, [
    setOpen
  ]);
  const close = (0, $hnMvi$useCallback)(() => {
    setOpen(false);
  }, [
    setOpen
  ]);
  const toggle = (0, $hnMvi$useCallback)(() => {
    setOpen(!isOpen);
  }, [
    setOpen,
    isOpen
  ]);
  return {
    isOpen,
    setOpen,
    open,
    close,
    toggle
  };
}

// ../../node_modules/.pnpm/@react-aria+dialog@3.5.32_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/dialog/dist/useDialog.mjs
import { useRef as $i6df2$useRef, useEffect as $i6df2$useEffect } from "react";
function $40df3f8667284809$export$d55e7ee900f34e93(props, ref) {
  let { role = "dialog" } = props;
  let titleId = (0, $bdb11010cef70236$export$b4cc09c592e8fdb8)();
  titleId = props["aria-label"] ? void 0 : titleId;
  let isRefocusing = (0, $i6df2$useRef)(false);
  (0, $i6df2$useEffect)(() => {
    if (ref.current && !ref.current.contains(document.activeElement)) {
      (0, $3ad3f6e1647bc98d$export$80f3e147d781571c)(ref.current);
      let timeout = setTimeout(() => {
        if (document.activeElement === ref.current || document.activeElement === document.body) {
          isRefocusing.current = true;
          if (ref.current) {
            ref.current.blur();
            (0, $3ad3f6e1647bc98d$export$80f3e147d781571c)(ref.current);
          }
          isRefocusing.current = false;
        }
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [
    ref
  ]);
  (0, $337b884510726a0d$export$14c98a7594375490)();
  return {
    dialogProps: __spreadProps(__spreadValues({}, (0, $65484d02dcb7eb3e$export$457c3d6518dd4c6f)(props, {
      labelable: true
    })), {
      role,
      tabIndex: -1,
      "aria-labelledby": props["aria-labelledby"] || titleId,
      // Prevent blur events from reaching useOverlay, which may cause
      // popovers to close. Since focus is contained within the dialog,
      // we don't want this to occur due to the above useEffect.
      onBlur: (e) => {
        if (isRefocusing.current)
          e.stopPropagation();
      }
    }),
    titleProps: {
      id: titleId
    }
  };
}

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/ar-AE.mjs
var $03c9a1a10de12f06$exports = {};
$03c9a1a10de12f06$exports = {
  "Clear search": `\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/bg-BG.mjs
var $4da0c2ffa4ba4159$exports = {};
$4da0c2ffa4ba4159$exports = {
  "Clear search": `\u0418\u0437\u0447\u0438\u0441\u0442\u0432\u0430\u043D\u0435 \u043D\u0430 \u0442\u044A\u0440\u0441\u0435\u043D\u0435`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/cs-CZ.mjs
var $8c59fd0c2c96821b$exports = {};
$8c59fd0c2c96821b$exports = {
  "Clear search": `Vymazat hled\xE1n\xED`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/da-DK.mjs
var $0a371f9c1df8120f$exports = {};
$0a371f9c1df8120f$exports = {
  "Clear search": `Ryd s\xF8gning`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/de-DE.mjs
var $67f4d0b0de9f8a52$exports = {};
$67f4d0b0de9f8a52$exports = {
  "Clear search": `Suche zur\xFCcksetzen`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/el-GR.mjs
var $72a312d948f0214b$exports = {};
$72a312d948f0214b$exports = {
  "Clear search": `\u0391\u03C0\u03B1\u03BB\u03BF\u03B9\u03C6\u03AE \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7\u03C2`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/en-US.mjs
var $5012d21d933388c1$exports = {};
$5012d21d933388c1$exports = {
  "Clear search": `Clear search`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/es-ES.mjs
var $0159854399308e2e$exports = {};
$0159854399308e2e$exports = {
  "Clear search": `Borrar b\xFAsqueda`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/et-EE.mjs
var $390613981d970276$exports = {};
$390613981d970276$exports = {
  "Clear search": `T\xFChjenda otsing`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/fi-FI.mjs
var $961ae0833f811705$exports = {};
$961ae0833f811705$exports = {
  "Clear search": `Tyhjenn\xE4 haku`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/fr-FR.mjs
var $26d76742decfd829$exports = {};
$26d76742decfd829$exports = {
  "Clear search": `Effacer la recherche`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/he-IL.mjs
var $92ef254c82a5c769$exports = {};
$92ef254c82a5c769$exports = {
  "Clear search": `\u05E0\u05E7\u05D4 \u05D7\u05D9\u05E4\u05D5\u05E9`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/hr-HR.mjs
var $e0321b43bdefb8b3$exports = {};
$e0321b43bdefb8b3$exports = {
  "Clear search": `Obri\u0161i pretragu`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/hu-HU.mjs
var $0c1ee0b8d50940d9$exports = {};
$0c1ee0b8d50940d9$exports = {
  "Clear search": `Keres\xE9s t\xF6rl\xE9se`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/it-IT.mjs
var $b09198915a38946f$exports = {};
$b09198915a38946f$exports = {
  "Clear search": `Cancella ricerca`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/ja-JP.mjs
var $3a9a3d180c3145c0$exports = {};
$3a9a3d180c3145c0$exports = {
  "Clear search": `\u691C\u7D22\u3092\u30AF\u30EA\u30A2`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/ko-KR.mjs
var $b7a611726449f4a3$exports = {};
$b7a611726449f4a3$exports = {
  "Clear search": `\uAC80\uC0C9 \uC9C0\uC6B0\uAE30`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/lt-LT.mjs
var $d9a3d49db610dd5c$exports = {};
$d9a3d49db610dd5c$exports = {
  "Clear search": `I\u0161valyti ie\u0161k\u0105`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/lv-LV.mjs
var $3ab64b73ea27c23a$exports = {};
$3ab64b73ea27c23a$exports = {
  "Clear search": `Not\u012Br\u012Bt mekl\u0113\u0161anu`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/nb-NO.mjs
var $bf5cce1b47d23baf$exports = {};
$bf5cce1b47d23baf$exports = {
  "Clear search": `T\xF8m s\xF8k`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/nl-NL.mjs
var $4e0c9a9a010e4598$exports = {};
$4e0c9a9a010e4598$exports = {
  "Clear search": `Zoekactie wissen`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/pl-PL.mjs
var $63cf4a75ec270508$exports = {};
$63cf4a75ec270508$exports = {
  "Clear search": `Wyczy\u015B\u0107 zawarto\u015B\u0107 wyszukiwania`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/pt-BR.mjs
var $083b0cad27fdbd06$exports = {};
$083b0cad27fdbd06$exports = {
  "Clear search": `Limpar pesquisa`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/pt-PT.mjs
var $1b7f0864d830ba6d$exports = {};
$1b7f0864d830ba6d$exports = {
  "Clear search": `Limpar pesquisa`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/ro-RO.mjs
var $d6d2588377fc9718$exports = {};
$d6d2588377fc9718$exports = {
  "Clear search": `\u015Eterge\u0163i c\u0103utarea`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/ru-RU.mjs
var $701c918a4653e946$exports = {};
$701c918a4653e946$exports = {
  "Clear search": `\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/sk-SK.mjs
var $7cacc29a1e5f4fbe$exports = {};
$7cacc29a1e5f4fbe$exports = {
  "Clear search": `Vymaza\u0165 vyh\u013Ead\xE1vanie`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/sl-SI.mjs
var $c63231bcc300d0df$exports = {};
$c63231bcc300d0df$exports = {
  "Clear search": `Po\u010Disti iskanje`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/sr-SP.mjs
var $b61510478bc0e6f6$exports = {};
$b61510478bc0e6f6$exports = {
  "Clear search": `Obri\u0161i pretragu`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/sv-SE.mjs
var $ce325e6dd3f9c37a$exports = {};
$ce325e6dd3f9c37a$exports = {
  "Clear search": `Rensa s\xF6kning`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/tr-TR.mjs
var $1f7e1cf2285af2b2$exports = {};
$1f7e1cf2285af2b2$exports = {
  "Clear search": `Aramay\u0131 temizle`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/uk-UA.mjs
var $2d999353ca652e34$exports = {};
$2d999353ca652e34$exports = {
  "Clear search": `\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043F\u043E\u0448\u0443\u043A`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/zh-CN.mjs
var $117b536bfb1ae554$exports = {};
$117b536bfb1ae554$exports = {
  "Clear search": `\u6E05\u9664\u641C\u7D22`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/zh-TW.mjs
var $525f6fa4ac26e278$exports = {};
$525f6fa4ac26e278$exports = {
  "Clear search": `\u6E05\u9664\u641C\u5C0B\u689D\u4EF6`
};

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/intlStrings.mjs
var $8112f8b883c0272d$exports = {};
$8112f8b883c0272d$exports = {
  "ar-AE": $03c9a1a10de12f06$exports,
  "bg-BG": $4da0c2ffa4ba4159$exports,
  "cs-CZ": $8c59fd0c2c96821b$exports,
  "da-DK": $0a371f9c1df8120f$exports,
  "de-DE": $67f4d0b0de9f8a52$exports,
  "el-GR": $72a312d948f0214b$exports,
  "en-US": $5012d21d933388c1$exports,
  "es-ES": $0159854399308e2e$exports,
  "et-EE": $390613981d970276$exports,
  "fi-FI": $961ae0833f811705$exports,
  "fr-FR": $26d76742decfd829$exports,
  "he-IL": $92ef254c82a5c769$exports,
  "hr-HR": $e0321b43bdefb8b3$exports,
  "hu-HU": $0c1ee0b8d50940d9$exports,
  "it-IT": $b09198915a38946f$exports,
  "ja-JP": $3a9a3d180c3145c0$exports,
  "ko-KR": $b7a611726449f4a3$exports,
  "lt-LT": $d9a3d49db610dd5c$exports,
  "lv-LV": $3ab64b73ea27c23a$exports,
  "nb-NO": $bf5cce1b47d23baf$exports,
  "nl-NL": $4e0c9a9a010e4598$exports,
  "pl-PL": $63cf4a75ec270508$exports,
  "pt-BR": $083b0cad27fdbd06$exports,
  "pt-PT": $1b7f0864d830ba6d$exports,
  "ro-RO": $d6d2588377fc9718$exports,
  "ru-RU": $701c918a4653e946$exports,
  "sk-SK": $7cacc29a1e5f4fbe$exports,
  "sl-SI": $c63231bcc300d0df$exports,
  "sr-SP": $b61510478bc0e6f6$exports,
  "sv-SE": $ce325e6dd3f9c37a$exports,
  "tr-TR": $1f7e1cf2285af2b2$exports,
  "uk-UA": $2d999353ca652e34$exports,
  "zh-CN": $117b536bfb1ae554$exports,
  "zh-TW": $525f6fa4ac26e278$exports
};

// ../../node_modules/.pnpm/@react-aria+textfield@3.18.3_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/textfield/dist/useTextField.mjs
import $ig234$react, { useState as $ig234$useState } from "react";

// ../../node_modules/.pnpm/@react-aria+label@3.7.23_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/label/dist/useLabel.mjs
function $d191a55c9702f145$export$8467354a121f1b9f(props) {
  let { id, label, "aria-labelledby": ariaLabelledby, "aria-label": ariaLabel, labelElementType = "label" } = props;
  id = (0, $bdb11010cef70236$export$f680877a34711e37)(id);
  let labelId = (0, $bdb11010cef70236$export$f680877a34711e37)();
  let labelProps = {};
  if (label) {
    ariaLabelledby = ariaLabelledby ? `${labelId} ${ariaLabelledby}` : labelId;
    labelProps = {
      id: labelId,
      htmlFor: labelElementType === "label" ? id : void 0
    };
  } else if (!ariaLabelledby && !ariaLabel && true)
    console.warn("If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility");
  let fieldProps = (0, $313b98861ee5dd6c$export$d6875122194c7b44)({
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby
  });
  return {
    labelProps,
    fieldProps
  };
}

// ../../node_modules/.pnpm/@react-aria+label@3.7.23_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/label/dist/useField.mjs
function $2baaea4c71418dea$export$294aa081a6c6f55d(props) {
  let { description, errorMessage, isInvalid, validationState } = props;
  let { labelProps, fieldProps } = (0, $d191a55c9702f145$export$8467354a121f1b9f)(props);
  let descriptionId = (0, $bdb11010cef70236$export$b4cc09c592e8fdb8)([
    Boolean(description),
    Boolean(errorMessage),
    isInvalid,
    validationState
  ]);
  let errorMessageId = (0, $bdb11010cef70236$export$b4cc09c592e8fdb8)([
    Boolean(description),
    Boolean(errorMessage),
    isInvalid,
    validationState
  ]);
  fieldProps = (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(fieldProps, {
    "aria-describedby": [
      descriptionId,
      // Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA. See https://github.com/adobe/react-spectrum/issues/1346#issuecomment-740136268
      errorMessageId,
      props["aria-describedby"]
    ].filter(Boolean).join(" ") || void 0
  });
  return {
    labelProps,
    fieldProps,
    descriptionProps: {
      id: descriptionId
    },
    errorMessageProps: {
      id: errorMessageId
    }
  };
}

// ../../node_modules/.pnpm/@react-aria+form@3.1.3_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/form/dist/useFormValidation.mjs
import { useRef as $9Gacy$useRef, useEffect as $9Gacy$useEffect } from "react";
function $e93e671b31057976$export$b8473d3665f3a75a(props, state, ref) {
  let { validationBehavior, focus } = props;
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    if (validationBehavior === "native" && (ref === null || ref === void 0 ? void 0 : ref.current) && !ref.current.disabled) {
      let errorMessage = state.realtimeValidation.isInvalid ? state.realtimeValidation.validationErrors.join(" ") || "Invalid value." : "";
      ref.current.setCustomValidity(errorMessage);
      if (!ref.current.hasAttribute("title"))
        ref.current.title = "";
      if (!state.realtimeValidation.isInvalid)
        state.updateValidation($e93e671b31057976$var$getNativeValidity(ref.current));
    }
  });
  let isIgnoredReset = (0, $9Gacy$useRef)(false);
  let onReset = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(() => {
    if (!isIgnoredReset.current)
      state.resetValidation();
  });
  let onInvalid = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e) => {
    var _ref_current;
    if (!state.displayValidation.isInvalid)
      state.commitValidation();
    let form = ref === null || ref === void 0 ? void 0 : (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.form;
    if (!e.defaultPrevented && ref && form && $e93e671b31057976$var$getFirstInvalidInput(form) === ref.current) {
      var _ref_current1;
      if (focus)
        focus();
      else
        (_ref_current1 = ref.current) === null || _ref_current1 === void 0 ? void 0 : _ref_current1.focus();
      (0, $507fabe10e71c6fb$export$8397ddfc504fdb9a)("keyboard");
    }
    e.preventDefault();
  });
  let onChange = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(() => {
    state.commitValidation();
  });
  (0, $9Gacy$useEffect)(() => {
    let input = ref === null || ref === void 0 ? void 0 : ref.current;
    if (!input)
      return;
    let form = input.form;
    let reset = form === null || form === void 0 ? void 0 : form.reset;
    if (form)
      form.reset = () => {
        isIgnoredReset.current = !window.event || window.event.type === "message" && window.event.target instanceof MessagePort;
        reset === null || reset === void 0 ? void 0 : reset.call(form);
        isIgnoredReset.current = false;
      };
    input.addEventListener("invalid", onInvalid);
    input.addEventListener("change", onChange);
    form === null || form === void 0 ? void 0 : form.addEventListener("reset", onReset);
    return () => {
      input.removeEventListener("invalid", onInvalid);
      input.removeEventListener("change", onChange);
      form === null || form === void 0 ? void 0 : form.removeEventListener("reset", onReset);
      if (form)
        form.reset = reset;
    };
  }, [
    ref,
    validationBehavior
  ]);
}
function $e93e671b31057976$var$getValidity(input) {
  let validity = input.validity;
  return {
    badInput: validity.badInput,
    customError: validity.customError,
    patternMismatch: validity.patternMismatch,
    rangeOverflow: validity.rangeOverflow,
    rangeUnderflow: validity.rangeUnderflow,
    stepMismatch: validity.stepMismatch,
    tooLong: validity.tooLong,
    tooShort: validity.tooShort,
    typeMismatch: validity.typeMismatch,
    valueMissing: validity.valueMissing,
    valid: validity.valid
  };
}
function $e93e671b31057976$var$getNativeValidity(input) {
  return {
    isInvalid: !input.validity.valid,
    validationDetails: $e93e671b31057976$var$getValidity(input),
    validationErrors: input.validationMessage ? [
      input.validationMessage
    ] : []
  };
}
function $e93e671b31057976$var$getFirstInvalidInput(form) {
  for (let i = 0; i < form.elements.length; i++) {
    let element = form.elements[i];
    if (!element.validity.valid)
      return element;
  }
  return null;
}

// ../../node_modules/.pnpm/@react-stately+form@3.2.2_react@19.2.1/node_modules/@react-stately/form/dist/useFormValidationState.mjs
import { createContext as $69F46$createContext, useMemo as $69F46$useMemo, useContext as $69F46$useContext, useState as $69F46$useState, useRef as $69F46$useRef, useEffect as $69F46$useEffect } from "react";
var $e5be200c675c3b3a$export$aca958c65c314e6c = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  valid: true
};
var $e5be200c675c3b3a$var$CUSTOM_VALIDITY_STATE = __spreadProps(__spreadValues({}, $e5be200c675c3b3a$export$aca958c65c314e6c), {
  customError: true,
  valid: false
});
var $e5be200c675c3b3a$export$dad6ae84456c676a = {
  isInvalid: false,
  validationDetails: $e5be200c675c3b3a$export$aca958c65c314e6c,
  validationErrors: []
};
var $e5be200c675c3b3a$export$571b5131b7e65c11 = (0, $69F46$createContext)({});
var $e5be200c675c3b3a$export$a763b9476acd3eb = "__formValidationState" + Date.now();
function $e5be200c675c3b3a$export$fc1a364ae1f3ff10(props) {
  if (props[$e5be200c675c3b3a$export$a763b9476acd3eb]) {
    let { realtimeValidation, displayValidation, updateValidation, resetValidation, commitValidation } = props[$e5be200c675c3b3a$export$a763b9476acd3eb];
    return {
      realtimeValidation,
      displayValidation,
      updateValidation,
      resetValidation,
      commitValidation
    };
  }
  return $e5be200c675c3b3a$var$useFormValidationStateImpl(props);
}
function $e5be200c675c3b3a$var$useFormValidationStateImpl(props) {
  let { isInvalid, validationState, name, value, builtinValidation, validate, validationBehavior = "aria" } = props;
  if (validationState)
    isInvalid || (isInvalid = validationState === "invalid");
  let controlledError = isInvalid !== void 0 ? {
    isInvalid,
    validationErrors: [],
    validationDetails: $e5be200c675c3b3a$var$CUSTOM_VALIDITY_STATE
  } : null;
  let clientError = (0, $69F46$useMemo)(() => {
    if (!validate || value == null)
      return null;
    let validateErrors = $e5be200c675c3b3a$var$runValidate(validate, value);
    return $e5be200c675c3b3a$var$getValidationResult(validateErrors);
  }, [
    validate,
    value
  ]);
  if (builtinValidation === null || builtinValidation === void 0 ? void 0 : builtinValidation.validationDetails.valid)
    builtinValidation = void 0;
  let serverErrors = (0, $69F46$useContext)($e5be200c675c3b3a$export$571b5131b7e65c11);
  let serverErrorMessages = (0, $69F46$useMemo)(() => {
    if (name)
      return Array.isArray(name) ? name.flatMap((name2) => $e5be200c675c3b3a$var$asArray(serverErrors[name2])) : $e5be200c675c3b3a$var$asArray(serverErrors[name]);
    return [];
  }, [
    serverErrors,
    name
  ]);
  let [lastServerErrors, setLastServerErrors] = (0, $69F46$useState)(serverErrors);
  let [isServerErrorCleared, setServerErrorCleared] = (0, $69F46$useState)(false);
  if (serverErrors !== lastServerErrors) {
    setLastServerErrors(serverErrors);
    setServerErrorCleared(false);
  }
  let serverError = (0, $69F46$useMemo)(() => $e5be200c675c3b3a$var$getValidationResult(isServerErrorCleared ? [] : serverErrorMessages), [
    isServerErrorCleared,
    serverErrorMessages
  ]);
  let nextValidation = (0, $69F46$useRef)($e5be200c675c3b3a$export$dad6ae84456c676a);
  let [currentValidity, setCurrentValidity] = (0, $69F46$useState)($e5be200c675c3b3a$export$dad6ae84456c676a);
  let lastError = (0, $69F46$useRef)($e5be200c675c3b3a$export$dad6ae84456c676a);
  let commitValidation = () => {
    if (!commitQueued)
      return;
    setCommitQueued(false);
    let error = clientError || builtinValidation || nextValidation.current;
    if (!$e5be200c675c3b3a$var$isEqualValidation(error, lastError.current)) {
      lastError.current = error;
      setCurrentValidity(error);
    }
  };
  let [commitQueued, setCommitQueued] = (0, $69F46$useState)(false);
  (0, $69F46$useEffect)(commitValidation);
  let realtimeValidation = controlledError || serverError || clientError || builtinValidation || $e5be200c675c3b3a$export$dad6ae84456c676a;
  let displayValidation = validationBehavior === "native" ? controlledError || serverError || currentValidity : controlledError || serverError || clientError || builtinValidation || currentValidity;
  return {
    realtimeValidation,
    displayValidation,
    updateValidation(value2) {
      if (validationBehavior === "aria" && !$e5be200c675c3b3a$var$isEqualValidation(currentValidity, value2))
        setCurrentValidity(value2);
      else
        nextValidation.current = value2;
    },
    resetValidation() {
      let error = $e5be200c675c3b3a$export$dad6ae84456c676a;
      if (!$e5be200c675c3b3a$var$isEqualValidation(error, lastError.current)) {
        lastError.current = error;
        setCurrentValidity(error);
      }
      if (validationBehavior === "native")
        setCommitQueued(false);
      setServerErrorCleared(true);
    },
    commitValidation() {
      if (validationBehavior === "native")
        setCommitQueued(true);
      setServerErrorCleared(true);
    }
  };
}
function $e5be200c675c3b3a$var$asArray(v) {
  if (!v)
    return [];
  return Array.isArray(v) ? v : [
    v
  ];
}
function $e5be200c675c3b3a$var$runValidate(validate, value) {
  if (typeof validate === "function") {
    let e = validate(value);
    if (e && typeof e !== "boolean")
      return $e5be200c675c3b3a$var$asArray(e);
  }
  return [];
}
function $e5be200c675c3b3a$var$getValidationResult(errors) {
  return errors.length ? {
    isInvalid: true,
    validationErrors: errors,
    validationDetails: $e5be200c675c3b3a$var$CUSTOM_VALIDITY_STATE
  } : null;
}
function $e5be200c675c3b3a$var$isEqualValidation(a, b) {
  if (a === b)
    return true;
  return !!a && !!b && a.isInvalid === b.isInvalid && a.validationErrors.length === b.validationErrors.length && a.validationErrors.every((a2, i) => a2 === b.validationErrors[i]) && Object.entries(a.validationDetails).every(([k, v]) => b.validationDetails[k] === v);
}

// ../../node_modules/.pnpm/@react-aria+textfield@3.18.3_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/textfield/dist/useTextField.mjs
function $2d73ec29415bd339$export$712718f7aec83d5(props, ref) {
  let { inputElementType = "input", isDisabled = false, isRequired = false, isReadOnly = false, type = "text", validationBehavior = "aria" } = props;
  let [value, setValue] = (0, $458b0a5536c1a7cf$export$40bfa8c7b0832715)(props.value, props.defaultValue || "", props.onChange);
  let { focusableProps } = (0, $f645667febf57a63$export$4c014de7c8940b4c)(props, ref);
  let validationState = (0, $e5be200c675c3b3a$export$fc1a364ae1f3ff10)(__spreadProps(__spreadValues({}, props), {
    value
  }));
  let { isInvalid, validationErrors, validationDetails } = validationState.displayValidation;
  let { labelProps, fieldProps, descriptionProps, errorMessageProps } = (0, $2baaea4c71418dea$export$294aa081a6c6f55d)(__spreadProps(__spreadValues({}, props), {
    isInvalid,
    errorMessage: props.errorMessage || validationErrors
  }));
  let domProps = (0, $65484d02dcb7eb3e$export$457c3d6518dd4c6f)(props, {
    labelable: true
  });
  const inputOnlyProps = {
    type,
    pattern: props.pattern
  };
  let [initialValue] = (0, $ig234$useState)(value);
  var _props_defaultValue;
  (0, $99facab73266f662$export$5add1d006293d136)(ref, (_props_defaultValue = props.defaultValue) !== null && _props_defaultValue !== void 0 ? _props_defaultValue : initialValue, setValue);
  (0, $e93e671b31057976$export$b8473d3665f3a75a)(props, validationState, ref);
  return {
    labelProps,
    inputProps: (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(domProps, inputElementType === "input" ? inputOnlyProps : void 0, __spreadValues(__spreadValues({
      disabled: isDisabled,
      readOnly: isReadOnly,
      required: isRequired && validationBehavior === "native",
      "aria-required": isRequired && validationBehavior === "aria" || void 0,
      "aria-invalid": isInvalid || void 0,
      "aria-errormessage": props["aria-errormessage"],
      "aria-activedescendant": props["aria-activedescendant"],
      "aria-autocomplete": props["aria-autocomplete"],
      "aria-haspopup": props["aria-haspopup"],
      "aria-controls": props["aria-controls"],
      value,
      onChange: (e) => setValue(e.target.value),
      autoComplete: props.autoComplete,
      autoCapitalize: props.autoCapitalize,
      maxLength: props.maxLength,
      minLength: props.minLength,
      name: props.name,
      form: props.form,
      placeholder: props.placeholder,
      inputMode: props.inputMode,
      autoCorrect: props.autoCorrect,
      spellCheck: props.spellCheck,
      [parseInt((0, $ig234$react).version, 10) >= 17 ? "enterKeyHint" : "enterkeyhint"]: props.enterKeyHint,
      // Clipboard events
      onCopy: props.onCopy,
      onCut: props.onCut,
      onPaste: props.onPaste,
      // Composition events
      onCompositionEnd: props.onCompositionEnd,
      onCompositionStart: props.onCompositionStart,
      onCompositionUpdate: props.onCompositionUpdate,
      // Selection events
      onSelect: props.onSelect,
      // Input events
      onBeforeInput: props.onBeforeInput,
      onInput: props.onInput
    }, focusableProps), fieldProps)),
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
    validationDetails
  };
}

// ../../node_modules/.pnpm/@react-aria+searchfield@3.8.10_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/@react-aria/searchfield/dist/useSearchField.mjs
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $4d52238874b24f86$export$9bb30bbe003b82e0(props, state, inputRef) {
  let stringFormatter = (0, $fca6afa0e843324b$export$f12b703ca79dfbb1)((0, $parcel$interopDefault($8112f8b883c0272d$exports)), "@react-aria/searchfield");
  let { isDisabled, isReadOnly, onSubmit, onClear, type = "search" } = props;
  let onKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter" && (isDisabled || isReadOnly))
      e.preventDefault();
    if (isDisabled || isReadOnly)
      return;
    if (key === "Enter" && onSubmit) {
      e.preventDefault();
      onSubmit(state.value);
    }
    if (key === "Escape") {
      if (state.value === "" && (!inputRef.current || inputRef.current.value === ""))
        e.continuePropagation();
      else {
        e.preventDefault();
        state.setValue("");
        if (onClear)
          onClear();
      }
    }
  };
  let onClearButtonClick = () => {
    state.setValue("");
    if (onClear)
      onClear();
  };
  let onPressStart = () => {
    var _inputRef_current;
    (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
  };
  let _a = (0, $2d73ec29415bd339$export$712718f7aec83d5)(__spreadProps(__spreadValues({}, props), {
    value: state.value,
    onChange: state.setValue,
    onKeyDown: !isReadOnly ? (0, $ff5963eb1fccf552$export$e08e3b67e392101e)(onKeyDown, props.onKeyDown) : props.onKeyDown,
    type
  }), inputRef), { labelProps, inputProps, descriptionProps, errorMessageProps } = _a, validation = __objRest(_a, ["labelProps", "inputProps", "descriptionProps", "errorMessageProps"]);
  return __spreadValues({
    labelProps,
    inputProps: __spreadProps(__spreadValues({}, inputProps), {
      // already handled by useSearchFieldState
      defaultValue: void 0
    }),
    clearButtonProps: {
      "aria-label": stringFormatter.format("Clear search"),
      excludeFromTabOrder: true,
      preventFocusOnPress: true,
      isDisabled: isDisabled || isReadOnly,
      onPress: onClearButtonClick,
      onPressStart
    },
    descriptionProps,
    errorMessageProps
  }, validation);
}

// ../../node_modules/.pnpm/@react-stately+searchfield@3.5.17_react@19.2.1/node_modules/@react-stately/searchfield/dist/useSearchFieldState.mjs
function $0b2218c4e3fe7d7e$export$3f8be18b0f41eaf2(props) {
  let [value, setValue] = (0, $458b0a5536c1a7cf$export$40bfa8c7b0832715)($0b2218c4e3fe7d7e$var$toString(props.value), $0b2218c4e3fe7d7e$var$toString(props.defaultValue) || "", props.onChange);
  return {
    value,
    setValue
  };
}
function $0b2218c4e3fe7d7e$var$toString(val) {
  if (val == null)
    return;
  return val.toString();
}

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/CommandPalette/CommandPalette.tsx
import { FaMagnifyingGlass } from "react-icons/fa6";

// src/components/Card/Card.tsx
import React from "react";

// src/components/Card/Card.module.css
var Card_default = {};

// src/components/Card/Card.tsx
import { jsx } from "react/jsx-runtime";
var CardRoot = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx(
      "div",
      __spreadValues({
        ref,
        className: cn(Card_default.card, className)
      }, props)
    );
  }
);
CardRoot.displayName = "Card";
var CardHeader = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx(
      "div",
      __spreadValues({
        ref,
        className: cn(Card_default.header, className)
      }, props)
    );
  }
);
CardHeader.displayName = "Card.Header";
var CardBody = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx(
      "div",
      __spreadValues({
        ref,
        className: cn(Card_default.body, className)
      }, props)
    );
  }
);
CardBody.displayName = "Card.Body";
var CardFooter = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx(
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

// src/components/Badge/Badge.tsx
import * as React2 from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";

// src/components/Badge/Badge.module.css
var Badge_default = {};

// src/components/Badge/Badge.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var variantMap = {
  default: Badge_default["default"],
  success: Badge_default["success"],
  warning: Badge_default["warning"],
  danger: Badge_default["danger"],
  info: Badge_default["info"]
};
var sizeMap = {
  sm: Badge_default["sm"],
  md: Badge_default["md"],
  lg: Badge_default["lg"]
};
function DismissButton({ onDismiss, size }) {
  const buttonRef = React2.useRef(null);
  const { buttonProps, isPressed } = useButton(
    {
      "aria-label": "Dismiss",
      onPress: onDismiss
    },
    buttonRef
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({});
  const iconSize = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ jsx2(
    "button",
    __spreadProps(__spreadValues({}, mergeProps(buttonProps, focusProps, hoverProps)), {
      ref: buttonRef,
      type: "button",
      className: Badge_default.dismissButton,
      "data-pressed": isPressed || void 0,
      "data-hovered": isHovered || void 0,
      "data-focus-visible": isFocusVisible || void 0,
      children: /* @__PURE__ */ jsx2(
        "svg",
        {
          className: iconSize,
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx2(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M6 18L18 6M6 6l12 12"
            }
          )
        }
      )
    })
  );
}
var Badge = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      variant = "default",
      size = "md",
      icon,
      dismissible = false,
      onDismiss,
      pill = false,
      children,
      className
    } = _b, props = __objRest(_b, [
      "variant",
      "size",
      "icon",
      "dismissible",
      "onDismiss",
      "pill",
      "children",
      "className"
    ]);
    return /* @__PURE__ */ jsxs(
      "span",
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "badge",
          variant,
          size,
          Badge_default.badge,
          variantMap[variant],
          sizeMap[size],
          pill && Badge_default.pill,
          className
        ),
        "data-variant": variant,
        "data-size": size,
        "data-pill": pill ? "true" : void 0
      }, props), {
        children: [
          icon && /* @__PURE__ */ jsx2("span", { className: Badge_default.iconWrapper, "aria-hidden": "true", children: icon }),
          /* @__PURE__ */ jsx2("span", { children }),
          dismissible && /* @__PURE__ */ jsx2(DismissButton, { onDismiss, size })
        ]
      })
    );
  }
);
Badge.displayName = "Badge";

// src/components/CommandPalette/CommandPalette.module.css
var CommandPalette_default = {};

// src/components/CommandPalette/CommandPalette.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function scoreCommandRelevance(command, query) {
  const label = command.label.toLowerCase();
  const description = (command.description || "").toLowerCase();
  const id = command.id.toLowerCase();
  if (label === query) {
    return 1e3;
  }
  if (label.startsWith(query)) {
    return 900;
  }
  if (label.split(/\s+/).some((word) => word === query)) {
    return 800;
  }
  if (label.includes(query)) {
    const index = label.indexOf(query);
    return 710 - Math.min(index, 10);
  }
  if (description.split(/\s+/).some((word) => word === query)) {
    return 300;
  }
  if (description.includes(query)) {
    return 200;
  }
  if (id.includes(query)) {
    return 100;
  }
  return 0;
}
function PaletteSearchInput({
  searchValue,
  onSearchChange,
  placeholder,
  inputRef
}) {
  const state = $0b2218c4e3fe7d7e$export$3f8be18b0f41eaf2({
    value: searchValue,
    onChange: onSearchChange
  });
  const { inputProps, clearButtonProps } = $4d52238874b24f86$export$9bb30bbe003b82e0(
    {
      "aria-label": "Search commands",
      value: state.value,
      onClear: () => {
        onSearchChange("");
      },
      placeholder
    },
    state,
    inputRef
  );
  const handleInputChange = useCallback(
    (e) => {
      const value = e.currentTarget.value;
      onSearchChange(value);
    },
    [onSearchChange]
  );
  return /* @__PURE__ */ jsxs2("div", { className: CommandPalette_default["search-container"], children: [
    /* @__PURE__ */ jsx3("div", { className: CommandPalette_default["search-icon"], children: /* @__PURE__ */ jsx3(FaMagnifyingGlass, { className: "w-4 h-4" }) }),
    /* @__PURE__ */ jsx3(
      "input",
      __spreadProps(__spreadValues({}, $65484d02dcb7eb3e$export$457c3d6518dd4c6f(inputProps)), {
        ref: inputRef,
        value: searchValue,
        onChange: handleInputChange,
        className: CommandPalette_default["search-input"]
      })
    ),
    /* @__PURE__ */ jsx3(
      "button",
      __spreadProps(__spreadValues({}, $65484d02dcb7eb3e$export$457c3d6518dd4c6f(clearButtonProps)), {
        "aria-label": "Clear search",
        className: CommandPalette_default["search-clear"],
        children: "\u2715"
      })
    )
  ] });
}
function CommandListItemSimple({
  command,
  isSelected,
  onSelect
}) {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      onClick: () => onSelect(command),
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSelect(command);
        }
      },
      role: "option",
      "aria-selected": isSelected ? "true" : "false",
      tabIndex: isSelected ? 0 : -1,
      className: cn("item", CommandPalette_default["item"]),
      children: [
        /* @__PURE__ */ jsxs2("div", { className: cn("item-content", CommandPalette_default["item-content"]), children: [
          command.icon && /* @__PURE__ */ jsx3("div", { className: CommandPalette_default["item-icon"], children: command.icon }),
          /* @__PURE__ */ jsxs2("div", { className: CommandPalette_default["item-labels"], children: [
            /* @__PURE__ */ jsx3("div", { className: CommandPalette_default["item-label"], children: command.label }),
            command.description && /* @__PURE__ */ jsx3("div", { className: CommandPalette_default["item-description"], children: command.description })
          ] })
        ] }),
        command.shortcut && /* @__PURE__ */ jsx3(Badge, { size: "sm", variant: "default", className: "ml-3 flex-shrink-0 font-mono", children: command.shortcut })
      ]
    }
  );
}
function CommandList({
  commands,
  selectedIndex,
  onSelect,
  loading,
  emptyMessage
}) {
  const listRef = useRef2(null);
  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.children;
      if (items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({
          block: "nearest"
        });
      }
    }
  }, [selectedIndex]);
  return /* @__PURE__ */ jsx3(
    "div",
    {
      ref: listRef,
      className: cn("list", CommandPalette_default["list"]),
      role: "listbox",
      "aria-label": "Commands",
      children: commands.length === 0 ? /* @__PURE__ */ jsx3("div", { className: CommandPalette_default["empty"], children: emptyMessage }) : commands.map((command, idx) => /* @__PURE__ */ jsx3(
        CommandListItemSimple,
        {
          command,
          isSelected: idx === selectedIndex,
          onSelect
        },
        command.id
      ))
    }
  );
}
var CommandPalette = React3.forwardRef(
  ({
    open = false,
    onOpenChange,
    commands = [],
    onCommandExecute,
    placeholder = "Type a command or search...",
    emptyStateMessage = "No commands found.",
    showCategories = true,
    closeOnExecute = true,
    className,
    contentClassName,
    overlayClassName
  }, ref) => {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const overlayState = $fc909762b330b746$export$61c6a8c84e605fb6({
      isOpen: open,
      onOpenChange: (newOpen) => {
        if (!newOpen) {
          setSearchQuery("");
        }
        onOpenChange == null ? void 0 : onOpenChange(newOpen);
      }
    });
    const modalRef = useRef2(null);
    const inputRef = useRef2(null);
    const paletteRef = useRef2(null);
    React3.useImperativeHandle(ref, () => paletteRef.current);
    useEffect(() => {
      setMounted(true);
    }, []);
    useEffect(() => {
      const handleKeyDown = (event) => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0 || navigator.userAgent.indexOf("Mac") !== -1;
        const isCommandKey = isMac ? event.metaKey : event.ctrlKey;
        if (isCommandKey && event.key === "k") {
          event.preventDefault();
          overlayState.open();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [overlayState]);
    const handleExecuteCommand = useCallback(
      async (command) => {
        try {
          setLoading(true);
          onCommandExecute == null ? void 0 : onCommandExecute(command);
          await command.action();
          if (closeOnExecute) {
            overlayState.close();
          }
        } catch (error) {
          console.error(`Error executing command ${command.id}:`, error);
        } finally {
          setLoading(false);
        }
      },
      [closeOnExecute, onCommandExecute, overlayState]
    );
    const filteredCommands = useMemo(() => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) {
        return commands;
      }
      return commands.map((command) => ({
        command,
        score: scoreCommandRelevance(command, query)
      })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).map(({ command }) => command);
    }, [commands, searchQuery]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (!overlayState.isOpen)
          return;
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            setSelectedIndex(
              (prev) => prev < filteredCommands.length - 1 ? prev + 1 : 0
            );
            break;
          case "ArrowUp":
            event.preventDefault();
            setSelectedIndex(
              (prev) => prev > 0 ? prev - 1 : filteredCommands.length - 1
            );
            break;
          case "Enter":
            event.preventDefault();
            if (filteredCommands[selectedIndex]) {
              handleExecuteCommand(filteredCommands[selectedIndex]);
            }
            break;
          case "Escape":
            event.preventDefault();
            overlayState.close();
            break;
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [overlayState.isOpen, filteredCommands, selectedIndex, handleExecuteCommand, overlayState]);
    useEffect(() => {
      setSelectedIndex(0);
    }, [searchQuery]);
    useEffect(() => {
      if (overlayState.isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [overlayState.isOpen]);
    const { modalProps, underlayProps } = $8ac8429251c45e4b$export$dbc0f175b25fb0fb(
      { isDismissable: true },
      overlayState,
      modalRef
    );
    const { dialogProps } = $40df3f8667284809$export$d55e7ee900f34e93({}, modalRef);
    if (!mounted || !overlayState.isOpen) {
      return null;
    }
    return createPortal(
      /* @__PURE__ */ jsx3($9bf71ea28793e738$export$20e40289641fbbb6, { contain: true, restoreFocus: true, children: /* @__PURE__ */ jsxs2(
        "div",
        __spreadProps(__spreadValues({}, $65484d02dcb7eb3e$export$457c3d6518dd4c6f(underlayProps)), {
          className: cn(CommandPalette_default["palette"], CommandPalette_default["overlay"], overlayClassName),
          children: [
            /* @__PURE__ */ jsx3("div", { className: CommandPalette_default["backdrop"] }),
            /* @__PURE__ */ jsxs2(
              Card,
              __spreadProps(__spreadValues({}, $65484d02dcb7eb3e$export$457c3d6518dd4c6f($3ef42575df84b30b$export$9d1611c77c2fe928(modalProps, dialogProps))), {
                ref: modalRef,
                className: cn("content", CommandPalette_default["content"], className),
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "Command palette",
                children: [
                  /* @__PURE__ */ jsx3(Card.Header, { className: CommandPalette_default["search"], children: /* @__PURE__ */ jsx3(
                    PaletteSearchInput,
                    {
                      searchValue: searchQuery,
                      onSearchChange: setSearchQuery,
                      placeholder,
                      inputRef
                    }
                  ) }),
                  /* @__PURE__ */ jsx3("div", { className: cn(CommandPalette_default["inner"], contentClassName), children: /* @__PURE__ */ jsx3(
                    CommandList,
                    {
                      commands: filteredCommands,
                      selectedIndex,
                      onSelect: handleExecuteCommand,
                      loading,
                      emptyMessage: emptyStateMessage
                    }
                  ) }),
                  /* @__PURE__ */ jsx3(Card.Footer, { className: CommandPalette_default["footer"], children: commands.length > 0 && /* @__PURE__ */ jsxs2(Fragment, { children: [
                    /* @__PURE__ */ jsxs2(Badge, { variant: "default", children: [
                      /* @__PURE__ */ jsx3("span", { className: "pr-2", children: "\u2191\u2193" }),
                      "Navigate"
                    ] }),
                    /* @__PURE__ */ jsxs2(Badge, { variant: "default", children: [
                      /* @__PURE__ */ jsx3("span", { className: "pr-2", children: "\u21B5" }),
                      " Select"
                    ] }),
                    /* @__PURE__ */ jsxs2(Badge, { className: "ml-auto", variant: "default", children: [
                      /* @__PURE__ */ jsx3("span", { className: "pr-2", children: "Esc" }),
                      " Close"
                    ] })
                  ] }) })
                ]
              })
            )
          ]
        })
      ) }),
      document.body
    );
  }
);
CommandPalette.displayName = "CommandPalette";
export {
  CommandPalette
};
