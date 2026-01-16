'use client';

import { Select } from 'ui-lab-components';
import {
  FaSort,
  FaClock,
  FaFire,
  FaArrowDownAZ,
  FaArrowUpZA
} from 'react-icons/fa6';

const SORT_OPTIONS = [
  { label: 'Default Order', value: 'default', icon: <FaSort /> },
  { label: 'Newest First', value: 'newest', icon: <FaClock /> },
  { label: 'Most Popular', value: 'popular', icon: <FaFire /> },
  { label: 'Name (A-Z)', value: 'az', icon: <FaArrowDownAZ /> },
  { label: 'Name (Z-A)', value: 'za', icon: <FaArrowUpZA /> },
];

interface ElementsSortDropdownProps {
  currentSort?: string;
  onSortChange: (sort: string) => void;
}

export function ElementsSortDropdown({
  currentSort = 'newest',
  onSortChange,
}: ElementsSortDropdownProps) {
  const handleSortChange = (key: string | number | null) => {
    if (key === null) return;
    const value = String(key);
    onSortChange(value);
  };

  const selectedOption = SORT_OPTIONS.find(opt => opt.value === currentSort);

  return (
    <Select
      defaultSelectedKey={currentSort}
      onSelectionChange={handleSortChange}
      className="w-fit"
    >
      <Select.Trigger
        className="h-9 px-3 border-background-700 bg-background-900 hover:border-background-600 text-foreground-300"
      >
        <Select.Value
          icon={<FaSort className="text-foreground-500" />}
          placeholder="Sort by"
        >
          <span className="hidden lg:inline ml-1">{selectedOption?.label}</span>
        </Select.Value>
      </Select.Trigger>

      <Select.Content>
        <Select.List>
          {SORT_OPTIONS.map((option) => (
            <Select.Item
              key={option.value}
              value={option.value}
              icon={option.icon}
              className="text-sm"
            >
              {option.label}
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select>
  );
}
