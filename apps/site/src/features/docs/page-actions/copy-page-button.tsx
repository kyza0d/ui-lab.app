'use client';

import { useState } from 'react';
import { Group } from 'ui-lab-components';
import { FaCheck, FaFileLines } from 'react-icons/fa6';

export function CopyPage() {
  const [copiedLines, setCopiedLines] = useState<number | null>(null);

  const handleCopy = async () => {
    try {
      const docContent = document.getElementById('doc-content');
      if (!docContent) {
        console.error('Doc content not found');
        return;
      }

      const html = docContent.innerHTML;
      const { default: TurndownService } = await import('turndown');
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
      });

      const markdown = turndownService.turndown(html);
      await navigator.clipboard.writeText(markdown);
      setCopiedLines(markdown.split('\n').length);
      setTimeout(() => setCopiedLines(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Group variant="ghost" className="h-12 w-full cursor-pointer">
      <div className="flex items-center justify-center pl-3 text-foreground-400 text-sm font-medium">
        <FaFileLines />
      </div>
      <div
        onClick={handleCopy}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleCopy();
        }}
        title="Copy rendered content as Markdown"
        className="flex w-full items-center justify-start pl-4 text-xs font-medium text-foreground-300"
        role="button"
        tabIndex={0}
      >
        {copiedLines !== null ? (
          <>
            Copied {copiedLines} lines!
            <FaCheck size={12} className="ml-auto mr-3 text-foreground-400" />
          </>
        ) : (
          <>Copy Markdown</>
        )}
      </div>
    </Group>
  );
}
