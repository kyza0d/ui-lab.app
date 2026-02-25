'use client';

import { useState } from 'react';
import { Expand, Group, Divider } from 'ui-lab-components';
import { FaCheck, FaFileLines } from 'react-icons/fa6';
import { generatedAPI, generatedStyles } from 'ui-lab-registry';
import { getComponentById } from '@/features/component-docs';

type CopySource = 'examples' | 'api' | 'styles';

function buildExamplesMarkdown(componentId: string): string {
  const component = getComponentById(componentId);
  if (!component) return '';
  const lines = [`# ${component.name}\n\n${component.description}`];
  component.examples.forEach((ex) => {
    if (ex.title) lines.push(`\n## ${ex.title}`);
    if (ex.description) lines.push(ex.description);
    lines.push(`\`\`\`tsx\n${ex.code}\n\`\`\``);
  });
  return lines.join('\n');
}

function buildAPIMarkdown(componentId: string): string {
  const api = generatedAPI[componentId];
  if (!api) return '';
  const name = componentId.charAt(0).toUpperCase() + componentId.slice(1);
  const lines = [`# ${name} API`];
  if (api.props?.length) {
    lines.push('\n## Props\n');
    lines.push('| Prop | Type | Required | Default | Description |');
    lines.push('|------|------|----------|---------|-------------|');
    api.props.forEach((p) => {
      const type = p.enumValues?.length ? p.enumValues.map((v) => `"${v}"`).join(' | ') : p.type;
      const def = p.defaultValue ? `\`${p.defaultValue}\`` : '-';
      lines.push(`| \`${p.name}\` | \`${type}\` | ${p.required ? 'Yes' : 'No'} | ${def} | ${p.description || '-'} |`);
    });
  }
  const subs = api.subComponents;
  if (subs && Object.keys(subs).length > 0) {
    lines.push('\n## Sub-Components');
    Object.entries(subs).forEach(([subName, sub]: [string, any]) => {
      lines.push(`\n### ${subName}`);
      if (sub.description) lines.push(sub.description);
      if (sub.props?.length) {
        lines.push('\n| Prop | Type | Required | Description |');
        lines.push('|------|------|----------|-------------|');
        sub.props.forEach((p: any) => {
          const type = p.enumValues?.length ? p.enumValues.map((v: string) => `"${v}"`).join(' | ') : p.type;
          lines.push(`| \`${p.name}\` | \`${type}\` | ${p.required ? 'Yes' : 'No'} | ${p.description || '-'} |`);
        });
      }
    });
  }
  return lines.join('\n');
}

function buildStylesMarkdown(componentId: string): string {
  const styles = generatedStyles[componentId];
  if (!styles) return '';
  const name = componentId.charAt(0).toUpperCase() + componentId.slice(1);
  return `# ${name} Styles\n\n\`\`\`css\n${styles}\n\`\`\``;
}

const copyOptions: { label: string; source: CopySource }[] = [
  { label: 'Copy Examples', source: 'examples' },
  { label: 'Copy API', source: 'api' },
  { label: 'Copy Styles', source: 'styles' },
];

export function CopyComponentPage({ componentId }: { componentId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<{ source: CopySource; lines: number } | null>(null);

  const handleCopy = async (source: CopySource) => {
    let markdown = '';
    if (source === 'examples') markdown = buildExamplesMarkdown(componentId);
    else if (source === 'api') markdown = buildAPIMarkdown(componentId);
    else markdown = buildStylesMarkdown(componentId);
    if (!markdown) return;
    await navigator.clipboard.writeText(markdown);
    setCopied({ source, lines: markdown.split('\n').length });
    setIsOpen(false);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Expand isExpanded={isOpen} onExpandedChange={setIsOpen} className='w-65'>
      <Expand.Trigger>
        <Group>
          <div className="w-10 bg-background-800 flex items-center px-3 text-foreground-400 text-sm font-medium">
            {copied ? <FaCheck size={12} className="text-foreground-400" /> : <FaFileLines />}
          </div>
          <Divider />
          <Group.Button
            onClick={() => setIsOpen(o => !o)}
            variant='outline'
            title="Copy component context as Markdown"
            className="text-xs w-55 justify-start"
          >
            {copied ? <>Copied {copied.lines} lines! <FaCheck size={12} className='text-foreground-400 ml-auto mr-3' /></> : <>Copy Markdown</>}
            {!copied && <Expand.Icon className='ml-auto text-foreground-400 bg-transparent' />}
          </Group.Button>
        </Group>
      </Expand.Trigger>
      <Expand.Content from="below" className='w-[calc(100%-var(--radius-md))] mx-auto -mt-(--border-width-base)'>
        <div className="flex flex-col pt-2 overflow-hidden rounded-b-sm">
          {copyOptions.map(({ label, source }) => (
            <button
              key={source}
              onClick={() => handleCopy(source)}
              className="flex items-center rounded-sm text-xs text-foreground-400 hover:text-foreground-50 hover:bg-background-800 active:bg-background-700 text-left"
            >
              <span className="flex items-center justify-center px-3 py-2 text-sm">
                {copied?.source === source ? <FaCheck /> : <FaFileLines />}
              </span>
              <span className="flex-1 py-2">{label}</span>
            </button>
          ))}
        </div>
      </Expand.Content>
    </Expand>
  );
}
