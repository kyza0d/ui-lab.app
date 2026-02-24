"use client";

import { Command, scoreCommandRelevance } from "ui-lab-components";
import { Badge } from "ui-lab-components";
import type { CommandItem } from "ui-lab-components";
import { useApp } from "@/features/theme";
import { useCommands } from "../hooks/use-commands";

function matchesSearch(cmd: CommandItem, query: string): boolean {
  if (!query) return true;

  const q = query.toLowerCase();

  // Score the label (highest priority)
  const labelScore = scoreCommandRelevance(cmd.label, q);
  if (labelScore > 0) return true;

  // Score keywords (high priority)
  if (cmd.keywords?.some((kw) => scoreCommandRelevance(kw, q) > 0)) {
    return true;
  }

  return false;
}

function CommandPaletteContent({ itemCount }: { itemCount: number }) {
  return (
    <>
      <Command.SearchInput
        placeholder="Search commands, components, docs..."
      />

      <Command.List emptyMessage="No commands found.">
        <Command.Groups
          renderCategory={(category) =>
            category && <Command.Category>{category}</Command.Category>
          }
          renderItem={(cmd) => (
            <Command.Item
              key={cmd.id}
              value={cmd.id}
              textValue={cmd.label}
              action={cmd.action}
              className="group my-1 transition-none hover:bg-background-700"
            >
              <div className="flex py-1 items-center gap-0.625 flex-1 min-w-0">
                {cmd.icon && (
                  <div className="p-2 group-hover:bg-background-600 bg-background-800 rounded-sm mr-4">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-foreground-400">
                      {cmd.icon}
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground-300 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                    {cmd.label}
                  </div>
                  {cmd.description && (
                    <div className="text-sm text-foreground-400 overflow-hidden text-ellipsis whitespace-nowrap">
                      {cmd.description}
                    </div>
                  )}
                </div>
              </div>
              {cmd.shortcut && (
                <Badge
                  size="sm"
                  variant="default"
                  className="ml-3 flex-shrink-0 font-mono"
                >
                  {cmd.shortcut}
                </Badge>
              )}
            </Command.Item>
          )}
        />
      </Command.List>

      <Command.Footer>
        {itemCount > 0 && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm">Navigate</span>
              <Badge size="sm" variant="default">
                ↑↓
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Select</span>
              <Badge size="sm" variant="default">
                ↵
              </Badge>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm">Close</span>
              <Badge size="sm" variant="default">
                Esc
              </Badge>
            </div>
          </>
        )}
      </Command.Footer>
    </>
  );
}

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, currentThemeMode, setCurrentThemeMode } = useApp();
  const commands = useCommands({ currentThemeMode, setCurrentThemeMode });

  return (
    <Command
      open={isCommandPaletteOpen}
      onOpenChange={setIsCommandPaletteOpen}
      items={commands}
      filter={matchesSearch}
    >
      <CommandPaletteContent itemCount={commands.length} />
    </Command>
  );
}
