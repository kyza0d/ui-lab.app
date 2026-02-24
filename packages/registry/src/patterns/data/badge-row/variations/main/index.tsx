'use client';
import { Badge } from 'ui-lab-components';

function BadgeRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => <Badge key={tag} size="sm">{tag}</Badge>)}
    </div>
  );
}

export function BadgeRowDemo() {
  return (
    <div className="p-6 flex flex-col gap-6 max-w-md w-full">
      <BadgeRow tags={['React', 'TypeScript', 'Next.js', 'Tailwind']} />
      <BadgeRow tags={['API Design', 'REST', 'GraphQL', 'WebSockets', 'Auth']} />
    </div>
  );
}
