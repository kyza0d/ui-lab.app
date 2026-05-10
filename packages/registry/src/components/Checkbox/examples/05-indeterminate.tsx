"use client";

import { useState } from 'react';
import { Checkbox, Divider, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Indeterminate',
  description: 'A parent checkbox can show partial selection when only some child options are checked.',
};

const tableColumns = ['Name', 'Email', 'Role', 'Last active'];

export default function Example() {
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(['Name', 'Email'])
  );

  const allSelected = visibleColumns.size === tableColumns.length;
  const isIndeterminate = visibleColumns.size > 0 && !allSelected;

  const toggleAll = () => {
    setVisibleColumns(allSelected ? new Set() : new Set(tableColumns));
  };

  const toggleColumn = (column: string) => {
    setVisibleColumns((current) => {
      const next = new Set(current);
      next.has(column) ? next.delete(column) : next.add(column);
      return next;
    });
  };

  return (
    <Flex direction="column" gap="sm" style={{ width: 280 }}>
      <Checkbox
        id="columns-all"
        label="Show all columns"
        checked={allSelected}
        isIndeterminate={isIndeterminate}
        onChange={toggleAll}
      />
      <Divider />
      <Flex direction="column" gap="sm" styles={{ root: 'pl-8' }}>
        {tableColumns.map((column) => (
          <Checkbox
            key={column}
            id={`column-${column.toLowerCase().replace(/ /g, '-')}`}
            label={column}
            checked={visibleColumns.has(column)}
            onChange={() => toggleColumn(column)}
          />
        ))}
      </Flex>
    </Flex>
  );
}
