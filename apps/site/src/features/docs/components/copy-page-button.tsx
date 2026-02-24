'use client';

import { useState } from 'react';
import { Button, Divider, Group } from 'ui-lab-components';
import TurndownService from 'turndown';
import { FaCheck, FaClipboard, FaClipboardCheck, FaCopy, FaFileLines, FaPercent } from 'react-icons/fa6';

export function CopyPage() {
  const [isCopied, setIsCopied] = useState(false);

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
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Group>
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

        {isCopied ? <>Copied! <FaCheck className='ml-auto' /></> : <>Copy Markdown</>}
      </Group.Button>
    </Group>
  );
}
