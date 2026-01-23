"use client";

import { Sidebar } from "@/shared";
import { BreadcrumbsNav } from "@/features/navigation";
import { TableOfContents, type TableOfContentsItem } from "./table-of-contents";
import "../../../app/docs.css";
import { cn } from "@/shared";
import { Footer } from "@/features/layout";

interface DocsLayoutProps {
  children: React.ReactNode;
  tocItems?: TableOfContentsItem[];
}

export function DocsLayout({ children, tocItems = [] }: DocsLayoutProps) {

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] min-h-[calc(100vh-var(--header-height))]">
        <Sidebar />
        <div id="docs" className={cn(
          "w-full max-w-(--page-width) flex flex-col justify-center mt-(--header-height)",
          // "bg-background-900/30 rounded-2xl border border-background-700"
        )}>
          <BreadcrumbsNav />
          <div className="text-sm leading-relaxed antialiased">
            <div className="mx-auto max-w-3xl pb-12">
              {children}
            </div>
            <Footer />
          </div>
        </div>
        <TableOfContents items={tocItems} />
      </div>
    </>
  );
}
