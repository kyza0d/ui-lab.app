import React from "react";
import { Card } from "@ui-lab/components";
import { Button } from "@ui-lab/components";
import { ComponentDetail } from "@/types/component";
import { Badge } from "@ui-lab/components";
import { FaHeart, FaShare } from "react-icons/fa6";

const basicCardCode = `import { Card } from "@ui-lab/components";

export function Example() {
  return (
    <Card className="max-w-sm">
      <Card.Header>
        <h3 className="font-semibold text-foreground-100">Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-foreground-300">
          This is the main content area of the card. You can put any content here.
        </p>
      </Card.Body>
    </Card>
  );
}`;

const cardWithFooterCode = `import { Card } from "@ui-lab/components";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <Card className="max-w-sm">
      <Card.Header>
        <h3 className="font-semibold text-foreground-100">Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-foreground-300">
          This card demonstrates the header, body, and footer structure.
        </p>
      </Card.Body>
      <Card.Footer>
        <div className="flex gap-3">
          <Button variant="default">
            Action
          </Button>
          <Button variant="outline">
            Cancel
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}`;

const cardProductCode = `import { Card } from "@ui-lab/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <Card className="max-w-sm">
      <Card.Header>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground-100">Product Name</h3>
            <p className="text-sm text-foreground-500 mt-1">Premium Edition</p>
          </div>
          <Badge variant="success">In Stock</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <p className="text-foreground-300 mb-4">
          High-quality product with excellent features and durability.
        </p>
        <p className="text-lg font-bold text-accent-500">
          $99.99
        </p>
      </Card.Body>
      <Card.Footer>
        <Button className="w-full">Add to Cart</Button>
      </Card.Footer>
    </Card>
  );
}`;

export const cardDetail: ComponentDetail = {
  id: "card",
  name: "Card",
  description: "A flexible compound component for building card layouts with header, body, and footer sections.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Card component provides a clean and flexible way to group related content. Using the compound component pattern, you can easily compose cards with headers, bodies, and footers to match your design needs.
      </p>
      <p>
        Cards work great for product listings, user profiles, settings panels, or any grouped content that needs visual separation and structure.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Card",
      description: "A simple card with header and body content.",
      code: basicCardCode,
      preview: (
        <Card className="max-w-sm">
          <Card.Header>
            <h3 className="font-semibold text-foreground-100">Card Title</h3>
          </Card.Header>
          <Card.Body>
            <p className="text-foreground-300">
              This is the main content area of the card. You can put any content here.
            </p>
          </Card.Body>
        </Card>
      ),
    },
    {
      id: "with-footer",
      title: "Card with Footer",
      description: "A card with header, body, and footer sections for actions.",
      code: cardWithFooterCode,
      preview: (
        <Card className="max-w-sm">
          <Card.Header>
            <h3 className="font-semibold text-foreground-100">Card Title</h3>
          </Card.Header>
          <Card.Body>
            <p className="text-foreground-300">
              This card demonstrates the header, body, and footer structure.
            </p>
          </Card.Body>
          <Card.Footer>
            <div className="flex gap-3">
              <Button variant="default">
                Action
              </Button>
              <Button variant="outline">
                Cancel
              </Button>
            </div>
          </Card.Footer>
        </Card>
      ),
    },
    {
      id: "product",
      title: "Product Card",
      description: "A card layout for displaying product information.",
      code: cardProductCode,
      preview: (
        <Card className="max-w-sm">
          <Card.Header>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-foreground-100">Product Name</h3>
                <p className="text-sm text-foreground-500 mt-1">Premium Edition</p>
              </div>
              <Badge variant="success">In Stock</Badge>
            </div>
          </Card.Header>
          <Card.Body>
            <p className="text-foreground-300 mb-4">
              High-quality product with excellent features and durability.
            </p>
            <p className="text-lg font-bold text-accent-500">
              $99.99
            </p>
          </Card.Body>
          <Card.Footer>
            <Button className="w-full">Add to Cart</Button>
          </Card.Footer>
        </Card>
      ),
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard card with borders and dark background.",
      code: basicCardCode,
      preview: (
        <Card className="max-w-sm">
          <Card.Header>
            <h3 className="font-semibold text-foreground-100">Card Title</h3>
          </Card.Header>
          <Card.Body>
            <p className="text-foreground-300">
              This is the main content area of the card.
            </p>
          </Card.Body>
        </Card>
      ),
    },
  ],
};
