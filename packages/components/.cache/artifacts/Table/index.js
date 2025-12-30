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

// src/components/Table/Table.tsx
import { useState } from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Table/Table.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Table({
  data,
  columns,
  showFilters = false,
  onRowClick,
  onFilterChange
}) {
  const [filters, setFilters] = useState({});
  const filterableColumns = columns.filter((col) => col.filterable);
  const handleFilterChange = (columnKey, value) => {
    const newFilters = __spreadProps(__spreadValues({}, filters), { [columnKey]: value });
    setFilters(newFilters);
    onFilterChange == null ? void 0 : onFilterChange(newFilters);
  };
  const filteredData = data.filter(
    (row) => Object.entries(filters).every(([key, filterValue]) => {
      if (!filterValue)
        return true;
      const cellValue = String(row[key]).toLowerCase();
      return cellValue.includes(filterValue.toLowerCase());
    })
  );
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    showFilters && filterableColumns.length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-4 p-4 bg-background-900 rounded-lg border border-background-800", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filterableColumns.map((col) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground-300 mb-2", children: col.label }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: filters[String(col.key)] || "",
          onChange: (e) => handleFilterChange(String(col.key), e.target.value),
          placeholder: `Filter by ${col.label.toLowerCase()}`,
          className: "w-full px-3 py-2 rounded-md border border-background-700 bg-background-950 text-foreground-50 placeholder-foreground-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
        }
      )
    ] }, String(col.key))) }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto border border-background-800 rounded-lg", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-background-800 bg-background-900", children: columns.map((col) => /* @__PURE__ */ jsx(
        "th",
        {
          className: "px-4 py-3 text-left font-semibold text-foreground-200",
          children: col.label
        },
        String(col.key)
      )) }) }),
      /* @__PURE__ */ jsx("tbody", { children: filteredData.length > 0 ? filteredData.map((row, idx) => /* @__PURE__ */ jsx(
        "tr",
        {
          onClick: () => onRowClick == null ? void 0 : onRowClick(row),
          className: cn(
            "border-b border-background-800 last:border-b-0",
            onRowClick ? "cursor-pointer hover:bg-background-900 transition-colors" : ""
          ),
          children: columns.map((col) => /* @__PURE__ */ jsx(
            "td",
            {
              className: "px-4 py-3 text-foreground-300",
              children: col.render ? col.render(row[col.key], row) : String(row[col.key])
            },
            String(col.key)
          ))
        },
        idx
      )) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: columns.length,
          className: "px-4 py-8 text-center text-foreground-400",
          children: "No data available"
        }
      ) }) })
    ] }) })
  ] });
}
export {
  Table
};
