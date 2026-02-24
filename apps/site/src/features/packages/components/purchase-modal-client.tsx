'use client';
import React from 'react';
import { PurchaseModal } from './purchase-modal';
import type { ElementPackageMetadata, StarterMetadata } from 'ui-lab-registry';

type PurchaseItem = ElementPackageMetadata | StarterMetadata;

interface PurchaseModalClientProps {
  children: React.ReactNode;
  type: 'element' | 'starter';
}

const ModalContext = React.createContext<{
  selectedItem: PurchaseItem | null;
  openModal: (item: PurchaseItem) => void;
  closeModal: () => void;
} | null>(null);

export function usePurchaseModal() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('usePurchaseModal must be used within PurchaseModalClient');
  }
  return context;
}

export function PurchaseModalClient({ children, type }: PurchaseModalClientProps) {
  const [selectedItem, setSelectedItem] = React.useState<PurchaseItem | null>(null);

  const openModal = React.useCallback((item: PurchaseItem) => {
    setSelectedItem(item);
  }, []);

  const closeModal = React.useCallback(() => {
    setSelectedItem(null);
  }, []);

  return (
    <ModalContext.Provider value={{ selectedItem, openModal, closeModal }}>
      {children}
      <PurchaseModal
        isOpen={selectedItem !== null}
        item={selectedItem}
        type={type}
        onClose={closeModal}
      />
    </ModalContext.Provider>
  );
}
