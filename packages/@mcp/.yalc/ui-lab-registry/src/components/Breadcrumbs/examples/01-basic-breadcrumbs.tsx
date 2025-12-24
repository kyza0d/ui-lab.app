import { Breadcrumbs, Breadcrumb } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Breadcrumbs',
  description: 'A simple breadcrumb navigation showing the current page location. Use this to help users understand their position in the site hierarchy.'
};

export default function Example() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/products">Products</Breadcrumb>
      <Breadcrumb href="/products/electronics">Electronics</Breadcrumb>
      <Breadcrumb>Laptop</Breadcrumb>
    </Breadcrumbs>
  );
}
