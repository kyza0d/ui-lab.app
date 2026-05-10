'use client';

import { usePathname } from 'next/navigation';
import { Expand, Flex, Group } from 'ui-lab-components';
import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { SiClaude, SiOpenai, SiGooglegemini } from 'react-icons/si';
import { sourceUrls } from 'ui-lab-registry';

export function OpenPage({ componentId }: { componentId?: string }) {
  const pathname = usePathname();

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
    <Group.Expand styles="w-full">
      <Expand.Trigger className="rounded-none">
        <Flex className="h-12 cursor-pointer border-b border-background-700">
          <div className="flex items-center justify-center pl-3 text-foreground-400 text-sm font-medium">
            <FaArrowUpRightFromSquare size={13} />
          </div>
          <div
            title="Open this page in another app"
            className="flex w-full items-center justify-start pl-4 text-xs font-medium text-foreground-300"
          >
            Open Page
            <Expand.Icon className="ml-auto bg-transparent text-foreground-400" />
          </div>
        </Flex>
      </Expand.Trigger>
      <Expand.Content from="below" className="-mt-(--border-width-base) mx-0 border-b border-background-700">
        <div className="flex flex-col overflow-hidden">
          {options.map(({ label, Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex py-2.5 items-center text-xs text-foreground-400 hover:bg-background-800 hover:text-foreground-50 active:bg-background-700"
            >
              <span className="flex items-center justify-center px-3 text-sm">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex-1">{label}</span>
              <span className="px-3 opacity-60">
                <FaArrowUpRightFromSquare size={10} />
              </span>
            </a>
          ))}
        </div>
      </Expand.Content>
    </Group.Expand>
  );
}
