import { ComponentExample } from "../../types";

export const cardExamples: ComponentExample[] = [
  {
    name: "Simple",
    description: "Basic card with title, description, and action button",
    code: `import { Card } from 'ui-lab-components';
import { Button } from 'ui-lab-components';

export default function SimpleCard() {
  return (
    <Card className="max-w-sm">
      <h3 className="text-lg font-semibold text-foreground-50 mb-2">Card Title</h3>
      <p className="text-sm text-foreground-400 mb-6">
        This is a simple card component for displaying content with a clean, organized layout.
      </p>
      <Button size="sm">Learn More</Button>
    </Card>
  );
}`,
  },
  {
    name: "With Image",
    description: "Card featuring an image header with content below",
    code: `import { Card } from 'ui-lab-components';
import { Button } from 'ui-lab-components';

export default function CardWithImage() {
  return (
    <Card className="max-w-sm overflow-hidden">
      <div className="aspect-video bg-background-700 rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-foreground-50 mb-2">Featured Content</h3>
      <p className="text-sm text-foreground-400 mb-6">
        A card component with an image, title, and description for showcasing featured items.
      </p>
      <Button className="w-full">View Details</Button>
    </Card>
  );
}`,
  },
];
