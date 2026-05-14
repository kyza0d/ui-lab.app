"use client";

import {
  getElementPreview,
  listElements,
  listPackages,
  type ElementEntry,
} from "./private/library";
import { Card } from "ui-lab-components";

// --- Documentation/foundation packages: card grid ---

function PreviewCard({ element }: { element: ElementEntry }) {
  const Preview = getElementPreview(element.package, element.id);

  return (
    <Card>
      <Card.Header>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground-100">
              {element.displayName}
            </h3>
            <span className="rounded-sm border border-background-700 px-1.5 py-0.5 text-[10px] uppercase tracking-normal text-foreground-400">
              {element.id}
            </span>
          </div>
          {element.description && (
            <p className="text-xs text-foreground-400">{element.description}</p>
          )}
        </div>
      </Card.Header>
      <Card.Body>
        {Preview ? (
          <Preview />
        ) : (
          <p className="text-sm text-foreground-400">No preview available.</p>
        )}
      </Card.Body>
    </Card>
  );
}

function PreviewCardPackage({ packageId }: { packageId: string }) {
  const elements = listElements(packageId);
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {elements.map((el) => (
        <PreviewCard key={el.id} element={el} />
      ))}
    </div>
  );
}

// --- Components package: grouped examples, DevExampleLayout style ---

function ExampleRow({ element }: { element: ElementEntry }) {
  const Preview = getElementPreview(element.package, element.id);

  return (
    <div className="space-y-2">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-md font-semibold text-foreground-100">{element.displayName}</h3>
          <span className="rounded-sm border border-background-700 px-1.5 py-0.5 text-[10px] uppercase tracking-normal text-foreground-400">
            {element.access}
          </span>
        </div>
        {element.description && (
          <p className="mt-1 text-sm text-foreground-400">{element.description}</p>
        )}
      </div>
      <div className="border border-background-700 py-8">
        <div className="mx-auto w-fit min-w-40 flex justify-center items-center min-h-20 px-8">
          {Preview ? (
            <Preview />
          ) : (
            <p className="text-sm text-foreground-400">No preview available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ComponentGroup({ groupName, elements }: { groupName: string; elements: ElementEntry[] }) {
  return (
    <div className="space-y-16">
      <div className="flex items-center gap-3">
        <h3 className="text-base font-semibold text-foreground-50 capitalize">{groupName}</h3>
        <span className="text-xs text-foreground-500">{elements.length} example{elements.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="space-y-16">
        {elements.map((el) => (
          <ExampleRow key={el.id} element={el} />
        ))}
      </div>
    </div>
  );
}

function ComponentExamplesPackage({ packageId }: { packageId: string }) {
  const elements = listElements(packageId);

  const groups = elements.reduce<Record<string, ElementEntry[]>>((acc, el) => {
    const group = el.groupPath?.[0] ?? 'ungrouped';
    (acc[group] ??= []).push(el);
    return acc;
  }, {});

  return (
    <div className="space-y-24">
      {Object.entries(groups).map(([group, els]) => (
        <ComponentGroup key={group} groupName={group} elements={els} />
      ))}
    </div>
  );
}

// --- Top-level playground ---

const EXAMPLE_PACKAGES = new Set(['components']);

export function PrivatePackagePlayground() {
  const packages = listPackages();

  return (
    <section className="space-y-20">
      {packages.map((pkg) => (
        <div key={pkg.id} className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground-50">{pkg.displayName}</h2>
            <p className="mt-1 max-w-2xl text-sm text-foreground-400">{pkg.description}</p>
          </div>
          {EXAMPLE_PACKAGES.has(pkg.id) ? (
            <ComponentExamplesPackage packageId={pkg.id} />
          ) : (
            <PreviewCardPackage packageId={pkg.id} />
          )}
        </div>
      ))}
    </section>
  );
}
