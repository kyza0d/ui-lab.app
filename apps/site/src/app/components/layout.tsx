import { ReactNode } from "react";

interface ComponentsLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
}

export default function ComponentsLayout({
  sidebar,
  content,
}: Omit<ComponentsLayoutProps, "children">) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
      {sidebar}
      {content}
    </div>
  );
}
