"use client";

import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function CustomizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
      <Sidebar />
      <div>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Customization", href: "/customize" },
          ]}
        />
        {children}
      </div>
    </div>
  );
}
