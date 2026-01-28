import React, { useState } from 'react';

interface Section {
  id: string;
  title: string;
  subsections?: Section[];
}

interface ExpandableTableOfContentsProps {
  activeSection?: string;
}

export function ExpandableTableOfContents({ activeSection }: ExpandableTableOfContentsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['concepts']));

  const sections: Section[] = [
    {
      id: 'intro',
      title: 'Introduction',
    },
    {
      id: 'concepts',
      title: 'Core Concepts',
      subsections: [
        { id: 'fundamentals', title: 'Fundamentals' },
        { id: 'advanced', title: 'Advanced Topics' },
      ],
    },
    {
      id: 'implementation',
      title: 'Implementation',
    },
    {
      id: 'examples',
      title: 'Examples',
    },
  ];

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const renderSection = (section: Section, depth = 0) => {
    const isExpanded = expandedSections.has(section.id);
    const isActive = activeSection === section.id;
    const hasSubsections = section.subsections && section.subsections.length > 0;

    return (
      <div key={section.id}>
        <button
          onClick={() => hasSubsections && toggleSection(section.id)}
          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
            isActive ? 'bg-accent-500 text-foreground-50 font-medium' : 'text-foreground-400 hover:text-foreground-200'
          } ${hasSubsections ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <div className="flex items-center gap-2">
            {hasSubsections && (
              <span className="w-4 flex items-center justify-center">
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
            {!hasSubsections && <span className="w-4" />}
            <span>{section.title}</span>
          </div>
        </button>
        {hasSubsections && isExpanded && (
          <div className="ml-2 space-y-1 mt-1">
            {section.subsections?.map((subsection) =>
              renderSection(subsection, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-background-800 border border-background-700 rounded-md p-4">
      <div className="text-sm font-semibold text-foreground-200 mb-4">Table of Contents</div>
      <div className="space-y-1">
        {sections.map((section) => renderSection(section))}
      </div>
    </nav>
  );
}
