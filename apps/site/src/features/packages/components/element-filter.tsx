'use client';

import { Expand } from 'ui-lab-components';

interface ElementFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function ElementFilter({
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
