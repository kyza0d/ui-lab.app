import { Expand, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Reveal Directions',
  description: 'Content can reveal from above or horizontally using the from prop on Expand.Content.',
};

export default function Example() {
  return (
    <Flex direction="column" gap="lg" className="w-full max-w-sm">
      <div>
        <p className="text-xs text-foreground-500 mb-2 px-1">from="above"</p>
        <div className="border border-background-700 rounded-sm">
          <Expand title="Reveal above">
            <Expand.Content from="above">
              <p className="text-sm text-foreground-400 px-3 py-3">This content slides in from above the trigger.</p>
            </Expand.Content>
          </Expand>
        </div>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2 px-1">from="right"</p>
        <div className="border border-background-700 rounded-sm">
          <Expand title="Reveal right">
            <Expand.Content from="right">
              <p className="text-sm text-foreground-400 px-3 py-3">Expands horizontally to the right.</p>
            </Expand.Content>
          </Expand>
        </div>
      </div>
    </Flex>
  );
}
