"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "ui-lab-components";
import { FaFolder, FaFolderOpen, FaFile, FaExpand } from "react-icons/fa6";
import { ResizablePreviewContainer, DEVICE_PRESETS, calculateVariantFromWidth, PreviewDeviceVariant } from "@/features/preview";
import { CodeBlock } from "@/shared/components/code-block";
import { useExternalWindow } from "@/shared";
import type { ElementFile } from "ui-lab-registry";

type DeviceVariant = PreviewDeviceVariant;

interface ElementPreviewProps {
  variant: "preview" | "code";
  setVariant: (v: "preview" | "code") => void;
  files: ElementFile[];
  activeFile: string;
  setActiveFile: (filename: string) => void;
  copied: boolean;
  onCopy: () => void;
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
  copied,
  onCopy,
  DemoComponent,
  deviceVariant = "desktop",
  onDeviceVariantChange,
  width,
  onWidthChange,
  elementId,
  variantIndex,
}: ElementPreviewProps) {
  const [internalWidth, setInternalWidth] = useState(width ?? DEVICE_PRESETS[deviceVariant]);
  const [internalDeviceVariant, setInternalDeviceVariant] = useState<DeviceVariant>(deviceVariant);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const { openWindow } = useExternalWindow();

  // Calculate which device variant the current width represents
  const displayVariant = calculateVariantFromWidth(internalWidth);

  useEffect(() => {
    if (width !== undefined) {
      setInternalWidth(width);
    }
  }, [width]);

  // When device variant prop changes, update internal state and width
  useEffect(() => {
    setInternalDeviceVariant(deviceVariant);
    if (width === undefined) {
      setInternalWidth(DEVICE_PRESETS[deviceVariant]);
    }
  }, [deviceVariant, width]);

  const handleWidthChange = useCallback((newWidth: number) => {
    setInternalWidth(newWidth);
    onWidthChange?.(newWidth);
  }, [onWidthChange]);

  const handleDeviceVariantChange = useCallback((device: DeviceVariant) => {
    const newWidth = DEVICE_PRESETS[device];
    setInternalWidth(newWidth);
    setInternalDeviceVariant(device);
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
    <div className="w-full max-w-5xl h-[70vh] overflow-hidden">
      <ResizablePreviewContainer
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
          <DemoComponent />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4 p-4 w-full overflow-hidden">
            {files.length > 1 && (
              <div className="bg-background-800 border border-background-700 rounded-lg p-3 overflow-y-auto h-full flex-shrink-0">
                <div className="text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-3">
                  Files
                </div>
                <div className="space-y-0.5">
                  {renderTree(fileTree)}
                </div>
              </div>
            )}

            <div className="flex flex-col w-full h-full min-w-0 overflow-hidden gap-3">
              {files.length === 1 && (
                <div className="text-sm font-mono text-foreground-400 flex-shrink-0">
                  {currentFile.filename}
                </div>
              )}

              <div className="flex-1 min-h-0 overflow-hidden">
                <CodeBlock language={currentFile.language} filename={currentFile.filename}>
                  {currentFile.code}
                </CodeBlock>
              </div>
            </div>
          </div>
        )}
      </ResizablePreviewContainer>
    </div>
  );
}
