import { ReactNode, Suspense } from "react";
import { generateMetadata } from "@/shared";

interface SectionsLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
}

export const metadata = generateMetadata({ pathname: '/sections' });

export default function SectionsLayout({
  sidebar,
  content,
}: Omit<SectionsLayoutProps, "children">) {
  return (
    <div className="max-w-(--page-width) mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_auto]">
      <Suspense fallback={<div className="hidden md:flex w-68" />}>
        {sidebar}
      </Suspense>
      {content}
    </div>
  );
}