'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Select, SelectListBox } from 'ui-lab-components';
import {
  FaSort,
  FaClock,
  FaFire,
  FaArrowDownAZ,
  FaArrowUpZA
} from 'react-icons/fa6';

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest', icon: <FaClock /> },
  { label: 'Most Popular', value: 'popular', icon: <FaFire /> },
  { label: 'Name (A-Z)', value: 'az', icon: <FaArrowDownAZ /> },
  { label: 'Name (Z-A)', value: 'za', icon: <FaArrowUpZA /> },
];

export function ElementsSortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current sort from URL or default to 'newest'
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (key: string | number | null) => {
    if (key === null) return;
    const value = String(key);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`${pathname}?${params.toString()}`);
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
        <SelectListBox>
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
        </SelectListBox>
      </Select.Content>
    </Select>
  );
}
