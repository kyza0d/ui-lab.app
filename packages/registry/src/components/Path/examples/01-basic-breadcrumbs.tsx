import { PathItem, Path } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Path',
  description: 'A simple path navigation showing the current page location. Use this to help users understand their position in the site hierarchy.'
};

export default function Example() {
  return (
    <Path>
      <PathItem href="/">Home</PathItem>
      <PathItem href="/products">Products</PathItem>
      <PathItem href="/products/electronics">Electronics</PathItem>
      <PathItem>Laptop</PathItem>
    </Path>
  );
}
