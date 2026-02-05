import type { PricingInfo } from 'ui-lab-registry';

interface PricingBadgeProps {
  price: number | null;
}

function PricingBadge({ price }: PricingBadgeProps) {
  if (price === null) {
    return <div className="inline-block px-2 py-1 text-xs font-semibold text-foreground-50 bg-background-700 rounded">Free</div>;
  }

  return <div className="inline-block px-2 py-1 text-xs font-semibold text-foreground-50 bg-background-600 rounded">${price.toFixed(2)}</div>;
}

interface PricingDetailsProps {
  pricing?: PricingInfo;
}

export function PricingDetails({ pricing }: PricingDetailsProps) {
  if (!pricing) return null;

  return (
    <div className="flex flex-col gap-2 p-3 bg-background-850 rounded border border-background-700">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-foreground-500">Pricing</span>
        <PricingBadge price={pricing.price} />
      </div>
      {pricing.features && pricing.features.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-foreground-500 mt-1">Features</span>
          <div className="space-y-1">
            {pricing.features.map((feature: string) => (
              <div key={feature} className="text-xs text-foreground-400">
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
