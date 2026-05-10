import { Anchor, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Breadcrumb',
  description: 'Anchor used as navigational crumbs — the last segment is non-interactive text.',
};

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'ui-lab', href: '/projects/ui-lab' },
];

export default function Example() {
  return (
    <Flex gap="xs" align="center" className="text-sm">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-xs">
          {i > 0 && <span className="text-foreground-400 mx-1">/</span>}
          {i < crumbs.length - 1 ? (
            <Anchor href={crumb.href}>{crumb.label}</Anchor>
          ) : (
            <span className="text-foreground-400">{crumb.label}</span>
          )}
        </span>
      ))}
    </Flex>
  );
}
