"use client";
import { use } from "react";
import { ComponentDetailClient } from "./client";

export function ComponentDetailContent({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component: componentId } = use(params);
  return <ComponentDetailClient componentId={componentId} />;
}
