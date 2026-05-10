import { Scroll } from 'ui-lab-components';

export const metadata = {
  title: 'Log Viewer',
  description: 'Vertically scrollable log output with fade mask to hint at overflow content.'
};

const LOG_ENTRIES = [
  { level: "info", msg: "Server started on port 3000" },
  { level: "info", msg: "Connected to database" },
  { level: "warn", msg: "Slow query detected: users.findAll (342ms)" },
  { level: "error", msg: "Failed to send email: SMTP timeout" },
  { level: "info", msg: "Cache warmed: 1,204 keys loaded" },
  { level: "info", msg: "Background job 'sync-orders' started" },
  { level: "warn", msg: "Memory usage at 78%" },
  { level: "info", msg: "Background job 'sync-orders' completed" },
  { level: "error", msg: "Unhandled rejection: Cannot read property 'id' of undefined" },
  { level: "info", msg: "Health check passed" },
  { level: "warn", msg: "Rate limit reached for IP 192.168.1.42" },
  { level: "info", msg: "User #4821 logged in" },
  { level: "info", msg: "Deployment complete: v2.14.0" },
];

export default function Example() {
  return (
    <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Application Logs
      </span>
      <div style={{ border: '1px solid var(--color-border)', borderRadius: 6, background: 'var(--color-background-900)', overflow: 'hidden' }}>
        <Scroll maxHeight="200px" fade-y fadeDistance={8} fadeSize={5}>
          <div style={{ padding: '8px 0' }}>
            {LOG_ENTRIES.map((entry, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 10,
                padding: '3px 12px',
                fontSize: 12,
                fontFamily: 'var(--font-mono, monospace)',
                color: entry.level === 'error'
                  ? 'var(--color-destructive)'
                  : entry.level === 'warn'
                    ? 'var(--color-warning, var(--color-muted))'
                    : 'var(--color-foreground)',
              }}>
                <span style={{ color: 'var(--color-muted)', minWidth: 36 }}>{entry.level}</span>
                <span>{entry.msg}</span>
              </div>
            ))}
          </div>
        </Scroll>
      </div>
    </div>
  );
}
