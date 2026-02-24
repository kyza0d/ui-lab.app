'use client';
import { Input } from 'ui-lab-components';

function SearchInput({ placeholder = 'Search...' }: { placeholder?: string }) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <Input placeholder={placeholder} className="pl-9" />
    </div>
  );
}

export function SearchInputDemo() {
  return (
    <div className="p-6 max-w-sm w-full">
      <SearchInput placeholder="Search components..." />
    </div>
  );
}
