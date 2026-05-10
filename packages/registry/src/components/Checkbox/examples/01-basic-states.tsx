import { Checkbox, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Basic States',
  description: 'The default checkbox states: unchecked, checked, disabled, and disabled checked.',
};

export default function Example() {
  return (
    <Flex direction="column" gap="md" style={{ width: 280 }}>
      <Checkbox id="basic-unchecked" label="Unchecked" />
      <Checkbox id="basic-checked" label="Checked" defaultChecked />
      <Checkbox id="basic-disabled" label="Disabled" disabled />
      <Checkbox id="basic-disabled-checked" label="Disabled checked" disabled defaultChecked />
    </Flex>
  );
}
