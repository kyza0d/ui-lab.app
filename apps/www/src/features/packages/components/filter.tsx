'use client';

import { useState, useMemo } from 'react';
import { Button, Popover, Expand } from 'ui-lab-components';
import { FaSliders, FaX } from 'react-icons/fa6';
import { getAllCategories, getAllTags } from 'ui-lab-registry';
import { cn } from '@/shared';

// ElementFilter

interface ElementFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

function ElementFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  tags,
  selectedTags,
  onTagsChange,
}: ElementFilterProps) {
  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const setSelectedTags = onTagsChange;

  return (
    <div className="space-y-6">
      <Expand title="Category" defaultExpanded={true}>
        <div className="space-y-2 pt-3">
          <button
            onClick={() => onCategoryChange(null)}
            className={`block w-full text-left px-3 py-2 rounded transition-colors text-sm ${selectedCategory === null
              ? 'bg-accent-500 text-foreground-50 font-medium'
              : 'text-foreground-400 hover:bg-background-800'
              }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`block w-full text-left px-3 py-2 rounded transition-colors text-sm ${selectedCategory === category
                ? 'bg-accent-500 text-foreground-50 font-medium'
                : 'text-foreground-400 hover:bg-background-800'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Expand>

      <Expand title="Tags" defaultExpanded={false}>
        <div className="space-y-2 pt-3">
          {tags.map((tag) => (
            <label
              key={tag}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="rounded border-background-600 text-accent-500 focus:ring-accent-500"
              />
              <span className="text-sm text-foreground-400 group-hover:text-foreground-300 transition-colors">
                {tag}
              </span>
            </label>
          ))}
        </div>
      </Expand>

      {(selectedCategory !== null || selectedTags.length > 0) && (
        <button
          onClick={() => {
            onCategoryChange(null);
            onTagsChange([]);
          }}
          className="w-full px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 rounded border border-background-700 hover:border-background-600 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

// ElementsFilterPopover

interface ElementsFilterPopoverProps {
  className?: string;
  selectedCategory?: string | null;
  selectedTags?: string[];
  onCategoryChange: (category: string | null) => void;
  onTagsChange: (tags: string[]) => void;
  onClearAll: () => void;
}

const EMPTY_TAGS: string[] = [];

export function ElementsFilterPopover({
  className,
  selectedCategory = null,
  selectedTags = EMPTY_TAGS,
  onCategoryChange,
  onTagsChange,
  onClearAll,
}: ElementsFilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = useMemo(() => getAllCategories(), []);
  const tags = useMemo(() => getAllTags(), []);

  const activeFilterCount = (selectedCategory ? 1 : 0) + selectedTags.length;

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      position="bottom"
      styles={{ content: "w-72 max-h-96 overflow-y-auto" }}
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
            onCategoryChange={onCategoryChange}
            tags={tags}
            selectedTags={selectedTags}
            onTagsChange={onTagsChange}
          />

          {activeFilterCount > 0 && (
            <button
              onClick={onClearAll}
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
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-background-800 text-foreground-50 text-sm font-bold">
            {activeFilterCount}
          </span>
        )}
      </Button>
    </Popover>
  );
}
