"use client";

import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import "../docs.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-(--page-width) mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_auto] min-h-[calc(100vh-var(--header-height))]">
      <Sidebar />
      <div className="docs pt-18">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Documentation", href: "/docs" },
          ]}
        />
        {children}
      </div>
    </div>
  );
}
