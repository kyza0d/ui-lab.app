import { Badge, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Semantic Colors',
  description: 'Badges styled with design system semantic color tokens for success, warning, danger, info, and accent states.',
};

export default function Example() {
  return (
    <Flex gap="sm" align="center" justify="center" wrap="wrap">
      <Badge className="bg-success-500/20 text-success-500 border-none">Success</Badge>
      <Badge className="bg-warning-500/20 text-warning-500 border-none">Warning</Badge>
      <Badge className="bg-danger-500/20 text-danger-500 border-none">Danger</Badge>
      <Badge className="bg-info-500/20 text-info-500 border-none">Info</Badge>
      <Badge className="bg-accent-500/20 text-accent-500 border-none">Accent</Badge>
    </Flex>
  );
}
