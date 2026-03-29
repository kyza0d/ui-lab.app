"use client";

import { Command, Divider, scoreCommandRelevance } from "ui-lab-components";
import { Badge } from "ui-lab-components";
import type { CommandItem } from "ui-lab-components";
import { useApp } from "@/features/theme";
import { useCommands } from "../hooks/use-commands";

function matchesSearch(cmd: CommandItem, query: string): boolean {
  if (!query) return true;

  const q = query.toLowerCase();

  const labelScore = scoreCommandRelevance(cmd.label, q);
  if (labelScore > 0) return true;
  if (cmd.keywords?.some((kw) => scoreCommandRelevance(kw, q) > 0)) {
    return true;
  }

  return false;
}

function CommandPaletteContent({ itemCount }: { itemCount: number }) {
  return (
    <>
      <Command.Input placeholder="Search commands, components, docs..." />

      <Command.List emptyMessage="No commands found.">
        <Command.Groups renderCategory={(category) => category && (
          <>
            <Command.Category className="text-xs not-first:mt-12">{category}</Command.Category>
            <Divider variant="dashed" size="sm" />
          </>
        )}
          renderItem={(cmd) => (
            <>
              <Command.Item
                className="mb-2"
                key={cmd.id}
                value={cmd.id}
                textValue={cmd.label}
                action={cmd.action}
                hint={cmd.shortcut}
              >
                <div className="w-16 h-10 self-start pt-2">{cmd.icon && cmd.icon}</div>
                <div className="w-180">
                  <h3 className="text-xs mb-1.5">{cmd.label}</h3>
                  <p className="w-full text-xs">{cmd.description && cmd.description}</p>
                </div>
              </Command.Item>
            </>
          )}
        />
      </Command.List>
      <Command.Footer>
        {itemCount > 0 && (
          <>
            <div>
              <span>Navigate</span>
              <Badge size="sm" variant="default">
                ↑↓
              </Badge>
            </div>
            <div>
              <span>Select</span>
              <Badge size="sm" variant="default">
                ↵
              </Badge>
            </div>
            <div>
              <span>Close</span>
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
