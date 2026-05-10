'use client';

import { useState } from 'react';
import { Expand, Flex, Group } from 'ui-lab-components';
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
    <Group.Expand styles="w-full">
      <Expand.Trigger className="rounded-none">
        <Flex className="h-12 w-full cursor-pointer">
          <span className="flex items-center justify-center pl-3 text-foreground-400 text-sm font-medium">
            {copiedLines !== null ? <FaCheck size={12} className="text-foreground-400" /> : <FaFileLines />}
          </span>
          <span className="flex w-full items-center justify-start pl-4 text-xs font-medium text-foreground-300">
            {copiedLines !== null ? `Copied ${copiedLines} lines!` : 'Copy Markdown'}
            <Expand.Icon className="ml-auto bg-transparent text-foreground-400" />
          </span>
        </Flex>
      </Expand.Trigger>

      <Expand.Content from="below" className="-mt-(--border-width-base)">
        <div className="flex flex-col overflow-hidden">
          <button
            type="button"
            onClick={() => {
              void handleCopy();
            }}
            className="flex py-2.5 cursor-pointer items-center text-left text-xs font-medium text-foreground-400 hover:bg-background-800 hover:text-foreground-50 active:bg-background-700"
          >
            <span className="flex-1 px-3">Copy rendered content as Markdown</span>
          </button>
        </div>
      </Expand.Content>
    </Group.Expand>
  );
}
