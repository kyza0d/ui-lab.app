interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const defaultItems: TOCItem[] = items || [
    { id: 'intro', title: 'Introduction', level: 1 },
    { id: 'overview', title: 'Overview', level: 2 },
    { id: 'getting-started', title: 'Getting Started', level: 2 },
    { id: 'install', title: 'Installation', level: 1 },
    { id: 'usage', title: 'Usage', level: 1 },
  ];

  return (
    <nav className="bg-background-800 border border-background-700 rounded-md p-4">
      <div className="text-sm font-semibold text-foreground-200 mb-4">Contents</div>
      <ul className="space-y-2 text-sm">
        {defaultItems.map((item) => (
          <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 12}px` }}>
            <a
              href={`#${item.id}`}
              className="text-foreground-400 hover:text-foreground-200 transition-colors"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
