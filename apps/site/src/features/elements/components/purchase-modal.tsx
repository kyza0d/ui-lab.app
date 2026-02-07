import React from 'react';
import { Button, Modal } from 'ui-lab-components';
import { PricingBadge } from '@/features/landing/components/pricing-badge';
import type { ElementPackageMetadata, StarterMetadata } from 'ui-lab-registry';

type PurchaseItem = ElementPackageMetadata | StarterMetadata;

interface PurchaseModalProps {
  isOpen: boolean;
  item: PurchaseItem | null;
  type: 'element' | 'starter';
  onClose: () => void;
  gumroadBaseUrl?: string;
}

function getGumroadUrl(item: PurchaseItem | null, gumroadBaseUrl: string = 'https://uilabshop.gumroad.com/l'): string {
  if (!item) return '';
  const gumroadId = 'gumroadProductId' in item ? item.gumroadProductId : undefined;
  if (!gumroadId) return '';
  return `${gumroadBaseUrl}/${gumroadId}`;
}

function getElementNames(item: PurchaseItem | null, type: 'element' | 'starter'): string[] {
  if (!item) return [];
  if (type === 'element' && 'elements' in item) {
    return item.elements;
  }
  if (type === 'starter' && 'bundledElements' in item) {
    return item.bundledElements || [];
  }
  return [];
}

export function PurchaseModal({ isOpen, item, type, onClose, gumroadBaseUrl }: PurchaseModalProps) {
  if (!item) return null;

  const gumroadUrl = getGumroadUrl(item, gumroadBaseUrl);
  const elementNames = getElementNames(item, type);
  const isPremium = item.pricing && item.pricing.price !== null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(nextIsOpen) => {
        if (!nextIsOpen) onClose();
      }}
      size="xl"
      closeButton
    >
      <Modal.Header>
        <h2 className="text-xl font-bold text-foreground-50">{item.name}</h2>
      </Modal.Header>

      <Modal.Body>
        <div className="px-6 py-6 space-y-6">
          <p className="text-foreground-300">{item.description}</p>

          {item.pricing?.features && item.pricing.features.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground-100 mb-3">Features</h3>
              <ul className="space-y-2">
                {item.pricing.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent-400 mt-1">✓</span>
                    <span className="text-foreground-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {elementNames.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground-100 mb-3">
                {type === 'element' ? 'Elements' : 'Included Components'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {elementNames.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1 bg-background-800 text-foreground-300 text-xs rounded-full border border-background-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        {isPremium && (
          <>
            <PricingBadge price={item.pricing!.price!} />
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                window.open(gumroadUrl, '_blank');
              }}
            >
              Purchase on Gumroad
            </Button>
          </>
        )}
        {!isPremium && (
          <div className="flex items-center gap-4 w-full">
            <span className="px-3 py-1.5 bg-background-800 text-foreground-300 text-sm rounded font-medium">
              Free
            </span>
            <p className="text-foreground-400 text-sm flex-1">Copy the installation command to get started</p>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
}
