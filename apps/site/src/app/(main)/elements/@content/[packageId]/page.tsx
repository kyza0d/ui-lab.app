'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import { BreadcrumbsNav } from '@/features/navigation';
import { elementRegistry, getPackageById, getElementsInPackage, elementOrder } from 'ui-lab-registry';
import type { ElementMetadata } from 'ui-lab-registry';
import { ElementsGridClient, ElementsSearchHeader, ElementsFilterPopover, ElementsSortDropdown, ElementsLayoutToggle } from '@/features/elements';

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

export default function PackageElementsPage() {
  const router = useRouter();
  const params = useParams();
  const packageId = params.packageId as string;
  const pkg = getPackageById(packageId);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const packageElements = useMemo(() => {
    if (!pkg) return [];
    const elementIds = getElementsInPackage(packageId);
    return elementIds.map(id => elementRegistry[id]).filter(Boolean);
  }, [packageId, pkg]);

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

  if (!pkg) {
    return (
      <div className='pl-12 mt-38 pt-(header-height)'>
        <div className="w-full bg-background-950 px-4 mx-auto pb-12">
          <p className="text-foreground-400">Package not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='pl-12 mt-38 pt-(header-height)'>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="space-y-4 mb-12">
          <h2 className="font-bold text-foreground-50">{pkg.name}</h2>
          <p className="text-foreground-400 max-w-2xl">{pkg.description}</p>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-[400px_1fr] items-center pb-3 pt-2">
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
          <ElementsGridClient elements={filteredElements} packageId={packageId} />
        </div>
      </div>
    </div>
  );
}
