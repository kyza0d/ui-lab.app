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
      const order = getDefaultSectionOrder(domain);
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

function getDefaultSectionOrder(domain) {
  const orders = {
    docs: ['Getting Started', 'Development', 'Architecture & Advanced'],
    'agents-mcps': ['Getting Started', 'Concepts', 'Building Workflows', 'AI Integration', 'Technical Reference', 'Development'],
    cli: ['Getting Started', 'Advanced Features', 'Advanced'],
    'design-system': ['Foundation', 'Systems', 'Guidelines'],
  };

  return orders[domain] || [];
}
