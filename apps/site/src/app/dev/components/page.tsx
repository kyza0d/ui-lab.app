"use client";

import Link from "next/link";
import { Grid, Flex, Input } from "ui-lab-components";
import { useState, useMemo } from "react";
import {
  componentRegistry,
  getComponentsGroupedByCategory,
  getCategoriesInOrder,
  getCategoryIcon,
} from "@/features/component-docs";
import { FaArrowLeft, FaUpRightFromSquare } from "react-icons/fa6";

function ComponentRow({ id, name, description, exampleCount }: { id: string; name: string; description: string; exampleCount: number }) {
  return (
    <Link
      href={`/dev/components/${id}`}
      className="group flex items-center gap-4 p-4 rounded-lg border border-background-700 bg-background-900 hover:border-background-600 hover:bg-background-800/50 transition-all duration-200"
    >
      <div className="flex-1 min-w-0">
        <Flex align="center" gap="sm">
          <h3 className="font-medium text-foreground-100 group-hover:text-accent-400 transition-colors">{name}</h3>
          <span className="text-xs text-foreground-500 bg-background-800 px-2 py-0.5 rounded">
            {exampleCount} {exampleCount === 1 ? "example" : "examples"}
          </span>
        </Flex>
        <p className="text-xs text-foreground-500 truncate mt-1">{description}</p>
      </div>
      <Link
        href={`/components/${id}`}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        className="text-foreground-500 hover:text-accent-400 transition-colors"
      >
        <FaUpRightFromSquare className="w-3.5 h-3.5" />
      </Link>
    </Link>
  );
}

export default function DevComponentsIndexPage() {
  const [search, setSearch] = useState("");
  const groupedComponents = getComponentsGroupedByCategory();
  const categories = getCategoriesInOrder();

  const filteredComponents = useMemo(() => {
    if (!search.trim()) return null;
    const term = search.toLowerCase();
    return componentRegistry.filter(
      (c) => c.name.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dev" className="inline-flex items-center gap-2 text-sm text-foreground-400 hover:text-foreground-200 mb-8">
          <FaArrowLeft className="w-3 h-3" /> Back to Dev
        </Link>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-foreground-50">All Components</h1>
          <p className="text-foreground-400">Browse and test all {componentRegistry.length} components in the library.</p>
        </div>

        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {filteredComponents ? (
          <div className="space-y-4">
            <p className="text-sm text-foreground-500">{filteredComponents.length} results for "{search}"</p>
            <div className="space-y-2">
              {filteredComponents.map((component) => (
                <ComponentRow
                  key={component.id}
                  id={component.id}
                  name={component.name}
                  description={component.description}
                  exampleCount={0}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((categoryId) => {
              const components = groupedComponents[categoryId];
              if (!components || components.length === 0) return null;
              const Icon = getCategoryIcon(categoryId);
              return (
                <section key={categoryId}>
                  <Flex align="center" gap="sm" className="mb-4 pb-2 border-b border-background-700">
                    {Icon}
                    <h2 className="text-lg font-semibold text-foreground-200 capitalize">{categoryId}</h2>
                    <span className="text-xs text-foreground-500">{components.length}</span>
                  </Flex>
                  <div className="space-y-2">
                    {components.map((component) => (
                      <ComponentRow
                        key={component.id}
                        id={component.id}
                        name={component.name}
                        description={component.description}
                        exampleCount={0}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
