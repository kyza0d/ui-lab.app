import { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/shared/lib/metadata";
import ComponentsPageClient from "./client";

export const metadata: Metadata = buildMetadata({
  pathname: "/components",
  title: "Components",
  description: "Browse UI Lab components by category with live previews and usage guidance.",
});

export default function ComponentsPage() {
  return <ComponentsPageClient />;
}
