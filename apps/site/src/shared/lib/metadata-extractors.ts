export interface ExtractedMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface DocMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface ComponentMetadata {
  name?: string;
  description?: string;
}

export interface ElementMetadata {
  name?: string;
  description?: string;
}

function truncateDescription(description: string | undefined, maxLength: number = 160): string {
  if (!description || typeof description !== 'string') return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3).trimEnd() + '...';
}

function createFallbackDescription(title: string | undefined, type: 'component' | 'element' = 'component'): string {
  if (!title) return '';
  return `Learn about the ${title} ${type}.`;
}

export function extractDocMetadata(doc: DocMetadata): ExtractedMetadata {
  return {
    title: doc.title,
    description: truncateDescription(doc.description),
    keywords: doc.keywords,
  };
}

export function extractComponentMetadata(component: ComponentMetadata): ExtractedMetadata {
  const title = component.name;
  const description = truncateDescription(
    component.description || createFallbackDescription(title, 'component')
  );
  return { title, description };
}

export function extractElementMetadata(element: ElementMetadata): ExtractedMetadata {
  const title = element.name;
  const description = truncateDescription(
    element.description || createFallbackDescription(title, 'element')
  );
  return { title, description };
}
