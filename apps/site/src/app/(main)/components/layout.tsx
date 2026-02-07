import { ReactNode } from "react";
import { generateMetadata } from "@/shared";

interface ComponentsLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
}

export const metadata = generateMetadata({ pathname: '/components' });

export default function ComponentsLayout({
  sidebar,
  content,
}: Omit<ComponentsLayoutProps, "children">) {
  return (
    <div className="max-w-(--page-width) mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr] min-h-[calc(100vh-var(--header-height))]">
      {sidebar}
      {content}
    </div>
  );
}
