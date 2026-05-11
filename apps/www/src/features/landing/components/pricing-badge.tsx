import { Badge } from "ui-lab-components";

interface PricingBadgeProps {
  price: number | null;
}

export function PricingBadge({ price }: PricingBadgeProps) {
  if (price === null) return
  return <Badge className="rounded-xl">${price.toFixed(2)}</Badge>;
}
