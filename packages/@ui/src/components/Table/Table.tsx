"use client";

import * as React from "react";

import { Input } from "@/components/Input";
import { type StyleValue, cn } from "@/lib/utils";
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
  filterGrid?: StyleValue;
  filterLabel?: StyleValue;
  filterInput?: StyleValue;
  table?: StyleValue;
  header?: StyleValue;
  body?: StyleValue;
  headerRow?: StyleValue;
  headerCell?: StyleValue;
  row?: StyleValue;
  cell?: StyleValue;
  emptyRow?: StyleValue;
  emptyState?: StyleValue;
}

type TableStylesProp = StylesProp<TableStyleSlots>;

export type TableSortState<T> = {
  column: keyof T | null;
  direction: "ascending" | "descending" | null;
};

export type TableFilterState = Record<string, string>;

export interface TableProps<T extends Record<string, any>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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
  /** Optional composed table content. When omitted, the default header/body renderer is used. */
  children?: React.ReactNode;
}

type TableSlotKey = keyof TableStyleSlots;
type ResolvedTableStyles = Record<TableSlotKey, string>;

export interface TableContextValue<T extends Record<string, any> = Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  filteredData: T[];
  selectedRows: Set<React.Key>;
  sortState: TableSortState<T>;
  filterState: TableFilterState;
  setFilterValue: (columnKey: string, value: string) => void;
  onRowClick?: (row: T) => void;
  styles: ResolvedTableStyles;
}

const TableContext = React.createContext<TableContextValue | null>(null);

function useTableContext<T extends Record<string, any> = Record<string, any>>() {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error("Table component must be used within Table root");
  }
  return context as TableContextValue<T>;
}

const tableStyleSlotKeys = [
  "root",
  "container",
  "filterBar",
  "filterGrid",
  "filterLabel",
  "filterInput",
  "table",
  "header",
  "body",
  "headerRow",
  "headerCell",
  "row",
  "cell",
  "emptyRow",
  "emptyState",
] as const;

const resolveTableBaseStyles = createStylesResolver(tableStyleSlotKeys);

function normalizeTableStyles(styles: TableStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return styles;
  }

  return {
    root: styles.root,
    container: styles.container,
    filterBar: styles.filterBar,
    filterGrid: styles.filterGrid,
    filterLabel: styles.filterLabel,
    filterInput: styles.filterInput,
    table: styles.table,
    header: styles.header,
    body: styles.body,
    headerRow: styles.headerRow,
    headerCell: styles.headerCell,
    row: styles.row,
    cell: styles.cell,
    emptyRow: styles.emptyRow,
    emptyState: styles.emptyState,
  };
}

function getDefaultSortState<T extends Record<string, any>>(): TableSortState<T> {
  return {
    column: null,
    direction: null,
  };
}

function getRowKey(row: Record<string, any>, index: number): React.Key {
  return row.id ?? row.key ?? index;
}

type TableComponent = (<T extends Record<string, any>>(
  props: TableProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement | null) & {
  displayName?: string;
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
};

const TableRoot = <T extends Record<string, any>>(
  {
    data,
    columns,
    showFilters = false,
    onRowClick,
    onFilterChange,
    styles,
    className,
    children,
    "aria-label": ariaLabel = "Data table",
    ...props
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const [filterState, setFilterState] = React.useState<TableFilterState>({});
  const [sortState] = React.useState<TableSortState<T>>(() => getDefaultSortState<T>());
  const selectedRows = React.useMemo(() => new Set<React.Key>(), []);
  const resolved = resolveTableBaseStyles(normalizeTableStyles(styles));
  const filterableColumns = React.useMemo(
    () => columns.filter((column) => column.filterable),
    [columns]
  );

  const setFilterValue = React.useCallback(
    (columnKey: string, value: string) => {
      setFilterState((currentFilters) => {
        const nextFilters = { ...currentFilters, [columnKey]: value };
        onFilterChange?.(nextFilters);
        return nextFilters;
      });
    },
    [onFilterChange]
  );

  const filteredData = React.useMemo(
    () =>
      data.filter((row) =>
        Object.entries(filterState).every(([key, filterValue]) => {
          if (!filterValue) return true;
          const cellValue = String(row[key] ?? "").toLowerCase();
          return cellValue.includes(filterValue.toLowerCase());
        })
      ),
    [data, filterState]
  );

  const contextValue = React.useMemo<TableContextValue<T>>(
    () => ({
      columns,
      data,
      filteredData,
      selectedRows,
      sortState,
      filterState,
      setFilterValue,
      onRowClick,
      styles: resolved,
    }),
    [
      columns,
      data,
      filteredData,
      selectedRows,
      sortState,
      filterState,
      setFilterValue,
      onRowClick,
      resolved,
    ]
  );

  return (
    <TableContext.Provider value={contextValue as TableContextValue}>
      <div
        ref={ref}
        className={cn("table", css.root, className, resolved.root)}
        role="region"
        aria-label={ariaLabel}
        {...props}
      >
        {showFilters && filterableColumns.length > 0 && (
          <div
            className={cn("filter-bar", css.filterBar, resolved.filterBar)}
            data-slot="filter-bar"
          >
            <div
              className={cn("filter-grid", css.filterGrid, resolved.filterGrid)}
              data-slot="filter-grid"
            >
              {filterableColumns.map((column) => {
                const columnKey = String(column.key);
                const inputId = `table-filter-${columnKey}`;

                return (
                  <div key={columnKey} className={css.filterField}>
                    <label
                      className={cn("filter-label", css.filterLabel, resolved.filterLabel)}
                      data-slot="filter-label"
                      htmlFor={inputId}
                    >
                      {column.label}
                    </label>
                    <Input
                      id={inputId}
                      type="text"
                      value={filterState[columnKey] || ""}
                      onChange={(event) => setFilterValue(columnKey, event.target.value)}
                      placeholder={`Filter by ${column.label.toLowerCase()}`}
                      aria-label={`Filter by ${column.label}`}
                      className={cn(css.filterInput, resolved.filterInput)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={cn("container", css.container, resolved.container)} data-slot="container">
          <table
            className={cn("element", css.table, resolved.table)}
            data-slot="element"
            role="table"
            aria-label={ariaLabel}
          >
            {children ?? (
              <>
                <TableHeader />
                <TableBody />
              </>
            )}
          </table>
        </div>
      </div>
    </TableContext.Provider>
  );
};

const Table = React.forwardRef(TableRoot) as unknown as TableComponent;

Table.displayName = "Table";

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Optional header content. When omitted, columns from Table context are rendered. */
  children?: React.ReactNode;
}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { columns, styles } = useTableContext();

    return (
      <thead
        ref={ref}
        className={cn("header", css.header, styles.header, className)}
        data-slot="header"
        role="rowgroup"
        {...props}
      >
        {children ?? (
          <tr
            className={cn("header-row", css.headerRow, styles.headerRow)}
            data-slot="header-row"
            role="row"
          >
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={cn("header-cell", css.headerCell, styles.headerCell)}
                data-slot="header-cell"
                scope="col"
                role="columnheader"
                aria-sort="none"
                data-sortable={column.sortable ? "true" : undefined}
              >
                {column.label}
              </th>
            ))}
          </tr>
        )}
      </thead>
    );
  }
);

TableHeader.displayName = "Table.Header";

interface TableBodyProps<T extends Record<string, any> = Record<string, any>>
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Optional body content. When omitted, filtered rows from Table context are rendered. */
  children?: React.ReactNode;
  /** Optional rows for custom body composition. Defaults to filtered context data. */
  rows?: T[];
}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, rows, ...props }, ref) => {
    const { columns, filteredData, styles } = useTableContext();
    const bodyRows = rows ?? filteredData;

    return (
      <tbody
        ref={ref}
        className={cn("body", css.body, styles.body, className)}
        data-slot="body"
        role="rowgroup"
        {...props}
      >
        {children ?? (
          bodyRows.length > 0 ? (
            bodyRows.map((row, index) => (
              <TableRow key={getRowKey(row, index)} row={row} rowIndex={index} />
            ))
          ) : (
            <tr
              className={cn("empty-row", css.emptyRow, styles.emptyRow)}
              data-slot="empty-row"
              role="row"
            >
              <td
                colSpan={columns.length}
                className={cn("empty-state", css.emptyState, styles.emptyState)}
                data-slot="empty-state"
                role="cell"
              >
                No data available
              </td>
            </tr>
          )
        )}
      </tbody>
    );
  }
);

TableBody.displayName = "Table.Body";

interface TableRowProps<T extends Record<string, any> = Record<string, any>>
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Row data used to render default cells. */
  row?: T;
  /** Zero-based index for generated rows. */
  rowIndex?: number;
  /** Marks the row as selected for styling and assistive technology. */
  selected?: boolean;
  /** Marks the row as disabled for future interactive behavior. */
  disabled?: boolean;
  children?: React.ReactNode;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, row, rowIndex = 0, selected, disabled, children, onClick, ...props }, ref) => {
    const { columns, selectedRows, onRowClick, styles } = useTableContext();
    const rowKey = row ? getRowKey(row, rowIndex) : rowIndex;
    const isSelected = selected ?? selectedRows.has(rowKey);
    const isInteractive = Boolean(row && onRowClick && !disabled);

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLTableRowElement>) => {
        if (!disabled && row) {
          onRowClick?.(row);
        }
        onClick?.(event);
      },
      [disabled, row, onClick, onRowClick]
    );

    return (
      <tr
        ref={ref}
        className={cn("row", css.row, styles.row, isInteractive && css.interactive, className)}
        data-slot="row"
        role="row"
        tabIndex={isInteractive ? 0 : undefined}
        aria-selected={isSelected || undefined}
        aria-disabled={disabled || undefined}
        data-selected={isSelected ? "true" : undefined}
        data-interactive={isInteractive ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        onClick={handleClick}
        {...props}
      >
        {children ?? columns.map((column, columnIndex) => (
          <TableCell
            key={String(column.key)}
            row={row}
            column={column}
            columnIndex={columnIndex}
          />
        ))}
      </tr>
    );
  }
);

TableRow.displayName = "Table.Row";

interface TableCellProps<T extends Record<string, any> = Record<string, any>>
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Row data used with the column render function. */
  row?: T;
  /** Column definition for this cell. Inferred by columnIndex when omitted. */
  column?: Column<T>;
  /** Zero-based column index used to read the column from context. */
  columnIndex?: number;
  /** Explicit cell value. Defaults to row[column.key]. */
  value?: React.ReactNode;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, row, column, columnIndex, value, children, ...props }, ref) => {
    const { columns, styles } = useTableContext();
    const resolvedColumn = column ?? (columnIndex !== undefined ? columns[columnIndex] : undefined);
    const resolvedValue =
      value ?? (row && resolvedColumn ? row[resolvedColumn.key] : undefined);
    const content =
      children ??
      (resolvedColumn?.render && row
        ? resolvedColumn.render(resolvedValue, row)
        : String(resolvedValue ?? ""));

    return (
      <td
        ref={ref}
        className={cn("cell", css.cell, styles.cell, className)}
        data-slot="cell"
        role="cell"
        data-column={resolvedColumn ? String(resolvedColumn.key) : undefined}
        {...props}
      >
        {content}
      </td>
    );
  }
);

TableCell.displayName = "Table.Cell";

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export { Table, TableHeader, TableBody, TableRow, TableCell, useTableContext };
