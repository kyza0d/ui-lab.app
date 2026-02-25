'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Expand, Group, Divider } from 'ui-lab-components';
import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { SiClaude, SiOpenai, SiGooglegemini } from 'react-icons/si';
import { sourceUrls } from 'ui-lab-registry';

export function OpenPage({ componentId }: { componentId?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const githubUrl = componentId
    ? sourceUrls[componentId]
    : `https://github.com/kyza0d/ui-lab.app/blob/master/apps/site/content${pathname}.mdx`;

  const prompt = encodeURIComponent(`Read this and help me understand it: ${githubUrl}`);

  const options = [
    ...(githubUrl ? [{ label: 'Open in GitHub', Icon: FaGithub, href: githubUrl }] : []),
    { label: 'Open in Claude', Icon: SiClaude, href: `https://claude.ai/new?q=${prompt}` },
    { label: 'Open in ChatGPT', Icon: SiOpenai, href: `https://chatgpt.com/?q=${prompt}` },
    { label: 'Open in Gemini', Icon: SiGooglegemini, href: `https://gemini.google.com/app?q=${prompt}` },
  ];

  return (
    <Expand isExpanded={isOpen} onExpandedChange={setIsOpen} className='w-65'>
      <Expand.Trigger>
        <Group>
          <div className="w-10 bg-background-800 flex items-center px-3 text-foreground-400 text-sm font-medium">
            <FaArrowUpRightFromSquare size={13} />
          </div>
          <Divider />
          <Group.Button
            onClick={() => setIsOpen(o => !o)}
            variant='outline'
            title="Open this page in another app"
            className="text-xs w-55 justify-start"
          >
            Open Page
            <Expand.Icon className='ml-auto text-foreground-400 bg-transparent' />
          </Group.Button>
        </Group>
      </Expand.Trigger>
      <Expand.Content from="below" className='w-[calc(100%-var(--radius-md))] mx-auto -mt-(--border-width-base)'>
        <div className="flex flex-col pt-2 overflow-hidden">
          {options.map(({ label, Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex rounded-sm items-center text-xs text-foreground-400 hover:text-foreground-50 hover:bg-background-800 active:bg-background-700"
            >
              <span className="flex items-center justify-center px-3 py-2 text-sm">
                <Icon />
              </span>
              <span className="flex-1 py-2">{label}</span>
              <span className="px-3 py-2 opacity-60">
                <FaArrowUpRightFromSquare size={10} />
              </span>
            </a>
          ))}
        </div>
      </Expand.Content>
    </Expand>
  );
}
