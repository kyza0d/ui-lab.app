"use client";
import { Sidebar } from "@/shared";
import { PathNav } from "@/features/navigation";
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
  banner?: React.ReactNode;
}

export function DocsLayout({ children, tocItems = [], banner }: DocsLayoutProps) {
  const { isOpen: isChatOpen } = useChat();
  return (
    <>
      <div className={cn(
        "grid grid-cols-1 w-full max-w-(--page-width) mx-auto min-h-[calc(100vh-var(--header-height))]",
        isChatOpen ? "lg:grid-cols-[auto_1fr]" : "lg:grid-cols-[auto_1fr]"
      )}>
        <Sidebar />

        {/* Right side: banner + content + TOC */}
        <div className={cn(
          "grid grid-cols-1 min-w-0",
          !isChatOpen && "lg:grid-cols-[4fr_1fr]"
        )}>
          {/* Banner spans full width of content + TOC */}
          {banner && (
            <div className="col-span-full mt-(--header-height)">
              {banner}
            </div>
          )}

          {/* Main content */}
          <div
            id="docs"
            className={cn(
              "flex flex-col justify-center min-w-0",
              banner ? "" : "mt-(--header-height)"
            )}
          >
            <PathNav />
            <div className="flex items-center w-full min-w-0">
              <div className="py-12 px-4 md:px-6 mx-auto max-w-3xl w-full min-w-0">
                {children}
              </div>
            </div>
          </div>

          {/* TOC */}
          {!isChatOpen && (
            <div className="sticky top-(--header-height) flex flex-col justify-between h-[calc(100vh-var(--header-height))]">
              <TableOfContents items={tocItems} />
              <div className="space-y-3 px-4 pb-4">
                <OpenPage />
                <CopyPage />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
