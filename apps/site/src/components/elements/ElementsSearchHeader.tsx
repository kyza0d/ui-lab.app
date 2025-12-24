'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from 'ui-lab-components';
import { FaMagnifyingGlass, FaX } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

export function ElementsSearchHeader({ className }: { className: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState('');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentQuery = searchParams.get('q') || '';
    setValue(currentQuery);
  }, [searchParams]);

  const updateSearch = (newValue: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newValue.trim()) {
        params.set('q', newValue);
      } else {
        params.delete('q');
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    updateSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.push(`${pathname}?${params.toString()}`);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  };

  return (
    // Inside ElementsSearchHeader return:
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
