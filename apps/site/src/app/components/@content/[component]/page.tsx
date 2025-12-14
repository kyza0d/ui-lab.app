import { Suspense } from "react";
import { ComponentDetailContent } from "./content";

const componentIds = [
  "button", "input", "label", "select", "textarea",
  "checkbox", "radio", "badge", "tooltip", "popover", "form-wrapper",
  "toast", "modal", "tabs", "menu", "switch", "slider",
  "progress", "card", "command-palette", "confirm", "divider"
];

export function generateStaticParams() {
  return componentIds.map((id) => ({ component: id }));
}

export default function ComponentDetailPage({
  params
}: {
  params: Promise<{ component: string }>
}) {
  return (
    <Suspense fallback={<div />}>
      <ComponentDetailContent params={params} />
    </Suspense>
  );
}
