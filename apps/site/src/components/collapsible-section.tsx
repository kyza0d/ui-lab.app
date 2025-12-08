"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export interface CollapsibleSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  id?: string;
  defaultOpen?: boolean;
  icon?: string;
}

export function CollapsibleSection({
  title,
  description,
  children,
  id,
  defaultOpen = false,
  icon,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section id={id} className="scroll-mt-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-3 p-4 rounded-sm hover:bg-background-900 group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 flex-1 text-left">
          {icon && (
            <span className="text-sm flex-shrink-0 text-accent-500 mt-0.5">
              <Icon icon={icon} />
            </span>
          )}
          <div className="space-y-1 flex-1">
            <h3 className="text-md font-semibold text-foreground-50 group-hover:text-accent-500">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-foreground-400">{description}</p>
            )}
          </div>
        </div>
        <div
          className={`flex-shrink-0 text-sm text-foreground-400 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        >
          <Icon icon="mdi:chevron-down" />
        </div>
      </button>

      {isOpen && (
        <div className="overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="pt-4 px-4 pb-4 space-y-4 border-background-700 mt-2">
            {children}
          </div>
        </div>
      )}
    </section>
  );
}
