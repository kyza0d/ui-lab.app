import { Card } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Card',
  description: 'A simple card container with header, body, and footer sections. Use this to group related content in your interface.'
};

export default function Example() {
  return (
    <Card>
      <Card.Header>
        <h3>Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p>This is the card content area where you can place any information or components.</p>
      </Card.Body>
      <Card.Footer>
        <p>Footer content</p>
      </Card.Footer>
    </Card>
  );
}
