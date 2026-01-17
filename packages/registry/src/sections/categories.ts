export type SectionCategoryId = 'hero' | 'cta' | 'features' | 'testimonials' | 'pricing' | 'faq' | 'contact' | 'other';

export interface SectionCategoryDefinition {
  id: SectionCategoryId;
  name: string;
  label: string;
  description: string;
}

export const sectionCategories: Record<SectionCategoryId, SectionCategoryDefinition> = {
  hero: {
    id: 'hero',
    name: 'Hero Sections',
    label: 'Hero',
    description: 'Full-width introductory sections with headlines and CTAs',
  },
  cta: {
    id: 'cta',
    name: 'Call to Action',
    label: 'CTA',
    description: 'Action-focused sections encouraging user interaction',
  },
  features: {
    id: 'features',
    name: 'Features',
    label: 'Features',
    description: 'Showcase product or service features',
  },
  testimonials: {
    id: 'testimonials',
    name: 'Testimonials',
    label: 'Testimonials',
    description: 'Social proof and customer testimonials',
  },
  pricing: {
    id: 'pricing',
    name: 'Pricing',
    label: 'Pricing',
    description: 'Pricing tables and plans',
  },
  faq: {
    id: 'faq',
    name: 'FAQ',
    label: 'FAQ',
    description: 'Frequently asked questions sections',
  },
  contact: {
    id: 'contact',
    name: 'Contact',
    label: 'Contact',
    description: 'Contact forms and information',
  },
  other: {
    id: 'other',
    name: 'Other',
    label: 'Other',
    description: 'Other section types',
  },
};

export function getCategoryForSection(sectionId: string): SectionCategoryId {
  const sectionCategoryMap: Record<string, SectionCategoryId> = {
    hero: 'hero',
  };
  return sectionCategoryMap[sectionId.toLowerCase()] ?? 'other';
}

export function groupSectionsByCategory(sections: Array<{ id: string; category: SectionCategoryId }>) {
  const grouped: Record<SectionCategoryId, Array<{ id: string; category: SectionCategoryId }>> = {
    hero: [],
    cta: [],
    features: [],
    testimonials: [],
    pricing: [],
    faq: [],
    contact: [],
    other: [],
  };

  sections.forEach(section => {
    grouped[section.category].push(section);
  });

  return grouped;
}

export function getSectionsInCategory(
  sections: Array<{ id: string; category: SectionCategoryId }>,
  categoryId: SectionCategoryId
) {
  return sections.filter(s => s.category === categoryId);
}

export function getCategoriesWithSections(
  sections: Array<{ id: string; category: SectionCategoryId }>
): SectionCategoryDefinition[] {
  const grouped = groupSectionsByCategory(sections);
  return Object.entries(grouped)
    .filter(([_, items]) => items.length > 0)
    .map(([categoryId]) => sectionCategories[categoryId as SectionCategoryId]);
}
