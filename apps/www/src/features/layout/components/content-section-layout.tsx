import { ReactNode } from "react";

interface ContentSectionLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
  minHeight?: boolean;
}

export function ContentSectionLayout({ sidebar, content, minHeight }: ContentSectionLayoutProps) {
  return (
    <div className={`max-w-(--page-width) mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr]${minHeight ? " min-h-screen" : ""}`}>
      {sidebar}
      {content}
    </div>
  );
}
