import { Suspense } from "react";
import { ComponentDetailClient } from "./client";
import { Breadcrumbs } from "@/components/breadcrumbs";

const componentIds = [
  "button", "input", "label", "select", "textarea",
  "checkbox", "radio", "badge", "tooltip", "popover", "form-wrapper",
  "toast", "modal", "tabs", "menu", "switch", "slider",
  "progress", "card", "command-palette", "confirm", "divider"
];

export function generateStaticParams() {
  return componentIds.map((id) => ({ component: id }));
}

function LoadingFallback() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Components", href: "/components" },
        ]}
      />
      <div className="w-full bg-background-950 mx-auto">
        <main className="w-full">
          <div className="px-8 pb-12 pt-24 space-y-8">
            <div className="space-y-2 animate-pulse">
              <div className="h-8 bg-background-700 rounded w-48"></div>
              <div className="h-5 bg-background-700 rounded w-96"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ComponentDetailPage({
  params
}: {
  params: Promise<{ component: string }>
}) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ComponentDetailClient params={params} />
    </Suspense>
  );
}
