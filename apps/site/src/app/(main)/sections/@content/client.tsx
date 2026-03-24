'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import { getAllSections, searchSections } from 'ui-lab-registry';
import type { SectionMetadata } from 'ui-lab-registry';
import { GenericContentGrid } from '@/features/layout';
import { getLayoutConfig as getSectionLayoutConfig, getPreviewComponent as getSectionPreview } from '@/features/sections';
import { ElementsSearchHeader, ElementsSortDropdown, ElementsFilterPopover } from '@/features/packages';
import { GridCTA } from '@/features/landing/components/grid-cta';

const placeholderSections: SectionMetadata[] = [
  {
    id: 'advanced-hero',
    name: 'Advanced Hero',
    description: 'Premium hero section with animated backgrounds and sophisticated typography.',
    category: 'hero',
    tags: ['premium', 'advanced', 'animation'],
    variants: []
  },
  {
    id: 'custom-cta',
    name: 'Custom CTA',
    description: 'Advanced call-to-action section with interactive elements and conversion optimization.',
    category: 'cta',
    tags: ['premium', 'conversion', 'interactive'],
    variants: []
  }
];

function sortSections(sections: SectionMetadata[], sortBy: string): SectionMetadata[] {
  const sorted = [...sections];
  switch (sortBy) {
    case 'az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'za':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'default':
    case 'newest':
    default:
      return sorted.reverse();
  }
}

export default function SectionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allSections = useMemo(() => {
    const sections = getAllSections();
    return [...placeholderSections, ...sections];
  }, []);

  const filteredSections = useMemo(() => {
    let sections = allSections;
    if (searchQuery.trim()) {
      sections = searchSections(searchQuery);
      sections = [...sections, ...placeholderSections.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )];
    }
    if (selectedCategory) {
      sections = sections.filter((s) => s.category === selectedCategory);
    }
    if (selectedTags.length > 0) {
      sections = sections.filter((s) =>
        selectedTags.some((tag) => s.tags.includes(tag))
      );
    }
    return sortSections(sections, sortBy);
  }, [allSections, searchQuery, selectedCategory, selectedTags, sortBy]);

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
    router.push(`/sections${params ? '?' + params : ''}`);
  }, [buildParams, router]);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
    const params = buildParams({ sort: sort !== 'default' ? sort : null });
    router.push(`/sections${params ? '?' + params : ''}`);
  }, [buildParams, router]);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    const params = buildParams({ category: category || null });
    router.push(`/sections${params ? '?' + params : ''}`);
  }, [buildParams, router]);

  const handleTagsChange = useCallback((newTags: string[]) => {
    setSelectedTags(newTags);
    const params = buildParams({ tags: newTags.length > 0 ? newTags.join(',') : null });
    router.push(`/sections${params ? '?' + params : ''}`);
  }, [buildParams, router]);

  const handleClearAll = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTags([]);
    setSortBy('default');
    router.push('/sections');
  }, [router]);

  return (
    <div className='mt-20 pt-(header-height) pointer-events-none'>
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="space-y-6">
          <div className="relative overflow-hidden h-screen">
            <div>
              <div className="grid grid-cols-[400px_1fr] items-center pb-3 pt-2">
                <div className="flex justify-center">
                  <ElementsSearchHeader
                    className="lg:w-[400px]"
                    currentQuery={searchQuery}
                    pathname="/sections"
                    onSearch={handleSearch}
                  />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <ElementsSortDropdown
                    currentSort={sortBy}
                    onSortChange={handleSortChange}
                  />
                  <div className="h-4 w-[1px] bg-background-700 mx-1" />
                  <ElementsFilterPopover
                    selectedCategory={selectedCategory}
                    selectedTags={selectedTags}
                    onCategoryChange={handleCategoryChange}
                    onTagsChange={handleTagsChange}
                    onClearAll={handleClearAll}
                  />
                </div>
              </div>
              <GenericContentGrid
                items={filteredSections}
                basePath="/sections"
                layoutConfigs={Object.fromEntries(filteredSections.map(s => [s.id, { ...getSectionLayoutConfig(s), columnSpan: 1 }]))}
                previews={Object.fromEntries(filteredSections.map(s => { const C = getSectionPreview(s.id); return [s.id, C ? <C key={s.id} /> : null]; }))}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-background-950/60 from-0% via-background-950/90 via-40% to-background-950 pointer-events-none z-20" />
            <div className="absolute left-0 right-0 top-1/3 -translate-y-1/2 flex justify-center z-30 pointer-events-auto px-6 py-16">
              <GridCTA contentType="sections" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
