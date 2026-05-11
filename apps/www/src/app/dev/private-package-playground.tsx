"use client";

import {
  getElementPreview,
  listElements,
  listPackages,
  type ElementSourceEntry,
} from "./private-package/library";
import { Card } from "ui-lab-components";

function ElementCard({ element }: { element: ElementSourceEntry }) {
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
          {element.description ? (
            <p className="text-xs text-foreground-400">
              {element.description}
            </p>
          ) : null}
        </div>
      </Card.Header>
      <Card.Body>
        {Preview ? (
          <Preview />
        ) : (
          <p className="text-sm text-foreground-400">
            This package entry does not expose a preview yet.
          </p>
        )}
      </Card.Body>
    </Card>
  );
}

export function PrivatePackagePlayground() {
  const packages = listPackages();

  return (
    <section className="space-y-8">
      {packages.map((pkg) => {
        const elements = listElements(pkg.id);

        return (
          <div key={pkg.id} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground-50">
                {pkg.displayName}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-foreground-400">
                {pkg.description}
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {elements.map((element) => (
                <ElementCard key={element.id} element={element} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
