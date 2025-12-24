"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  showFilters?: boolean;
  onRowClick?: (row: T) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  showFilters = false,
  onRowClick,
  onFilterChange,
}: TableProps<T>) {
  const [filters, setFilters] = useState<Record<string, string>>({});

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
        <div className="mb-4 p-4 bg-background-900 rounded-lg border border-background-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterableColumns.map((col) => (
              <div key={String(col.key)}>
                <label className="block text-sm font-medium text-foreground-300 mb-2">
                  {col.label}
                </label>
                <input
                  type="text"
                  value={filters[String(col.key)] || ""}
                  onChange={(e) =>
                    handleFilterChange(String(col.key), e.target.value)
                  }
                  placeholder={`Filter by ${col.label.toLowerCase()}`}
                  className="w-full px-3 py-2 rounded-md border border-background-700 bg-background-950 text-foreground-50 placeholder-foreground-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-x-auto border border-background-800 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-background-800 bg-background-900">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-left font-semibold text-foreground-200"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "border-b border-background-800 last:border-b-0",
                    onRowClick
                      ? "cursor-pointer hover:bg-background-900 transition-colors"
                      : ""
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-3 text-foreground-300"
                    >
                      {col.render ? (
                        col.render(row[col.key], row)
                      ) : (
                        String(row[col.key])
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
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
