'use client';

import { useState } from 'react';
import { Button, Divider, Group } from 'ui-lab-components';
import TurndownService from 'turndown';
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
    <Group className='w-65 h-12'>
      <div className="bg-background-800 w-10 flex items-center px-3 text-foreground-400 text-sm font-medium">
        <FaFileLines />
      </div>
      <Divider />
      <Group.Button
        onClick={handleCopy}
        variant='outline'
        title="Copy rendered content as Markdown"
        className="text-xs justify-start w-55"
      >

        {copiedLines !== null ? <>Copied {copiedLines} lines! <FaCheck size={12} className='text-foreground-400 ml-auto mr-3' /></> : <>Copy Markdown</>}
      </Group.Button>
    </Group>
  );
}
