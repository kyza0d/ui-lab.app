import { ComponentClient } from "./client";
import { cacheLife } from "next/cache";
import { generateMetadata as generateSiteMetadata } from "@/shared";
import { extractComponentMetadata } from "@/shared/lib/metadata-extractors";
import { componentRegistry } from "ui-lab-registry";

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

export async function generateMetadata({ params }: { params: Promise<{ component: string }> }) {
  'use cache';
  cacheLife('hours');

  const { component: componentId } = await params;
  const component = componentRegistry[componentId as keyof typeof componentRegistry];

  if (!component) {
    return generateSiteMetadata({ title: 'Component Not Found' });
  }

  const extracted = extractComponentMetadata(component);
  return generateSiteMetadata({
    title: extracted.title,
    description: extracted.description,
  });
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ component: string; }>; }) {
  'use cache';
  cacheLife('hours');

  const { component: componentId } = await params;
  return <ComponentClient componentId={componentId} />;
}
