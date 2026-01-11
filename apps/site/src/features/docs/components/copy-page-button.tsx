'use client';

import { useState } from 'react';
import { Button } from 'ui-lab-components';
import TurndownService from 'turndown';
import { FaCopy } from 'react-icons/fa6';

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
    <Button
      onClick={handleCopy}
      className='ml-auto underline text-foreground-400'
      variant='ghost'
      title="Copy rendered content as Markdown"
    >
      {isCopied ? '✓ Copied' : 'Copy Page'}
    </Button>
  );
}
