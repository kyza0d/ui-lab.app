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
      <div className="grid grid-cols-1 w-full max-w-(--page-width) mx-auto md:grid-cols-[auto_4fr_1fr] min-h-[calc(100vh-var(--header-height))]">
        <Sidebar />
        <div id="docs" className={cn(
          "flex flex-col justify-center mt-(--header-height)",
          // "bg-background-900/30 rounded-2xl border border-background-700"
        )}>
          <BreadcrumbsNav />
          <div className="flex  items-center">
            <div className="pt-12 mx-auto max-w-3xl pb-12">
              {children}
            </div>
          </div>
          <Footer />
        </div>
        <TableOfContents items={tocItems} />
      </div>
    </>
  );
}
