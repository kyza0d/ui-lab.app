import { tocRegistry, type TocItem } from './generated-toc-registry';

type DocSection = 'docs' | 'cli' | 'design-system' | 'agents-mcps';

export function getTocItemsForSection(section: DocSection): TocItem[] {
  const indexKey = `${section}-index`;
  return tocRegistry[indexKey] || [];
}

export function getTocItemsForSlug(slug: string): TocItem[] {
  return tocRegistry[slug] || [];
}
