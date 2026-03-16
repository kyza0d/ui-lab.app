import { Group } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Group',
  description: 'A simple group container that arranges multiple elements together. Use this to organize related UI elements in a consistent layout.'
};

export default function Example() {
  return (
    <Group>
      <Group.Button>First</Group.Button>
      <Group.Button>Second</Group.Button>
      <Group.Button>Third</Group.Button>
    </Group>
  );
}
