import { DevComponentClient } from "./client";
import { componentRegistry as registryData } from "ui-lab-registry";

export async function generateMetadata({ params }: { params: Promise<{ component: string }> }) {
  const { component } = await params;
  return {
    title: `${component} Component`,
    description: `Development environment for the ${component} component.`
  };
}

export function generateStaticParams() {
  return Object.keys(registryData).map((id) => ({ component: id }));
}

export default async function DevComponentPage({ params }: { params: Promise<{ component: string }> }) {
  const { component } = await params;
  return <DevComponentClient componentId={component} />;
}
