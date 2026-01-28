"use client";

import { Sidebar } from "@/shared";
import { BreadcrumbsNav } from "@/features/navigation";
import { TableOfContents, type TableOfContentsItem } from "./table-of-contents";
import "../../../app/docs.css";
import { cn } from "@/shared";
import { Footer } from "@/features/layout";
import { useChat } from "@/features/chat";

interface DocsLayoutProps {
  children: React.ReactNode;
  tocItems?: TableOfContentsItem[];
}

export function DocsLayout({ children, tocItems = [] }: DocsLayoutProps) {
  const { isOpen: isChatOpen } = useChat();

  return (
    <>
      <div className={cn("grid grid-cols-1 w-full max-w-(--page-width) mx-auto min-h-[calc(100vh-var(--header-height))]", isChatOpen ? "md:grid-cols-[auto_1fr]" : "md:grid-cols-[auto_4fr_1fr]")}>
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
        {!isChatOpen && <TableOfContents items={tocItems} />}
      </div>
    </>
  );
}
