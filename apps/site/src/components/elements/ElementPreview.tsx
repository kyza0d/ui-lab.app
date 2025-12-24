"use client";

import { useState, useEffect } from "react";
import { Button } from "ui-lab-components";
import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa6";
import { PreviewHeader } from "../preview/PreviewHeader";
import { ResizablePreview } from "../ResizablePreview";
import { ElementFileViewer } from "./ElementFileViewer";
import type { ElementFile } from "ui-lab-registry";

interface ElementPreviewProps {
  variant: "preview" | "code";
  setVariant: (v: "preview" | "code") => void;
  files: ElementFile[];
  activeFile: string;
  setActiveFile: (filename: string) => void;
  copied: boolean;
  onCopy: () => void;
  DemoComponent?: React.ComponentType;
  deviceVariant?: "mobile" | "desktop";
  onDeviceVariantChange?: (variant: "mobile" | "desktop") => void;
  width?: number;
  onWidthChange?: (width: number) => void;
}

type FileNode = {
  name: string;
  filename?: string;
  children?: FileNode[];
  isOpen?: boolean;
};

export function ElementPreviewContent({
  variant,
  setVariant,
  files,
  activeFile,
  setActiveFile,
  copied,
  onCopy,
  DemoComponent,
  deviceVariant = "desktop",
  onDeviceVariantChange,
  width = 1200,
  onWidthChange,
}: ElementPreviewProps) {
  const [internalWidth, setInternalWidth] = useState(width);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());

  useEffect(() => {
    const defaultWidth = deviceVariant === "mobile" ? 375 : 1200;
    setInternalWidth(defaultWidth);
  }, [deviceVariant]);

  const handleWidthChange = (newWidth: number) => {
    setInternalWidth(newWidth);
    onWidthChange?.(newWidth);
  };

  // Build file tree from flat list of files
  const buildFileTree = (): FileNode[] => {
    const root: FileNode[] = [];

    files.forEach((file) => {
      const parts = file.filename.split("/");
      let current = root;

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;
        let node = current.find((n) => n.name === part);

        if (!node) {
          node = {
            name: part,
            ...(isLast ? { filename: file.filename } : {}),
            children: isLast ? undefined : [],
          };
          current.push(node);
        }

        if (!isLast && node.children) {
          current = node.children;
        }
      });
    });

    return root.sort((a, b) => {
      // Folders first
      if (a.children && !b.children) return -1;
      if (!a.children && b.children) return 1;
      return a.name.localeCompare(b.name);
    });
  };

  const fileTree = buildFileTree();

  const toggleFolder = (path: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const renderTree = (nodes: FileNode[], basePath: string = "") => {
    return nodes.map((node) => {
      const fullPath = basePath ? `${basePath}/${node.name}` : node.name;
      const isOpen = openFolders.has(fullPath);
      const isActive = node.filename === activeFile;

      if (node.children) {
        return (
          <div key={fullPath} className="select-none">
            <button
              onClick={() => toggleFolder(fullPath)}
              className="flex items-center gap-1.5 w-full px-2 py-1 text-sm hover:bg-background-700 rounded"
            >
              {isOpen ? <FaFolderOpen size={14} /> : <FaFolder size={14} />}
              <span className="text-foreground-300">{node.name}</span>
            </button>
            {isOpen && (
              <div className="ml-4 border-l border-background-600">
                {renderTree(node.children, fullPath)}
              </div>
            )}
          </div>
        );
      }

      return (
        <button
          key={node.filename}
          onClick={() => node.filename && setActiveFile(node.filename)}
          className={`
            flex items-center gap-1.5 w-full px-2 py-1 text-sm rounded
            ${isActive
              ? "bg-accent-500 text-foreground-50"
              : "hover:bg-background-700 text-foreground-400"
            }
          `}
        >
          <FaFile size={12} />
          <span className="truncate">{node.name}</span>
        </button>
      );
    });
  };

  const currentFile = files.find((f) => f.filename === activeFile) || files[0];

  return (
    <div className="space-y-6">
      <PreviewHeader
        activeTab={variant}
        onTabChange={setVariant}
        deviceVariant={deviceVariant}
        onDeviceVariantChange={(dev) => onDeviceVariantChange?.(dev)}
      />

      {/* Preview Mode */}
      {variant === "preview" && DemoComponent && (
        <ResizablePreview
          deviceVariant={deviceVariant}
          width={internalWidth}
          onWidthChange={handleWidthChange}
          className="min-h-[70vh]"
        >
          <DemoComponent />
        </ResizablePreview>
      )}

      {/* Code Mode */}
      {variant === "code" && (
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
          {/* File Tree Sidebar - Only show if >1 file */}
          {files.length > 1 && (
            <div className="bg-background-800 border border-background-700 rounded-lg p-3 overflow-y-auto max-h-[70vh]">
              <div className="text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-3">
                Files
              </div>
              <div className="space-y-0.5">
                {renderTree(fileTree)}
              </div>
            </div>
          )}

          {/* Code Viewer */}
          <div className="space-y-3">
            {/* Breadcrumb-style active file indicator (optional fallback for single file) */}
            {files.length === 1 && (
              <div className="text-sm font-mono text-foreground-400">
                {currentFile.filename}
              </div>
            )}

            <div className="border border-background-700 rounded-lg overflow-hidden">
              <ElementFileViewer
                file={currentFile}
                onCopy={onCopy}
                copied={copied}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
