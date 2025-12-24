import { Suspense } from 'react';
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div style={{ height: '3.75rem' }} />}>
        <Header />
      </Suspense>
      <Suspense fallback={<div />}>
        <main className="flex-1">
          {children}
        </main>
      </Suspense>
      <Footer />
    </>
  );
}
