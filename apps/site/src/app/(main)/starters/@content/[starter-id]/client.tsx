"use client";

import { useState, useMemo } from "react";
import type { ElementFile } from "ui-lab-registry";
import { getStarterById } from "ui-lab-registry";
import { Code } from "@/features/docs/components/code-display/code";
import { ContentHeader } from "@/features/navigation/components/content-header";
import { PurchaseModalClient, usePurchaseModal } from "@/features/packages";
import { Button } from "ui-lab-components";
import { FaShop } from "react-icons/fa6";

interface StarterDetailClientProps {
  starterId: string;
}

interface TreeNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: TreeNode[];
  isEntryPoint?: boolean;
}

function buildFileTree(files: ElementFile[]): TreeNode[] {
  const root: TreeNode[] = [];
  const nodeMap = new Map<string, TreeNode>();

  files.forEach(file => {
    const parts = file.filename.split("/");
    let currentPath = "";

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isFile = index === parts.length - 1;

      if (!nodeMap.has(currentPath)) {
        const node: TreeNode = {
          name: part,
          path: currentPath,
          type: isFile ? "file" : "folder",
          isEntryPoint: isFile && file.isEntryPoint,
        };

        if (isFile) {
          node.children = undefined;
        } else {
          node.children = [];
        }

        nodeMap.set(currentPath, node);

        const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
        if (parentPath) {
          const parent = nodeMap.get(parentPath);
          if (parent && parent.children) {
            parent.children.push(node);
          }
        } else {
          root.push(node);
        }
      }
    });
  });

  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    nodes.forEach(node => {
      if (node.children) sortNodes(node.children);
    });
  };

  sortNodes(root);
  return root;
}

function FileTreeNode({
  node,
  expanded,
  onToggle,
  onSelectFile,
  activeFile,
  depth = 0,
}: {
  node: TreeNode;
  expanded: Record<string, boolean>;
  onToggle: (path: string) => void;
  onSelectFile: (filename: string) => void;
  activeFile: string;
  depth?: number;
}) {
  const isExpanded = node.type === "file" ? false : expanded[node.path] ?? true;
  const isFile = node.type === "file";

  return (
    <div>
      <div className="flex items-center relative" style={{ paddingLeft: `${depth * 20}px` }}>
        {depth > 0 && (
          <div
            className="w-px bg-background-700 absolute"
            style={{
              left: `${depth * 20 - 10}px`,
              top: "0",
              height: "20px",
            }}
          />
        )}
        {node.type === "folder" && (
          <button
            onClick={() => onToggle(node.path)}
            className="text-foreground-400 hover:text-foreground-300 mr-2 w-4 text-center"
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        )}
        {node.type === "file" && <span className="mr-2 w-4 text-center">📄</span>}
        <button
          onClick={() => {
            if (node.type === "file") {
              onSelectFile(node.path);
            }
          }}
          className={`text-sm ${
            node.type === "file"
              ? activeFile === node.path
                ? "text-accent-400 font-medium"
                : "text-foreground-400 hover:text-foreground-300"
              : "text-foreground-300 font-medium"
          }`}
        >
          {node.name}
        </button>
      </div>
      {node.children && isExpanded && (
        <>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              expanded={expanded}
              onToggle={onToggle}
              onSelectFile={onSelectFile}
              activeFile={activeFile}
              depth={depth + 1}
            />
          ))}
        </>
      )}
    </div>
  );
}

function StarterDetailContent({ starterId }: StarterDetailClientProps) {
  const [activeFile, setActiveFile] = useState<string>("");
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const starter = getStarterById(starterId);
  const files = starter?.files || [];
  const modalContext = usePurchaseModal();

  const fileTree = useMemo(() => buildFileTree(files), [files]);

  const currentFile = useMemo(() => {
    if (!files.length) return null;
    const filename = activeFile || files.find(f => f.isEntryPoint)?.filename || files[0]?.filename;
    return files.find(f => f.filename === filename) || files[0];
  }, [files, activeFile]);

  const handleToggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  if (!starter) {
    return (
      <div className="w-full bg-background-950 mx-auto pt-12 pb-12">
        <div className="mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-foreground-400">Starter not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const isPremium = starter.pricing && starter.pricing.price !== null;

  return (
    <div className="pt-(header-height)">
      <div className="w-full bg-background-950 mx-auto min-h-screen flex flex-col pt-60 pb-12">
        <div className="w-full mx-auto px-4 flex flex-col flex-1">
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 mb-12">
              <div className="flex items-center justify-center">
                <div className="w-full h-48 bg-background-800 rounded border border-background-700 flex items-center justify-center">
                  <div className="text-foreground-400">Preview</div>
                </div>
              </div>
              <div className="flex relative flex-col justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground-50 flex-1">{starter.name}</h1>
                    <p className="text-foreground-400 text-sm sm:text-base leading-relaxed flex-1">{starter.description}</p>
                  </div>
                </div>
                {isPremium && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <Button
                      icon={{ left: <FaShop /> }}
                      size="md"
                      variant="primary"
                      onClick={() => modalContext.openModal(starter)}
                    >
                      Purchase on Gumroad
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {starter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {starter.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2.5 py-1 text-sm bg-background-900 border border-background-700 text-foreground-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="space-y-8 flex-1">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 space-y-2">
                <h3 className="text-sm font-semibold text-foreground-200 mb-3">
                  Project Files
                </h3>
                <div className="bg-background-900 rounded border border-background-700 p-2 overflow-hidden">
                  {fileTree.map((node) => (
                    <FileTreeNode
                      key={node.path}
                      node={node}
                      expanded={expandedFolders}
                      onToggle={handleToggleFolder}
                      onSelectFile={setActiveFile}
                      activeFile={activeFile || currentFile?.filename || ""}
                    />
                  ))}
                </div>
              </div>

              <div className="col-span-9">
                {currentFile && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground-200">
                        {currentFile.filename}
                      </h3>
                      <span className="text-xs text-foreground-400 uppercase">
                        {currentFile.language}
                      </span>
                    </div>
                    {currentFile.description && (
                      <p className="text-sm text-foreground-400">
                        {currentFile.description}
                      </p>
                    )}
                    <Code language={currentFile.language}>
                      {currentFile.code || ''}
                    </Code>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StarterDetailClient(props: StarterDetailClientProps) {
  return (
    <PurchaseModalClient type="starter">
      <StarterDetailContent {...props} />
    </PurchaseModalClient>
  );
}
