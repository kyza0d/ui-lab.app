import type { Metadata } from "next";
import { ComponentClient } from "./client";
import { generateMetadata as generateSiteMetadata } from "@/shared";
import { extractComponentMetadata } from "@/shared/lib/metadata-extractors";
import { componentRegistry, generatedAPI, generatedStyles, reactAriaUrls, sourceUrls } from "ui-lab-registry";

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

export async function generateMetadata({ params }: { params: Promise<{ component: string }> }): Promise<Metadata> {
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
  const { component: componentId } = await params;
  const component = componentRegistry[componentId as keyof typeof componentRegistry];
  return (
    <ComponentClient
      componentId={componentId}
      api={generatedAPI[componentId] ?? null}
      styles={generatedStyles[componentId] ?? null}
      reactAriaUrl={reactAriaUrls[componentId] ?? null}
      sourceUrl={sourceUrls[componentId] ?? null}
      name={component?.name ?? ""}
      description={component?.description ?? ""}
      experimental={component?.experimental ?? false}
    />
  );
}
