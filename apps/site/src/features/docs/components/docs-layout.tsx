"use client";

import { Sidebar } from "@/shared";
import { BreadcrumbsNav } from "@/features/navigation";
import { TableOfContents, type TableOfContentsItem } from "./table-of-contents";
import { CopyPage } from "./copy-page-button";
import { OpenPage } from "./open-page-button";
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
      <div className={cn("grid grid-cols-1 w-full max-w-(--page-width) mx-auto min-h-[calc(100vh-var(--header-height))]", isChatOpen ? "lg:grid-cols-[auto_1fr]" : "lg:grid-cols-[auto_4fr_1fr]")}>
        <Sidebar />
        <div id="docs" className={cn(
          "flex flex-col justify-center mt-(--header-height) min-w-0",
          // "bg-background-900/30 rounded-2xl border border-background-700"
        )}>
          <BreadcrumbsNav />
          <div className="flex items-center w-full min-w-0">
            {/* overflow-x-clip: enforces the 48rem boundary structurally.
                Unlike overflow-x-hidden, clip does not create a scroll container,
                so sticky children and fixed elements are unaffected. */}
            <div className="pt-12 px-4 md:px-6 mx-auto max-w-3xl pb-12 w-full min-w-0">
              {children}
            </div>
          </div>
          <Footer />
        </div>
        {!isChatOpen && (
          <div className="sticky top-(--header-height) flex items-between flex-col gap-4 h-fit">
            <div className="flex h-[90vh] flex-col justify-between">
              <TableOfContents items={tocItems} />
              <div className="space-y-3">
                <OpenPage />
                <CopyPage />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
