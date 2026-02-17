import { Badge } from "ui-lab-components";

interface PricingBadgeProps {
  price: number | null;
}

export function PricingBadge({ price }: PricingBadgeProps) {
  if (price === null) return
  return <Badge size="sm">${price.toFixed(2)}</Badge>;
}
