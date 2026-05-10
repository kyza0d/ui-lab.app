import { Checkbox, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Helper and Error Text',
  description: 'A labeled checkbox can include supporting text and an invalid state for form feedback.',
};

export default function Example() {
  return (
    <Flex direction="column" gap="lg" style={{ width: 320 }}>
      <Checkbox
        id="helper-release-notes"
        label="Release notes"
        helper="Get a short product update when a new version ships."
        defaultChecked
      />
      <Checkbox
        id="helper-terms"
        label="Accept terms"
        helper="You must accept the terms before continuing."
        helperTextError
        aria-invalid="true"
      />
    </Flex>
  );
}
