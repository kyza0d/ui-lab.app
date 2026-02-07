'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import { elementRegistry, elementOrder } from 'ui-lab-registry';
import type { ElementMetadata } from 'ui-lab-registry';
import { ElementsGridClient, ElementsSearchHeader, ElementsFilterPopover, ElementsSortDropdown, ElementsLayoutToggle } from '@/features/elements';
import { Divider } from 'ui-lab-components';

function sortElements(elements: ElementMetadata[], sortBy: string): ElementMetadata[] {
  const sorted = [...elements];
  const getElementPosition = (elementId: string): number => {
    for (const category in elementOrder) {
      const index = elementOrder[category as keyof typeof elementOrder].indexOf(elementId);
      if (index !== -1) return index;
    }
    return Infinity;
  };
  switch (sortBy) {
    case 'az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'za':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'default':
      return sorted.sort((a, b) => getElementPosition(a.id) - getElementPosition(b.id));
    case 'newest':
    default:
      return sorted.reverse();
  }
}

export default function PackageElementsClient({
  isPremium = false,
  packageId,
  elementIds
}: {
  isPremium?: boolean;
  packageId: string;
  elementIds: string[];
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const packageElements = useMemo(() => {
    return elementIds.map(id => elementRegistry[id]).filter(Boolean);
  }, [elementIds]);

  const filteredElements = useMemo(() => {
    let elements = packageElements;
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      elements = elements.filter(
        (el) =>
          el.name.toLowerCase().includes(lowerQuery) ||
          el.description.toLowerCase().includes(lowerQuery) ||
          el.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }
    if (selectedCategory) {
      elements = elements.filter((el) => el.category === selectedCategory);
    }
    if (selectedTags.length > 0) {
      elements = elements.filter((el) =>
        selectedTags.some((tag) => el.tags.includes(tag))
      );
    }
    return sortElements(elements, sortBy);
  }, [packageElements, searchQuery, selectedCategory, selectedTags, sortBy]);

  const buildParams = useCallback((updates: Record<string, string | null>) => {
    const urlParams = new URLSearchParams();
    if (searchQuery) urlParams.set('q', searchQuery);
    if (selectedCategory) urlParams.set('category', selectedCategory);
    if (selectedTags.length > 0) urlParams.set('tags', selectedTags.join(','));
    if (sortBy && sortBy !== 'newest') urlParams.set('sort', sortBy);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        urlParams.delete(key);
      } else {
        urlParams.set(key, value);
      }
    });
    return urlParams.toString();
  }, [searchQuery, selectedCategory, selectedTags, sortBy]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    const urlParams = buildParams({ q: query || null });
    router.push(`/elements/${packageId}${urlParams ? `?${urlParams}` : ''}`);
  }, [buildParams, router, packageId]);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
    const urlParams = buildParams({ sort: sort !== 'default' ? sort : null });
    router.push(`/elements/${packageId}${urlParams ? `?${urlParams}` : ''}`);
  }, [buildParams, router, packageId]);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    const urlParams = buildParams({ category: category || null });
    router.push(`/elements/${packageId}${urlParams ? `?${urlParams}` : ''}`);
  }, [buildParams, router, packageId]);

  const handleTagsChange = useCallback((newTags: string[]) => {
    setSelectedTags(newTags);
    const urlParams = buildParams({ tags: newTags.length > 0 ? newTags.join(',') : null });
    router.push(`/elements/${packageId}${urlParams ? `?${urlParams}` : ''}`);
  }, [buildParams, router, packageId]);

  const handleClearAll = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTags([]);
    setSortBy('default');
    router.push(`/elements/${packageId}`);
  }, [router, packageId]);

  return (
    <div className="space-y-6">
      <Divider className='mt-16 mb-12 ' />
      <div className="hidden grid grid-cols-[400px_1fr] items-center pb-3 pt-2">
        <div className="flex justify-center">
          <ElementsSearchHeader
            className="lg:w-[400px]"
            currentQuery={searchQuery}
            pathname={`/elements/${packageId}`}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <ElementsSortDropdown
            currentSort={sortBy}
            onSortChange={handleSortChange}
          />
          <div className="h-4 w-[1px] bg-background-700 mx-1" />
          <ElementsLayoutToggle />
          <ElementsFilterPopover
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            onCategoryChange={handleCategoryChange}
            onTagsChange={handleTagsChange}
            onClearAll={handleClearAll}
          />
        </div>
      </div>
      <ElementsGridClient elements={filteredElements} packageId={packageId} isPremium={isPremium} />
    </div>
  );
}
