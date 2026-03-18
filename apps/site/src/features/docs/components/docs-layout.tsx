import { Sidebar } from "@/shared";
import { TableOfContents, type TableOfContentsItem } from "./table-of-contents";
import { CopyPage } from "./copy-page-button";
import { OpenPage } from "./open-page-button";
import { DocsLayoutChatSync } from "./docs-layout-chat-sync";
import "../../../app/docs.css";
import { Footer } from "@/features/layout";

interface DocsLayoutProps {
  children: React.ReactNode;
  tocItems?: TableOfContentsItem[];
  banner?: React.ReactNode;
}

const EMPTY_TOC_ITEMS: TableOfContentsItem[] = [];
const ROOT_ID = "docs-layout-root";

export function DocsLayout({ children, tocItems = EMPTY_TOC_ITEMS, banner }: DocsLayoutProps) {
  return (
    <>
      <div
        id={ROOT_ID}
        data-chat-open="false"
        className="docs-layout-root grid grid-cols-1 w-full max-w-(--page-width) mx-auto min-h-[calc(100vh-var(--header-height))] lg:grid-cols-[auto_1fr]"
      >
        <DocsLayoutChatSync rootId={ROOT_ID} />
        <Sidebar />

        <div className="docs-layout-inner grid grid-cols-1 min-w-0 lg:grid-cols-[4fr_1fr]">
          {banner && (
            <div className="col-span-full mt-(--header-height)">
              {banner}
            </div>
          )}

          <div
            id="docs"
            className={`flex flex-col justify-center min-w-0 ${banner ? "" : "mt-(--header-height)"}`}
          >
            <div className="flex items-center w-full min-w-0">
              <div className="py-12 px-4 md:px-6 mx-auto max-w-3xl w-full min-w-0">
                {children}
              </div>
            </div>
          </div>

          <div className="docs-toc-rail sticky top-(--header-height) flex flex-col justify-between h-[calc(100vh-var(--header-height))]">
            <TableOfContents items={tocItems} />
            <div className="space-y-3 px-4 pb-4">
              <OpenPage />
              <CopyPage />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
