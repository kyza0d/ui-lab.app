"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "ui-lab-components";
import { FaFolder, FaFolderOpen, FaFile, FaExpand } from "react-icons/fa6";
import { PreviewContainer, DEVICE_PRESETS, calculateVariantFromWidth, PreviewDeviceVariant } from "@/features/preview";
import { Code } from "@/features/docs/components/code-display/code";
import { useExternalWindow } from "@/features/preview/hooks/use-external-window";
import type { ElementFile } from "ui-lab-registry";

type DeviceVariant = PreviewDeviceVariant;

interface ElementPreviewProps {
  variant: "preview" | "code";
  setVariant: (v: "preview" | "code") => void;
  files: ElementFile[];
  activeFile: string;
  setActiveFile: (filename: string) => void;
  DemoComponent?: React.ComponentType;
  deviceVariant?: DeviceVariant;
  onDeviceVariantChange?: (variant: DeviceVariant) => void;
  width?: number;
  onWidthChange?: (width: number) => void;
  elementId?: string;
  variantIndex?: number;
}

type FileNode = {
  name: string;
  filename?: string;
  children?: FileNode[];
};

export function ElementPreviewContent({
  variant,
  setVariant,
  files,
  activeFile,
  setActiveFile,
  DemoComponent,
  deviceVariant = "desktop",
  onDeviceVariantChange,
  width,
  onWidthChange,
  elementId,
  variantIndex,
}: ElementPreviewProps) {
  const [internalWidth, setInternalWidth] = useState(width ?? DEVICE_PRESETS[deviceVariant]);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const { openWindow } = useExternalWindow();

  const displayVariant = calculateVariantFromWidth(internalWidth);

  useEffect(() => { if (width !== undefined) setInternalWidth(width), [width] });

  const handleWidthChange = useCallback((newWidth: number) => {
    setInternalWidth(newWidth);
    onWidthChange?.(newWidth);
  }, [onWidthChange]);

  const handleDeviceVariantChange = useCallback((device: DeviceVariant) => {
    const newWidth = DEVICE_PRESETS[device];
    setInternalWidth(newWidth);
    onDeviceVariantChange?.(device);
    onWidthChange?.(newWidth);
  }, [onDeviceVariantChange, onWidthChange]);

  const fileTree = useMemo(() => {
    const root: FileNode[] = [];
    files.forEach((file) => {
      let current = root;
      const parts = file.filename.split("/");
      parts.forEach((part, i) => {
        const isLast = i === parts.length - 1;
        let node = current.find((n) => n.name === part);
        if (!node) {
          node = {
            name: part,
            ...(isLast ? { filename: file.filename } : {}),
            children: isLast ? undefined : []
          };
          current.push(node);
        }
        if (node.children) current = node.children;
      });
    });
    return root.sort((a, b) => (a.children && !b.children ? -1 : !a.children && b.children ? 1 : a.name.localeCompare(b.name)));
  }, [files]);

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
              className="flex items-center gap-1.5 w-full mb-2 px-2 py-2 text-sm hover:bg-background-700"
            >
              {isOpen ? <FaFolderOpen size={14} /> : <FaFolder size={14} />}
              <span className="text-foreground-300">{node.name}</span>
            </button>
            {isOpen && (
              <div className="ml-4">
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
            flex items-center gap-1.5 w-full px-2 py-2 text-sm
            ${isActive
              ? "bg-background-800 text-foreground-50"
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

  const handleOpenWindow = () => {
    if (elementId && variantIndex !== undefined) {
      openWindow({
        categoryId: "elements",
        exampleId: `${elementId}-${variantIndex}`,
        width: 1200,
        height: 900,
      });
    }
  };

  return (
    <div className="w-full max-w-5xl h-full overflow-hidden">
      <PreviewContainer
        deviceVariant={displayVariant}
        width={internalWidth}
        onWidthChange={handleWidthChange}
        activeTab={variant}
        onTabChange={setVariant}
        onDeviceVariantChange={handleDeviceVariantChange}
        previewClassName="min-h-[70vh]"
        showWidthLabel={variant === "preview"}
        rightContent={
          elementId && variantIndex !== undefined ? (
            <Button variant="outline" size="sm" onClick={handleOpenWindow}>
              <FaExpand size={14} />
            </Button>
          ) : null
        }
      >
        {variant === "preview" && DemoComponent ? (
          <div className="border-x border-background-700">
            <DemoComponent />
          </div>
        ) : (
          <div className="flex  w-full h-full overflow-hidden">
            {files.length > 1 && (
              <div className="w-60 shrink-0 border-r border-background-700 overflow-y-auto p-3">
                <div className="space-y-0.5">
                  {renderTree(fileTree)}
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col min-w-0">
              {files.length === 1 && (
                <div className="text-sm font-mono text-foreground-400 px-4 py-3 border-b border-background-700 shrink-0">
                  {currentFile.filename}
                </div>
              )}

              <div className="max-h-220">
                <Code className="border-0 h-full" language={currentFile.language} filename={currentFile.filename}>
                  {currentFile.code}
                </Code>
              </div>
            </div>
          </div>
        )}
      </PreviewContainer>
    </div>
  );
}
