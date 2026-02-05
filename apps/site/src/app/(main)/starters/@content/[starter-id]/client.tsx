"use client";

import { useState, useMemo } from "react";
import type { ElementFile } from "ui-lab-registry";
import { getStarterById } from "ui-lab-registry";
import { CodeBlock } from "@/shared";
import { ContentHeader } from "@/shared/components/content-header";

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
              left: `${(depth - 1) * 20 + 10}px`,
              top: "0",
              height: "1.5rem",
            }}
          />
        )}

        <button
          onClick={() => {
            if (isFile) {
              onSelectFile(node.path);
            } else {
              onToggle(node.path);
            }
          }}
          className={`flex-1 text-left px-2 py-1.5 rounded text-sm transition-colors flex items-center gap-2 group ${
            isFile && activeFile === node.path
              ? "bg-background-800 text-foreground-50"
              : "text-foreground-400 hover:bg-background-800 hover:text-foreground-200"
          }`}
        >
          <span className="text-xs opacity-60 flex-shrink-0">
            {isFile ? "📄" : "📁"}
          </span>
          <span className="font-mono truncate flex-1">{node.name}</span>
          {!isFile && (
            <span className="text-foreground-500 flex-shrink-0 transition-transform group-hover:opacity-100 opacity-60">
              {isExpanded ? "⌄" : "❯"}
            </span>
          )}
        </button>
      </div>

      {!isFile && isExpanded && node.children && (
        <div>
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
        </div>
      )}
    </div>
  );
}

export default function StarterDetailClient({
  starterId,
}: StarterDetailClientProps) {
  const starter = useMemo(() => getStarterById(starterId), [starterId]);
  const [activeFile, setActiveFile] = useState<string>("");
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const files = starter?.files || [];
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

  return (
    <div className="pl-12 pt-(header-height)">
      <div className="w-full bg-background-950 mx-auto min-h-screen flex flex-col pt-60 pb-12">
        <div className="w-full mx-auto px-4 flex flex-col flex-1">
          <ContentHeader title={starter.name} description={starter.description} pricing={starter.pricing} purchaseUrl={starter.pricing?.purchaseUrl}>
            <div className="w-full h-48 bg-background-800 rounded border border-background-700 flex items-center justify-center">
              {/* Preview would go here if available */}
              <div className="text-foreground-500">Preview</div>
            </div>
          </ContentHeader>

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
                        <span className="text-xs text-foreground-500 uppercase">
                          {currentFile.language}
                        </span>
                      </div>
                      {currentFile.description && (
                        <p className="text-sm text-foreground-400">
                          {currentFile.description}
                        </p>
                      )}
                      <CodeBlock language={currentFile.language}>
                        {currentFile.code || ''}
                      </CodeBlock>
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
