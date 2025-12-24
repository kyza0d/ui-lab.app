import type { ElementMetadata } from '../types';

export const cardWithImage: ElementMetadata = {
  id: 'card-with-image',
  name: 'Card with Image',
  description: 'A card component with an image header, title, description, and action button',
  category: 'card',
  tags: ['card', 'image', 'product', 'article'],
  componentDependencies: ['Card', 'Button', 'Divider'],
  variants: [
    {
      name: 'Basic',
      description: 'Standard card with image, title, and description',
      code: `import { Card } from 'ui-lab-components';
import { Button } from 'ui-lab-components';

export default function CardWithImage() {
  return (
    <Card className="max-w-sm">
      <div className="aspect-video bg-background-700 rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-foreground-50 mb-2">Card Title</h3>
      <p className="text-sm text-foreground-400 mb-6">
        Brief description of the card content goes here.
      </p>
      <Button className="w-full">Learn More</Button>
    </Card>
  );
}`,
    },
    {
      name: 'With Overlay',
      description: 'Card with image overlay and centered text',
      code: `import { Card } from 'ui-lab-components';
import { Button } from 'ui-lab-components';

export default function CardWithOverlay() {
  return (
    <Card className="max-w-sm overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground-50 mb-2">Featured</h3>
          <p className="text-sm text-foreground-200">Special promotion</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-foreground-400 mb-4">
          This card highlights special content with an overlay on the image.
        </p>
        <Button variant="outline" className="w-full">Explore</Button>
      </div>
    </Card>
  );
}`,
    },
  ],
};
