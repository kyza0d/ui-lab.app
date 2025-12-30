import { Suspense } from 'react';
import { HeaderClient } from "@/components/layout/HeaderClient";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <HeaderClient />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
