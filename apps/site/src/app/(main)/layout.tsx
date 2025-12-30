import { Suspense } from 'react';
import { HeaderClient } from "@/components/layout/HeaderClient";
import { ElementsHeaderSetup } from "@/components/layout/ElementsHeaderClient";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <ElementsHeaderSetup />
      </Suspense>
      <HeaderClient />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
