import { Breadcrumbs, Breadcrumb } from 'ui-lab-components';
import { ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-breadcrumbs.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-basic-breadcrumbs', Component: Example1, metadata: metadata1 },
];

const breadcrumbsBasicCode = `import { Breadcrumbs, Breadcrumb } from "ui-lab-components";

export function Example() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/products">Products</Breadcrumb>
      <Breadcrumb>Electronics</Breadcrumb>
    </Breadcrumbs>
  );
}`;

export const breadcrumbsDetail: ComponentDetail = {
  id: 'breadcrumbs',
  name: 'Breadcrumbs',
  description: 'A navigation component that displays the current page location in a site hierarchy.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Breadcrumbs component helps users understand their location within a website's hierarchy and provides quick navigation to parent pages. It displays a trail of links separated by visual dividers.
      </p>
      <p>
        Built with React Aria for full accessibility support, including keyboard navigation and screen reader compatibility. The current page is automatically marked with proper ARIA attributes.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: breadcrumbsBasicCode,
      preview: (
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb href="/products">Products</Breadcrumb>
          <Breadcrumb>Electronics</Breadcrumb>
        </Breadcrumbs>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard breadcrumb navigation with links',
      code: breadcrumbsBasicCode,
      preview: (
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb href="/products">Products</Breadcrumb>
          <Breadcrumb>Electronics</Breadcrumb>
        </Breadcrumbs>
      ),
    },
  ],
};

export * from './examples';
