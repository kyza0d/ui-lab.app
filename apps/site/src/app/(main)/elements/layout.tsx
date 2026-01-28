import { ReactNode, Suspense } from "react";
import { generateMetadata } from "@/shared";

interface ElementsLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
}

export const metadata = generateMetadata({ pathname: '/elements' });

export default function ElementsLayout({
  sidebar,
  content,
}: Omit<ElementsLayoutProps, "children">) {
  return (
    <div className="max-w-(--page-width) mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_auto] min-h-screen">
      <Suspense fallback={<div className="hidden md:flex w-68" />}>
        {sidebar}
      </Suspense>
      {content}
    </div>
  );
}
