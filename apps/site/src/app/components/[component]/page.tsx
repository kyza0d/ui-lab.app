import { ComponentDetailClient } from "./client";

const componentIds = [
  "button", "button-group", "input", "label", "select", "textarea",
  "checkbox", "radio", "badge", "tooltip", "popover", "form-wrapper",
  "toast", "modal", "tabs", "context-menu", "switch", "slider",
  "progress", "card", "command-palette", "confirmation", "divider"
];

export function generateStaticParams() {
  return componentIds.map((id) => ({ component: id }));
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ component: string }> }) {
  const { component } = await params;
  return <ComponentDetailClient componentId={component} />;
}
