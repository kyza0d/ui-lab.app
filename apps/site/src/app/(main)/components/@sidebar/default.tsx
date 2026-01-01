import { Suspense } from "react";
import { Sidebar } from "@/features/navigation";

function SidebarContent() {
  return <Sidebar />;
}

function SidebarSkeleton() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-background-700">
      <div className="h-screen"></div>
    </aside>
  );
}

export default function SidebarSlot() {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarContent />
    </Suspense>
  );
}
