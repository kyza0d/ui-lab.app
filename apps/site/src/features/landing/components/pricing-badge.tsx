import { Badge } from "ui-lab-components";

interface PricingBadgeProps {
  price: number | null;
}

export function PricingBadge({ price }: PricingBadgeProps) {
  if (price === null) {
    return <div className="inline-block px-2 py-1 text-xs font-semibold text-foreground-50 bg-background-700 rounded">Free</div>;
  }

  return <Badge size="sm">${price.toFixed(2)}</Badge>;
}
