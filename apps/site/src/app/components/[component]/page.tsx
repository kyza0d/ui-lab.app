import { ComponentDetailClient } from "./client";

const componentIds = [
  "button", "input", "label", "select", "textarea",
  "checkbox", "radio", "badge", "tooltip", "popover", "form-wrapper",
  "toast", "modal", "tabs", "menu", "switch", "slider",
  "progress", "card", "command-palette", "confirm", "divider"
];

export function generateStaticParams() {
  return componentIds.map((id) => ({ component: id }));
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ component: string }> }) {
  const { component } = await params;
  return <ComponentDetailClient componentId={component} />;
}
