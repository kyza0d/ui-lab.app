'use client';
import { Badge } from 'ui-lab-components';

const statusVariant = {
  active: 'success',
  beta: 'warning',
  deprecated: 'danger',
  draft: 'default',
} as const;

function BadgeRowMixed({ items }: { items: { label: string; status: keyof typeof statusVariant }[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Badge key={item.label} size="sm" variant={statusVariant[item.status] ?? 'default'}>{item.label}</Badge>
      ))}
    </div>
  );
}

export function BadgeRowMixedDemo() {
  return (
    <div className="p-6 flex flex-col gap-6 max-w-md w-full">
      <BadgeRowMixed items={[
        { label: 'Stable', status: 'active' },
        { label: 'Beta', status: 'beta' },
        { label: 'Deprecated', status: 'deprecated' },
        { label: 'Draft', status: 'draft' },
      ]} />
    </div>
  );
}
