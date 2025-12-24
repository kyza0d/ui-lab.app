import type { ElementMetadata } from '../../types';

export const card: ElementMetadata = {
  id: 'card',
  name: 'Card',
  description: 'Reusable card component for displaying content with various layouts',
  category: 'card',
  tags: ['card', 'content', 'layout'],
  componentDependencies: ['Card', 'Button'],
  layout: {
    layoutClass: 'featured-card',
    columnSpan: 3,
    rowSpan: 20,
    previewConfig: {
      scale: 0.9,
      centeringStrategy: 'full',
    },
  },
  variants: [
    {
      name: 'Simple',
      description: 'Basic card with title, description, and action button',
      demoPath: 'card-simple',
    },
    {
      name: 'With Image',
      description: 'Card featuring an image header with content below',
      demoPath: 'card-with-image',
    },
  ],
};

export { cardExamples } from './example';
