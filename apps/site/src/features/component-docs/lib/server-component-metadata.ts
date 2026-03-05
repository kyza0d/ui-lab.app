import {
  componentRegistry as registryData,
  type ComponentCategory,
  type ComponentMetadata as RegistryMetadata,
} from "ui-lab-registry";
import {
  experimentalRegistry,
  type ExperimentalComponentMetadata,
} from "@/features/experimental/lib/experimental-registry";

export interface ServerComponentMetadata extends RegistryMetadata {
  experimental?: boolean;
}

const experimentalIds = new Set(experimentalRegistry.map((c) => c.id));

export const serverComponentRegistry: ServerComponentMetadata[] = [
  ...Object.entries(registryData)
    .filter(([id]) => !experimentalIds.has(id))
    .map(([id, metadata]) => ({
      ...metadata,
    })),
  ...(!registryData.table
    ? [
      {
        id: "table",
        name: "Table", // Generic name for server-side
        description: "A data table component.", // Generic description for server-side
        category: "display" as const,
        source: {
          packageName: "ui-lab-components" as const,
          exportName: "Table",
          packagePath: "src/components/table.tsx",
        },
        relatedComponents: ["card"],
      },
    ]
    : []),
  ...experimentalRegistry.map((metadata: ExperimentalComponentMetadata) => ({
    ...metadata,
    source: {
      packageName: "ui-lab-components" as const,
      exportName: metadata.id.charAt(0).toUpperCase() + metadata.id.slice(1),
      packagePath: `src/components/experimental/${metadata.id}`,
    },
  })),
];
