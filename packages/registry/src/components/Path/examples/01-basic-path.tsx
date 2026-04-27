import { Path } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Path',
  description: 'A simple path navigation showing the current page location. Use this to help users understand their position in the site hierarchy.'
};

export default function Example() {
  return (
    <Path>
      <Path.Item href="/">Home</Path.Item>
      <Path.Item href="/products">Products</Path.Item>
      <Path.Item href="/products/electronics">Electronics</Path.Item>
      <Path.Item>Laptop</Path.Item>
    </Path>
  );
}
