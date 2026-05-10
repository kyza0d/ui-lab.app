import { Expand } from 'ui-lab-components';

export const metadata = {
  title: 'Disabled State',
  description: 'An isDisabled section is visually dimmed and blocks interaction.',
};

export default function Example() {
  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700">
      <Expand title="Available section">
        <p className="text-sm text-foreground-400 px-3 py-3">This section is accessible and can be expanded.</p>
      </Expand>
      <Expand title="Restricted section" isDisabled>
        <p className="text-sm text-foreground-400 px-3 py-3">This content is not accessible.</p>
      </Expand>
    </div>
  );
}
