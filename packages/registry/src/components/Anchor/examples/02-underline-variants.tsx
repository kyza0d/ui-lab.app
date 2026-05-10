import { Anchor, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Underline Variants',
  description: 'Three underline styles available via Anchor.Underline: solid (default), dashed, and dotted.',
};

export default function Example() {
  return (
    <Flex gap="lg" align="center">
      <Anchor href="#">
        Solid
      </Anchor>
      <Anchor href="#">
        <Anchor.Underline variant="dashed" />
        Dashed
      </Anchor>
      <Anchor href="#">
        <Anchor.Underline variant="dotted" />
        Dotted
      </Anchor>
    </Flex>
  );
}
