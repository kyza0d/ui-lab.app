'use client';

import { useState, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button, Popover } from 'ui-lab-components';
import { ElementFilter } from './ElementFilter';
import { FaSliders, FaX } from 'react-icons/fa6';
import { getAllCategories, getAllTags } from 'ui-lab-registry';
import { cn } from '@/lib/utils';

interface ElementsFilterPopoverProps {
  className?: string;
}

export function ElementsFilterPopover({ className }: ElementsFilterPopoverProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const categories = useMemo(() => getAllCategories(), []);
  const tags = useMemo(() => getAllTags(), []);

  const selectedCategory = searchParams.get('category') || null;
  const selectedTags = useMemo(() => {
    const tagsParam = searchParams.get('tags');
    return tagsParam ? tagsParam.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const activeFilterCount = (selectedCategory ? 1 : 0) + selectedTags.length;

  const handleCategoryChange = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleTagsChange = (newTags: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newTags.length > 0) {
      params.set('tags', newTags.join(','));
    } else {
      params.delete('tags');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('tags');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      position="bottom"
      contentClassName="w-72 max-h-96 overflow-y-auto"
      content={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground-50">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-foreground-400 hover:text-foreground-200 transition-colors"
            >
              <FaX className="w-3 h-3" />
            </button>
          </div>

          <ElementFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            tags={tags}
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
          />

          {activeFilterCount > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 rounded-md border border-background-700 hover:border-background-600 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      }
    >
      <Button
        variant='secondary'
        size="sm"
        className={cn(
          'flex items-center gap-2 rounded-md border transition-colors',
          activeFilterCount > 0
            ? 'border-accent-500 bg-accent-500/10 text-accent-400'
            : 'border-background-700 bg-background-800 text-foreground-300 hover:border-background-600',
          className
        )}
      >
        <FaSliders className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
        {activeFilterCount > 0 && (
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-background-800 text-foreground-50 text-xs font-bold">
            {activeFilterCount}
          </span>
        )}
      </Button>
    </Popover>
  );
}
