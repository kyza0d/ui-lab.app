"use client";

import { useState, Fragment } from "react";
import { cn } from "@/shared";
import { InlineCodeHighlight } from "@/features/docs";
import { Expand } from "ui-lab-components";

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  isCode?: boolean;
  codeLanguage?: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  showFilters?: boolean;
  onRowClick?: (row: T) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  expandRender?: (row: T) => React.ReactNode;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  showFilters = false,
  onRowClick,
  onFilterChange,
  expandRender,
}: TableProps<T>) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (idx: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const filterableColumns = columns.filter((col) => col.filterable);

  const handleFilterChange = (columnKey: string, value: string) => {
    const newFilters = { ...filters, [columnKey]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([key, filterValue]) => {
      if (!filterValue) return true;
      const cellValue = String(row[key]).toLowerCase();
      return cellValue.includes(filterValue.toLowerCase());
    })
  );

  return (
    <div className="w-full">
      {showFilters && filterableColumns.length > 0 && (
        <div className="mb-4 p-4 bg-background-900 rounded-sm border border-background-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterableColumns.map((col) => (
              <div key={String(col.key)}>
                <label className="block text-xs font-medium text-foreground-300 mb-2">
                  {col.label}
                </label>
                <input
                  type="text"
                  value={filters[String(col.key)] || ""}
                  onChange={(e) =>
                    handleFilterChange(String(col.key), e.target.value)
                  }
                  placeholder={`Filter by ${col.label.toLowerCase()}`}
                  className="w-full px-3 py-2 rounded-sm border border-background-700 bg-background-950 text-foreground-50 placeholder-foreground-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-x-auto border border-background-800 rounded-sm">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="border-b border-background-800 bg-background-900">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left font-semibold text-foreground-200"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
              {expandRender && <th className="w-10" />}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => {
                const isExpanded = expandedRows.has(idx);
                return (
                  <Fragment key={idx}>
                    <tr
                      onClick={() =>
                        expandRender ? toggleRow(idx) : onRowClick?.(row)
                      }
                      className={cn(
                        "border-b border-background-800",
                        expandRender || onRowClick
                          ? "cursor-pointer hover:bg-background-900 transition-colors"
                          : ""
                      )}
                    >
                      {columns.map((col, colIdx) => (
                        <td
                          key={colIdx}
                          className="px-4 py-3 text-foreground-300"
                          style={{ width: col.width }}
                        >
                          {col.render ? (
                            col.render(row[col.key], row)
                          ) : col.isCode ? (
                            <InlineCodeHighlight
                              code={String(row[col.key])}
                              language={col.codeLanguage || "typescript"}
                              className="bg-background-900 px-2 py-1 rounded"
                            />
                          ) : (
                            String(row[col.key])
                          )}
                        </td>
                      ))}
                      {expandRender && (
                        <td className="px-4 py-3 text-right">
                          <Expand.Icon
                            style={{
                              transform: isExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 250ms ease",
                            }}
                          />
                        </td>
                      )}
                    </tr>
                    {expandRender && isExpanded && (
                      <tr className="border-b border-background-800 last:border-b-0">
                        <td
                          colSpan={columns.length + 1}
                          className="px-4 py-3"
                        >
                          {expandRender(row)}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (expandRender ? 1 : 0)}
                  className="px-4 py-8 text-center text-foreground-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
