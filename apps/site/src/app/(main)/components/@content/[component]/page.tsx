import { ComponentClient } from "./client";
import { cacheLife } from "next/cache";

const componentIds = [
  "button", "input", "label", "select", "textarea",
  "checkbox", "radio", "badge", "tooltip", "popover", "form",
  "toast", "modal", "tabs", "menu", "switch", "slider",
  "progress", "card", "command", "confirm", "divider", "fold",
  "group", "flex", "grid", "table", "breadcrumbs", "scroll", "gallery"
];

export function generateStaticParams() {
  return componentIds.map((id) => ({ component: id }));
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ component: string; }>; }) {
  'use cache';
  cacheLife('hours');

  const { component: componentId } = await params;
  return <ComponentClient componentId={componentId} />;
}
