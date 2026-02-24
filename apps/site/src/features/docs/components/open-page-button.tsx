'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Expand, Group, Divider } from 'ui-lab-components';
import { FaGithub, FaArrowUpRightFromSquare, FaChevronDown } from 'react-icons/fa6';
import { SiClaude, SiOpenai, SiGooglegemini } from 'react-icons/si';
import { cn } from '@/shared';

const options = [
  {
    label: 'Open in GitHub',
    Icon: FaGithub,
    getHref: (pathname: string) =>
      `https://github.com/kyza0d/ui-lab.app/blob/main/apps/site/content${pathname}.mdx`,
  },
  {
    label: 'Open in Claude',
    Icon: SiClaude,
    getHref: () => 'https://claude.ai',
  },
  {
    label: 'Open in ChatGPT',
    Icon: SiOpenai,
    getHref: () => 'https://chatgpt.com',
  },
  {
    label: 'Open in Gemini',
    Icon: SiGooglegemini,
    getHref: () => 'https://gemini.google.com',
  },
];

export function OpenPage() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Expand isExpanded={isOpen} onExpandedChange={setIsOpen}>
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
      <Expand.Content from="above" className='w-58 ml-4 -mb-(--border-width-base)'>
        <div className="flex flex-col border border-t-0 border-background-700 overflow-hidden rounded-t-sm">
          {options.map(({ label, Icon, getHref }) => (
            <a
              key={label}
              href={getHref(pathname)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-foreground-400 hover:text-foreground-50 hover:bg-background-800 active:bg-background-700"
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
