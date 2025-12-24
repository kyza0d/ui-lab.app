import { ReactNode } from "react";

interface BlocksLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
}

export default function BlocksLayout({
  sidebar,
  content,
}: Omit<BlocksLayoutProps, "children">) {
  return (
    <div className="max-w-(--page-width) mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_auto] min-h-[calc(100vh-var(--header-height))]">
      {sidebar}
      {content}
    </div>
  );
}
