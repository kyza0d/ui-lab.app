import { Badge, Flex } from 'ui-lab-components';
import { FaCircleCheck, FaTriangleExclamation, FaArrowRight, FaStar } from 'react-icons/fa6';

export const metadata = {
  title: 'Icon Position',
  description: 'Icons placed on the left or right of the label — left for status/type indicators, right for directional cues.',
};

export default function Example() {
  return (
    <Flex gap="xs" align="center" justify="center" wrap="wrap">
      <Badge icon={{ left: <FaCircleCheck size={10} /> }}>Verified</Badge>
      <Badge icon={{ left: <FaTriangleExclamation size={10} /> }}>Warning</Badge>
      <Badge icon={{ right: <FaArrowRight size={10} /> }}>Continue</Badge>
      <Badge icon={{ right: <FaStar size={10} /> }}>Featured</Badge>
    </Flex>
  );
}
