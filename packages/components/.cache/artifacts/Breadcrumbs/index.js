// src/components/Breadcrumbs/Breadcrumbs.tsx
import React, { forwardRef } from "react";

// src/components/Breadcrumbs/Breadcrumbs.module.css
var Breadcrumbs_default = {};

// src/components/Breadcrumbs/Breadcrumbs.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Breadcrumb = forwardRef(
  ({ href, onPress, children, isCurrent = false, isDisabled = false, className }, ref) => {
    const isInteractive = !isCurrent && !isDisabled && (href || onPress);
    return /* @__PURE__ */ jsx("li", { ref, className: Breadcrumbs_default.breadcrumb, children: isInteractive ? /* @__PURE__ */ jsx(
      "a",
      {
        href,
        className: `${Breadcrumbs_default.breadcrumbLink} ${className || ""}`,
        "data-disabled": isDisabled || void 0,
        "data-current": isCurrent || void 0,
        "aria-current": isCurrent ? "page" : void 0,
        onClick: (e) => {
          if (onPress) {
            e.preventDefault();
            onPress();
          }
        },
        children
      }
    ) : /* @__PURE__ */ jsx(
      "span",
      {
        className: `${Breadcrumbs_default.breadcrumbLink} ${className || ""}`,
        "data-disabled": isDisabled || void 0,
        "data-current": isCurrent || void 0,
        "aria-current": isCurrent ? "page" : void 0,
        children
      }
    ) });
  }
);
Breadcrumb.displayName = "Breadcrumb";
var Breadcrumbs = forwardRef(
  ({ children, className, separator }, ref) => {
    const childArray = React.Children.toArray(children);
    const childCount = childArray.length;
    return /* @__PURE__ */ jsx(
      "nav",
      {
        ref,
        className: `${Breadcrumbs_default.breadcrumbs} ${className || ""}`,
        "aria-label": "Breadcrumb",
        children: /* @__PURE__ */ jsx("ol", { className: `${Breadcrumbs_default.breadcrumbsList} ${separator ? Breadcrumbs_default.withCustomSeparator : ""}`, children: React.Children.map(childArray, (child, index) => {
          const isLastChild = index === childCount - 1;
          if (React.isValidElement(child)) {
            const element = React.cloneElement(child, {
              isCurrent: isLastChild
            });
            if (separator && !isLastChild) {
              return /* @__PURE__ */ jsxs(React.Fragment, { children: [
                element,
                /* @__PURE__ */ jsx("li", { className: Breadcrumbs_default.separator, "aria-hidden": "true", children: separator })
              ] }, index);
            }
            return element;
          }
          return child;
        }) })
      }
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";
export {
  Breadcrumb,
  Breadcrumbs
};
