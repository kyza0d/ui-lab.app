"use client";

import { useState } from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Table.module.css";

export interface Column<T> {
  /** Key of the data row object to display in this column */
  key: keyof T;
  /** Column header label displayed in the table head */
  label: string;
  /** Whether the column supports sorting (reserved for future use) */
  sortable?: boolean;
  /** Whether a filter input is shown for this column when showFilters is enabled */
  filterable?: boolean;
  /** Custom render function for the cell; receives the cell value and full row */
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableStyleSlots {
  root?: StyleValue;
  container?: StyleValue;
  filterBar?: StyleValue;
  table?: StyleValue;
  thead?: StyleValue;
  tbody?: StyleValue;
  headerRow?: StyleValue;
  headerCell?: StyleValue;
  bodyRow?: StyleValue;
  cell?: StyleValue;
  emptyState?: StyleValue;
}

type TableStylesProp = StylesProp<TableStyleSlots>;

export interface TableProps<T> {
  /** Array of data rows to display */
  data: T[];
  /** Column definitions including key, label, and optional render function */
  columns: Column<T>[];
  /** Whether to show filter inputs above the table */
  showFilters?: boolean;
  /** Called when a table row is clicked */
  onRowClick?: (row: T) => void;
  /** Called when any column filter value changes */
  onFilterChange?: (filters: Record<string, string>) => void;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: TableStylesProp;
}

const resolveTableBaseStyles = createStylesResolver([
  'root', 'container', 'filterBar', 'table', 'thead', 'tbody',
  'headerRow', 'headerCell', 'bodyRow', 'cell', 'emptyState'
] as const);

export function Table<T extends Record<string, any>>({
  data,
  columns,
  showFilters = false,
  onRowClick,
  onFilterChange,
  styles: stylesProp,
}: TableProps<T>) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const resolved = resolveTableBaseStyles(stylesProp);

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
    <div className={cn(css.root, resolved.root)}>
      {showFilters && filterableColumns.length > 0 && (
        <div className={cn(css.filterBar, resolved.filterBar)}>
          <div className={css.filterGrid}>
            {filterableColumns.map((col) => (
              <div key={String(col.key)}>
                <label className={cn(css.filterLabel)}>
                  {col.label}
                </label>
                <input
                  type="text"
                  value={filters[String(col.key)] || ""}
                  onChange={(e) =>
                    handleFilterChange(String(col.key), e.target.value)
                  }
                  placeholder={`Filter by ${col.label.toLowerCase()}`}
                  className={css.filterInput}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={cn(css.container, resolved.container)}>
        <table className={cn(css.table, resolved.table)}>
          <thead className={cn(css.thead, resolved.thead)}>
            <tr className={cn(css.headerRow, resolved.headerRow)}>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(css.headerCell, resolved.headerCell)}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={cn(css.tbody, resolved.tbody)}>
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    css.bodyRow,
                    resolved.bodyRow,
                    onRowClick && css.interactive
                  )}
                  data-interactive={onRowClick ? true : undefined}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={cn(css.cell, resolved.cell)}
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
                  className={cn(css.emptyState, resolved.emptyState)}
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
