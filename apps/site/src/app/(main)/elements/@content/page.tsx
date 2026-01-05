'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import { BreadcrumbsNav } from '@/features/navigation';
import { elementsList, getAllCategories, getAllTags, searchElements } from 'ui-lab-registry';
import type { ElementMetadata } from 'ui-lab-registry';
import { ElementsGridClient } from '@/features/elements';

function sortElements(elements: ElementMetadata[], sortBy: string): ElementMetadata[] {
  const sorted = [...elements];
  switch (sortBy) {
    case 'az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'za':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
    default:
      return sorted.reverse();
  }
}

export default function ElementsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredElements = useMemo(() => {
    let elements = elementsList;
    if (searchQuery.trim()) {
      elements = searchElements(searchQuery);
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
  }, [searchQuery, selectedCategory, selectedTags, sortBy]);

  const buildParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    if (sortBy && sortBy !== 'newest') params.set('sort', sortBy);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    return params.toString();
  }, [searchQuery, selectedCategory, selectedTags, sortBy]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    const params = buildParams({ q: query || null });
    router.push(`/elements${params ? `?${params}` : ''}`);
  }, [buildParams, router]);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
    const params = buildParams({ sort: sort !== 'newest' ? sort : null });
    router.push(`/elements${params ? `?${params}` : ''}`);
  }, [buildParams, router]);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    const params = buildParams({ category: category || null });
    router.push(`/elements${params ? `?${params}` : ''}`);
  }, [buildParams, router]);

  const handleTagsChange = useCallback((newTags: string[]) => {
    setSelectedTags(newTags);
    const params = buildParams({ tags: newTags.length > 0 ? newTags.join(',') : null });
    router.push(`/elements${params ? `?${params}` : ''}`);
  }, [buildParams, router]);

  const handleClearAll = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTags([]);
    setSortBy('newest');
    router.push('/elements');
  }, [router]);

  return (
    <div className='pt-60'>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 mx-auto pb-12">
        <div className="space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-foreground-50">Elements</h2>
          <p className="text-foreground-400 max-w-2xl">
            Copy-paste ready UI elements built with UI Lab components. Click any element to view all variants and code.
          </p>
        </div>
        <div className="space-y-6">
          <ElementsGridClient elements={filteredElements} />
        </div>
      </div>
    </div>
  );
}
