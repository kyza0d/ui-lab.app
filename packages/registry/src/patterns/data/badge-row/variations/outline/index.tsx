'use client';
import { Badge } from 'ui-lab-components';

function BadgeRowOutline({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => <Badge key={tag} size="sm" variant="default">{tag}</Badge>)}
    </div>
  );
}

export function BadgeRowOutlineDemo() {
  return (
    <div className="p-6 flex flex-col gap-6 max-w-md w-full">
      <BadgeRowOutline tags={['Design Systems', 'Figma', 'Tokens', 'Components']} />
      <BadgeRowOutline tags={['Node.js', 'Postgres', 'Redis', 'Docker', 'K8s']} />
    </div>
  );
}
