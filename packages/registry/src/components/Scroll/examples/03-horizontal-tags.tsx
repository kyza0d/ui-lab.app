import { Scroll } from 'ui-lab-components';

export const metadata = {
  title: 'Horizontal Tag List',
  description: 'Horizontally scrollable row of filter tags that overflow their container.'
};

const TAGS = [
  "authentication", "payments", "webhooks", "analytics", "notifications",
  "billing", "user-management", "api-keys", "rate-limiting", "audit-logs",
  "exports", "integrations", "search", "permissions", "reports",
];

export default function Example() {
  return (
    <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>Filter by topic</span>
      <Scroll direction="horizontal" maxWidth="420px" hide={false} inline>
        <div style={{ display: 'flex', gap: 6, padding: '2px 0' }}>
          {TAGS.map((tag) => (
            <span key={tag} style={{
              whiteSpace: 'nowrap',
              padding: '3px 10px',
              border: '1px solid var(--color-border)',
              borderRadius: 4,
              fontSize: 12,
              color: 'var(--color-foreground)',
              cursor: 'default',
              background: 'var(--color-background-900)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
