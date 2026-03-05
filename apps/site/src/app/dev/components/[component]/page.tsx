import { DevComponentClient } from "./client";
import { cacheLife } from "next/cache";
import { serverComponentRegistry } from "@/features/component-docs/lib/server-component-metadata";

export function generateStaticParams() {
  return serverComponentRegistry.map((c) => ({ component: c.id }));
}

export default async function DevComponentPage({ params }: { params: Promise<{ component: string }> }) {
  'use cache';
  cacheLife('hours');

  const { component } = await params;
  return <DevComponentClient componentId={component} />;
}
