'use client';
import { useState, useEffect, useRef } from 'react';
import { Input } from 'ui-lab-components';
import { FaMagnifyingGlass, FaX } from 'react-icons/fa6';
import { cn } from '@/shared';

interface ElementsSearchHeaderProps {
  className: string;
  currentQuery?: string;
  pathname: string;
  onSearch: (query: string) => void;
}

export function ElementsSearchHeader({
  className,
  currentQuery = '',
  pathname,
  onSearch,
}: ElementsSearchHeaderProps) {
  const [value, setValue] = useState(currentQuery);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  const updateSearch = (newValue: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      onSearch(newValue);
    }, 300);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    updateSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-500 z-10 size-3.5" />
      <Input
        type="text"
        placeholder="Search elements..."
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-10 pr-12 w-full bg-background-900 border-background-700 focus:ring-1 focus:ring-accent-500/50 transition-all"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {value && (
          <button onClick={handleClear} className="text-foreground-500 hover:text-foreground-200">
            <FaX size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
