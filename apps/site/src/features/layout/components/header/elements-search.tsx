'use client';

import { createContext, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ElementsSearchContextType {
  currentQuery: string;
  currentSort: string;
  selectedCategory: string | null;
  selectedTags: string[];
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
  onCategoryChange: (category: string | null) => void;
  onTagsChange: (tags: string[]) => void;
  onClearFilters: () => void;
}

const ElementsSearchContext = createContext<ElementsSearchContextType | null>(null);

export function useElementsSearch() {
  return useContext(ElementsSearchContext) || {
    currentQuery: '',
    currentSort: 'newest',
    selectedCategory: null,
    selectedTags: [],
    onSearch: () => {},
    onSortChange: () => {},
    onCategoryChange: () => {},
    onTagsChange: () => {},
    onClearFilters: () => {},
  };
}

export function ElementsHeaderSetup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    router.push(`${pathname}?${params.toString()}`);
  };

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

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('tags');
    router.push(`${pathname}?${params.toString()}`);
  };

  const value: ElementsSearchContextType = {
    currentQuery: searchParams.get('q') || '',
    currentSort: searchParams.get('sort') || 'newest',
    selectedCategory: searchParams.get('category') || null,
    selectedTags: (() => {
      const tagsParam = searchParams.get('tags');
      return tagsParam ? tagsParam.split(',').filter(Boolean) : [];
    })(),
    onSearch: handleSearch,
    onSortChange: handleSortChange,
    onCategoryChange: handleCategoryChange,
    onTagsChange: handleTagsChange,
    onClearFilters: handleClearFilters,
  };

  return (
    <ElementsSearchContext.Provider value={value}>
      {null}
    </ElementsSearchContext.Provider>
  );
}
