"use client";

import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import "../../app/docs.css";

interface DocsLayoutProps {
  section: {
    label: string;
    href: string;
  };
  children: React.ReactNode;
}

export function DocsLayout({ section, children }: DocsLayoutProps) {
  return (
    <div className="max-w-(--page-width) mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_auto] min-h-[calc(100vh-var(--header-height))]">
      <Sidebar />
      <div id="docs" className="pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: section.label, href: section.href },
          ]}
        />
        {children}
      </div>
    </div>
  );
}
