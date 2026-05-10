import { Scroll } from 'ui-lab-components';

export const metadata = {
  title: 'Settings Panel',
  description: 'Constrained-height settings list with a custom scrollbar shown on hover.'
};

const SETTINGS_ITEMS = Array.from({ length: 18 }, (_, i) => ({
  label: `Option ${i + 1}`,
  description: `Configure behavior for setting ${i + 1}`,
}));

export default function Example() {
  return (
    <div style={{ width: 320, border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden', background: 'var(--color-background)' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', fontSize: 13, fontWeight: 500 }}>
        Preferences
      </div>
      <Scroll maxHeight="240px">
        <div style={{ padding: '8px 0' }}>
          {SETTINGS_ITEMS.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 16px',
              fontSize: 13,
              borderBottom: i < SETTINGS_ITEMS.length - 1 ? '1px solid var(--color-border)' : undefined,
            }}>
              <div>
                <div style={{ color: 'var(--color-foreground)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 1 }}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
