import { DevComponentClient } from "./client";

interface PageProps {
  params: Promise<{ component: string }>;
}

export default async function DevComponentPage({ params }: PageProps) {
  const { component } = await params;
  return <DevComponentClient componentId={component} />;
}
