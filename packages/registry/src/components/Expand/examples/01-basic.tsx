import { Expand } from 'ui-lab-components';

export const metadata = {
  title: 'Basic',
  description: 'Preset mode using the title prop — the simplest way to render a labeled expandable section.',
};

export default function Example() {
  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700">
      <Expand title="What is UI Lab?">
        <p className="text-sm text-foreground-400 px-3 py-3">
          UI Lab is a component library built for building beautiful, accessible interfaces with a consistent design system.
        </p>
      </Expand>
    </div>
  );
}
