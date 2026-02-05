export function organizeFilesIntoSections(metadata, domain) {
  const sectionMap = new Map();

  for (const item of metadata) {
    if (!item.category) continue;

    if (!sectionMap.has(item.category)) {
      sectionMap.set(item.category, []);
    }
    sectionMap.get(item.category).push(item);
  }

  const sections = Array.from(sectionMap.entries())
    .map(([label, items]) => ({
      label,
      items: items
        .sort((a, b) => a.order - b.order)
        .map(item => ({
          id: item.slug,
          label: item.title,
        })),
    }))
    .sort((a, b) => {
      const order = getDynamicSectionOrder(Array.from(sectionMap.keys()), domain);
      return (order.indexOf(a.label) ?? 999) - (order.indexOf(b.label) ?? 999);
    });

  return sections;
}

export function buildFileMap(metadata) {
  const fileMap = {};
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

function getDynamicSectionOrder(foundSections, domain) {
  const preferredOrder = {
    docs: ['Getting Started', 'Customization', 'Agents & MCPs', 'Development', 'Architecture & Advanced'],
    'agents-mcps': ['Getting Started', 'Concepts', 'Building Workflows', 'Reference', 'Technical Reference', 'AI Integration', 'Development'],
    cli: ['Getting Started', 'Advanced'],
    'design-system': ['Foundation', 'Systems', 'Guidelines'],
  };

  const order = preferredOrder[domain] || [];
  const foundSectionSet = new Set(foundSections);

  const inOrder = order.filter(s => foundSectionSet.has(s));
  const notInOrder = foundSections.filter(s => !order.includes(s));

  return [...inOrder, ...notInOrder.sort()];
}
