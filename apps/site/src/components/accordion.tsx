"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export interface AccordionItemProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: string;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenId,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    defaultOpenId ? new Set([defaultOpenId]) : new Set()
  );

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex items-start justify-between gap-3 p-4 rounded-lg hover:bg-background-900 group"
            aria-expanded={openIds.has(item.id)}
          >
            <div className="flex items-start gap-3 flex-1 text-left">
              {item.icon && (
                <span className="text-sm flex-shrink-0 text-accent-500 mt-0.5">
                  <Icon icon={item.icon} />
                </span>
              )}
              <div className="space-y-1 flex-1">
                <h4 className="text-base font-semibold text-foreground-50 group-hover:text-accent-500 transition-colors">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-sm text-foreground-400">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`flex-shrink-0 text-sm text-foreground-400 transition-transform duration-300 ${openIds.has(item.id) ? "rotate-180" : ""
                }`}
            >
              <Icon icon="mdi:chevron-down" />
            </div>
          </button>

          {openIds.has(item.id) && (
            <div className="overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="px-4 pb-4 pt-2 space-y-3 border-l-2 border-background-700 ml-2">
                {item.children}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
