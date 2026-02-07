"use client";

import { Button } from 'ui-lab-components';
import { PricingBadge } from '@/features/landing/components/pricing-badge';
import type { PricingInfo } from 'ui-lab-registry';
import { FaShop } from 'react-icons/fa6';

interface ContentHeaderProps {
  title: string;
  description: string;
  pricing?: PricingInfo;
  children?: React.ReactNode;
  purchaseUrl?: string;
}

export function ContentHeader({ title, description, pricing, children, purchaseUrl }: ContentHeaderProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 mb-12">
        <div className="flex items-center justify-center">
          {children}
        </div>
        <div className="flex relative flex-col justify-between gap-4">
          <div className='absolute right-8 ml-auto'>
            {pricing && pricing.price !== null && (
              <PricingBadge price={pricing.price} />
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground-50 flex-1">{title}</h1>
              <p className="text-foreground-400 text-sm sm:text-base leading-relaxed flex-1">{description}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            {purchaseUrl && (
              <Button icon={{ left: <FaShop /> }} size="md">
                <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
                  Purchase
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
