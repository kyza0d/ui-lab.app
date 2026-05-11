"use client";

import { cn } from "@/shared";
import type { ReactNode } from "react";
import { SettingsContent } from "./settings/settings-content";

export function SettingsSidebar({ footer }: { footer?: ReactNode }) {
  return (
    <aside
      className={cn(
        "flex min-h-0 flex-col border-r border-background-700/40 bg-background-950",
        "xl:sticky xl:self-start xl:top-[var(--header-height)] xl:h-[calc(100vh-var(--header-height))]",
      )}
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <SettingsContent showFooterLink={false} />
      </div>
      {footer ? (
        <div className="sticky bottom-0 shrink-0 border-t border-background-700/40 bg-background-950 p-4">
          {footer}
        </div>
      ) : null}
    </aside>
  );
}
