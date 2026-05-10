import { Slider } from 'ui-lab-components';

export const metadata = {
  title: 'Disabled State',
  description: 'Active and disabled sliders side by side.'
};

export default function Example() {
  return (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Active</span>
        <Slider aria-label="Active slider" defaultValue={40} className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Disabled</span>
        <Slider aria-label="Disabled slider" defaultValue={40} disabled className="flex-1" />
      </div>
    </div>
  );
}
