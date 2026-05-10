import { Switch } from 'ui-lab-components';

export const metadata = {
  title: 'Disabled State',
  description: 'Switch in both on and off disabled states.'
};

export default function Example() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch aria-label="Off disabled" isDisabled defaultSelected={false} />
        <span className="text-sm text-muted-foreground">Disabled off</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch aria-label="On disabled" isDisabled defaultSelected={true} />
        <span className="text-sm text-muted-foreground">Disabled on</span>
      </div>
    </div>
  );
}
