import { SIDEBAR_REGISTRY } from './generated-sidebar-registry';

export function getSectionsForDomain(domain: string) {
  const domainKey = domain as keyof typeof SIDEBAR_REGISTRY;
  return SIDEBAR_REGISTRY[domainKey]?.sections ?? [];
}

export function getFileMetadata(domain: string, slug: string) {
  const domainKey = domain as keyof typeof SIDEBAR_REGISTRY;
  return SIDEBAR_REGISTRY[domainKey]?.fileMap[slug] ?? null;
}

export function getAllSlugsForDomain(domain: string) {
  const sections = getSectionsForDomain(domain);
  return sections.flatMap(s => s.items.map(i => i.id));
}

export function validateSlugExists(domain: string, slug: string) {
  const allSlugs = getAllSlugsForDomain(domain);
  return allSlugs.includes(slug);
}
