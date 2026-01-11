"use client";

import { Sidebar } from "@/features/navigation";
import { BreadcrumbsNav } from "@/features/navigation";
import { TableOfContents, type TableOfContentsItem } from "./table-of-contents";
import "../../../app/docs.css";
import { cn } from "@/shared";

interface DocsLayoutProps {
  children: React.ReactNode;
  tocItems?: TableOfContentsItem[];
}

export function DocsLayout({ children, tocItems = [] }: DocsLayoutProps) {

  return (
    <div className="max-w-(--page-width) mx-auto pb-12 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] min-h-[calc(100vh-var(--header-height))]">
      <Sidebar />
      <div id="docs" className={cn(
        "w-full max-w-4xl mx-auto flex items-center justify-center mt-(--header-height)",
        // "bg-background-900/30 rounded-2xl border border-background-700"
      )}>
        <BreadcrumbsNav />
        <div className="text-sm leading-relaxed antialiased">
          {children}
        </div>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  );
}
