"use client";

import { useState, useMemo } from "react";
import { Group, Divider, Select, Checkbox, Input } from "ui-lab-components";
import { FaList, FaGrip, FaChevronLeft, FaChevronRight, FaMagnifyingGlass, FaTrash, FaEllipsis } from "react-icons/fa6";

const FILES = [
  { name: "hero-banner.png", type: "PNG", size: "2.4 MB", modified: "2h ago" },
  { name: "brand-assets.zip", type: "ZIP", size: "18.7 MB", modified: "Yesterday" },
  { name: "product-video.mp4", type: "MP4", size: "84.2 MB", modified: "3d ago" },
  { name: "design-system.fig", type: "FIG", size: "5.1 MB", modified: "1w ago" },
  { name: "logo.svg", type: "SVG", size: "12 KB", modified: "2w ago" },
  { name: "docs-cover.jpg", type: "JPG", size: "1.8 MB", modified: "1mo ago" },
];

const TYPE_COLORS: Record<string, string> = {
  PNG: "text-blue-400", JPG: "text-purple-400", SVG: "text-green-400",
  MP4: "text-red-400", ZIP: "text-yellow-400", FIG: "text-pink-400",
};

export function FileBrowser() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [sort, setSort] = useState<string | number | null>("newest");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const TOTAL_PAGES = 3;

  const filteredFiles = useMemo(() => {
    const query = search.toLowerCase();
    return FILES.filter(file =>
      file.name.toLowerCase().includes(query) ||
      file.type.toLowerCase().includes(query)
    );
  }, [search]);

  const selectedCount = selected.size;
  const isAllSelected = filteredFiles.length > 0 && selectedCount === filteredFiles.length;
  const isSomeSelected = selectedCount > 0 && selectedCount < filteredFiles.length;

  const toggleSelect = (fileName: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(fileName)) next.delete(fileName);
      else next.add(fileName);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredFiles.map(f => f.name)));
    }
  };

  const clearSelection = () => {
    setSelected(new Set());
  };

  return (
    <div className="shadow-sm w-full bg-background-200 border border-background-700 rounded-md overflow-hidden flex flex-col">
      <div className="px-4 pt-3.5 pb-3 border-b border-background-700 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground-100">Media</span>
        <span className="text-xs text-foreground-500">{filteredFiles.length} files</span>
      </div>

      <div className="border-b border-background-700 flex items-center gap-2">
        <Group spacing="none" variant="ghost" className="flex-shrink-0">
          <Group.Input
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefixIcon={<FaMagnifyingGlass size={12} className="text-foreground-500" />}
          />
          <Divider orientation="vertical" />
          <Group.Select selectedKey={sort} onSelectionChange={setSort} className="w-28">
            <Select.Trigger>
              <Select.Value placeholder="Sort" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="newest" textValue="Newest">Newest</Select.Item>
                <Select.Item value="oldest" textValue="Oldest">Oldest</Select.Item>
                <Select.Item value="name" textValue="Name">Name</Select.Item>
                <Select.Item value="size" textValue="Size">Size</Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>
          <Divider orientation="vertical" />
          <Group.Button active={view === "list"} onClick={() => setView("list")} aria-label="List view">
            <FaList size={13} />
          </Group.Button>
          <Divider orientation="vertical" />
          <Group.Button active={view === "grid"} onClick={() => setView("grid")} aria-label="Grid view">
            <FaGrip size={13} />
          </Group.Button>
        </Group>
      </div>

      {selectedCount > 0 && (
        <div className="px-3 py-2 border-b border-background-700 bg-background-300 flex items-center justify-between">
          <span className="text-xs text-foreground-300">{selectedCount} file{selectedCount !== 1 ? 's' : ''} selected</span>
          <Group variant="ghost" spacing="none">
            <Group.Button onClick={() => { }} aria-label="Delete selected">
              <FaTrash size={12} />
            </Group.Button>
            <Group.Button onClick={clearSelection} aria-label="Clear selection">
              ✕
            </Group.Button>
          </Group>
        </div>
      )}

      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredFiles.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-3xl text-foreground-500 mb-2">○</div>
              <span className="text-sm text-foreground-500">
                {search ? "No files match your search" : "No files found"}
              </span>
            </div>
          </div>
        ) : view === "list" ? (
          <div>
            <div className="flex items-center gap-3 px-4 py-2.5 bg-background-300 border-b border-background-700">
              <Checkbox
                size="sm"
                checked={isAllSelected}
                isIndeterminate={isSomeSelected}
                onChange={toggleSelectAll}
              />
              <span className="text-xs text-foreground-500 flex-1">File</span>
              <span className="text-xs text-foreground-500 shrink-0">Size</span>
              <span className="text-xs text-foreground-500 shrink-0 w-16 text-right">Modified</span>
            </div>
            {filteredFiles.map((file, i) => (
              <div key={file.name} className="group">
                <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-background-300 transition-colors">
                  <Checkbox
                    size="sm"
                    checked={selected.has(file.name)}
                    onChange={() => toggleSelect(file.name)}
                  />
                  <span className={`text-xs font-mono font-bold w-8 text-center shrink-0 ${TYPE_COLORS[file.type] ?? "text-foreground-400"}`}>
                    {file.type}
                  </span>
                  <span className="text-sm text-foreground-100 flex-1 truncate">{file.name}</span>
                  <span className="text-xs text-foreground-500 shrink-0">{file.size}</span>
                  <span className="text-xs text-foreground-500 shrink-0 w-16 text-right">{file.modified}</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-foreground-500 hover:text-foreground-100">
                    <FaEllipsis size={12} />
                  </button>
                </div>
                {i < filteredFiles.length - 1 && <Divider spacing="none" size="sm" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 p-3">
            {filteredFiles.map((file) => (
              <div
                key={file.name}
                className="group relative bg-background-300 rounded-md p-3 flex flex-col items-center gap-1.5 cursor-pointer hover:bg-background-400 transition-colors"
              >
                <div className="absolute top-1.5 left-1.5">
                  <Checkbox
                    size="sm"
                    checked={selected.has(file.name)}
                    onChange={() => toggleSelect(file.name)}
                  />
                </div>
                <span className={`text-base font-bold font-mono ${TYPE_COLORS[file.type] ?? "text-foreground-400"}`}>
                  {file.type}
                </span>
                <span className="text-xs text-foreground-300 truncate w-full text-center">{file.name.split(".")[0]}</span>
                <span className="text-xs text-foreground-500">{file.size}</span>
                <button className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-foreground-500 hover:text-foreground-100">
                  <FaEllipsis size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-background-700 flex items-center justify-between">
        <span className="text-xs text-foreground-500">Page {page} of {TOTAL_PAGES}</span>
        <Group variant="ghost" spacing="none">
          <Group.Button isDisabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} aria-label="Previous">
            <FaChevronLeft size={11} />
          </Group.Button>
          {[1, 2, 3].map((p) => (
            <Group.Button key={p} active={page === p} onClick={() => setPage(p)}>
              {p}
            </Group.Button>
          ))}
          <Group.Button isDisabled={page === TOTAL_PAGES} onClick={() => setPage(p => Math.min(TOTAL_PAGES, p + 1))} aria-label="Next">
            <FaChevronRight size={11} />
          </Group.Button>
        </Group>
      </div>
    </div>
  );
}
