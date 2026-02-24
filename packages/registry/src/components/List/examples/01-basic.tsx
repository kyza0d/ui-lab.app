import { List } from 'ui-lab-components';
import { Button } from 'ui-lab-components';

export const metadata = {
  title: 'Basic List',
  description: 'A simple list displaying basic items with selection and interaction support.',
};

export default function Example() {
  return (
    <List aria-label="Basic List Example">
      <List.Header>
        <h2>Items</h2>
      </List.Header>
      <List.Item interactive>Item One</List.Item>
      <List.Item interactive>Item Two</List.Item>
      <List.Item interactive>Item Three</List.Item>
      <List.Footer align="center">
        <Button variant="primary" size="sm">
          Load More
        </Button>
      </List.Footer>
    </List>
  );
}
