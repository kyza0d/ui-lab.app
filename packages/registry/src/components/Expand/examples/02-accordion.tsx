"use client";

import { useState } from 'react';
import { Expand } from 'ui-lab-components';

export const metadata = {
  title: 'Accordion',
  description: 'Controlled expand group where only one item can be open at a time.',
};

const items = [
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    content: 'Standard shipping takes 3–5 business days. Express options are available at checkout for next-day delivery.',
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    content: 'Items can be returned within 30 days of purchase. Refunds are processed within 5–7 business days after we receive the item.',
  },
  {
    id: 'warranty',
    title: 'Warranty',
    content: 'All products include a 12-month manufacturer warranty. Extended coverage can be purchased at checkout.',
  },
];

export default function Example() {
  const [open, setOpen] = useState<string | null>('shipping');

  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700">
      {items.map((item) => (
        <Expand
          key={item.id}
          title={item.title}
          isExpanded={open === item.id}
          onExpandedChange={(expanded) => setOpen(expanded ? item.id : null)}
        >
          <p className="text-sm text-foreground-400 px-3 py-3">{item.content}</p>
        </Expand>
      ))}
    </div>
  );
}
