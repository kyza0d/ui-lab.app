'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Header from './Header';

export function HeaderClient() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const currentQuery = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const selectedCategory = searchParams.get('category') || null;
  const selectedTags = (() => {
    const tagsParam = searchParams.get('tags');
    return tagsParam ? tagsParam.split(',').filter(Boolean) : [];
  })();

  return (
    <Header
      pathname={pathname}
      currentQuery={currentQuery}
      currentSort={currentSort}
      selectedCategory={selectedCategory}
      selectedTags={selectedTags}
      onSearch={handleSearch}
      onSortChange={handleSortChange}
      onCategoryChange={handleCategoryChange}
      onTagsChange={handleTagsChange}
      onClearFilters={handleClearFilters}
    />
  );
}
