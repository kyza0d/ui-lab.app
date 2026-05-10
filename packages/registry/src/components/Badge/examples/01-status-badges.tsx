import { Badge, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Status Labels',
  description: 'Inline status labels alongside text content, such as document or workflow states.',
};

export default function Example() {
  return (
    <Flex gap="sm" align="center" justify="center" wrap="wrap">
      <Badge variant="default">Draft</Badge>
      <Badge variant="default">In Review</Badge>
      <Badge variant="default">Published</Badge>
      <Badge variant="default">Archived</Badge>
    </Flex>
  );
}
