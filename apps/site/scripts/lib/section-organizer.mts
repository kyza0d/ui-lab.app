interface MetadataItem {
  category?: string;
  order: number;
  slug: string;
  title: string;
  description?: string;
}

interface SectionItem {
  id: string;
  label: string;
}

interface Section {
  label: string;
  items: SectionItem[];
}

type Domain = 'docs' | 'agents-mcps' | 'cli' | 'design-system';

export function organizeFilesIntoSections(metadata: MetadataItem[], domain: Domain): Section[] {
  const sectionMap = new Map<string, MetadataItem[]>();

  for (const item of metadata) {
    if (!item.category) continue;

    if (!sectionMap.has(item.category)) {
      sectionMap.set(item.category, []);
    }
    sectionMap.get(item.category)?.push(item);
  }

  const sections = Array.from(sectionMap.entries())
    .map(([label, items]) => ({
      label,
      items: items
        .sort((a: MetadataItem, b: MetadataItem) => a.order - b.order)
        .map((item: MetadataItem) => ({
          id: item.slug,
          label: item.title,
        })),
    }))
    .sort((a: Section, b: Section) => {
      const order = getDynamicSectionOrder(Array.from(sectionMap.keys()), domain);
      return (order.indexOf(a.label) ?? 999) - (order.indexOf(b.label) ?? 999);
    });

  return sections;
}

export function buildFileMap(metadata: MetadataItem[]): Record<string, Omit<MetadataItem, 'order'>> {
  const fileMap: Record<string, Omit<MetadataItem, 'order'>> = {};
  for (const item of metadata) {
    fileMap[item.slug] = {
      title: item.title,
      description: item.description,
      slug: item.slug,
      category: item.category,
    };
  }
  return fileMap;
}

function getDynamicSectionOrder(foundSections: string[], domain: Domain): string[] {
  const preferredOrder: Record<Domain, string[]> = {
    docs: ['Getting Started', 'Customization', 'Agents & MCPs', 'Development', 'Architecture & Advanced'],
    'agents-mcps': ['Getting Started', 'Concepts', 'Building Workflows', 'Reference', 'Technical Reference', 'AI Integration', 'Development'],
    cli: ['Getting Started', 'Advanced'],
    'design-system': ['Foundation', 'Systems', 'Guidelines'],
  };

  const order = preferredOrder[domain] || [];
  const foundSectionSet = new Set(foundSections);

  const inOrder = order.filter((s: string) => foundSectionSet.has(s));
  const notInOrder = foundSections.filter((s: string) => !order.includes(s));

  return [...inOrder, ...notInOrder.sort()];
}
