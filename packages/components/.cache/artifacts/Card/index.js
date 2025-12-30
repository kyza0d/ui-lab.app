var __defProp = Object.defineProperty;
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

// src/components/Card/Card.tsx
import React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

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
export {
  Card,
  CardBody,
  CardFooter,
  CardHeader
};
