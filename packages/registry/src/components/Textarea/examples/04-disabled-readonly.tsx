import { TextArea, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Disabled & Read-only',
  description: 'Side-by-side disabled and read-only states to compare their visual treatment.'
};

export default function Example() {
  return (
    <Flex direction="column" gap="md" style={{ width: 380 }}>
      <TextArea
        value="This field is disabled and cannot be edited."
        disabled
        rows={2}
        resizable={false}
      />
      <TextArea
        value="This is a read-only note visible to all team members."
        readOnly
        rows={2}
        resizable={false}
      />
    </Flex>
  );
}
