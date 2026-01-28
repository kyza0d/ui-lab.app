"use client";

import { useState, useMemo } from "react";
import type { ElementFile } from "ui-lab-registry";
import { getStarterById } from "ui-lab-registry";
import { CodeBlock } from "@/shared";

interface StarterDetailClientProps {
  starterId: string;
}

export default function StarterDetailClient({
  starterId,
}: StarterDetailClientProps) {
  const starter = useMemo(() => getStarterById(starterId), [starterId]);
  const [activeFile, setActiveFile] = useState<string>("");

  const files = starter?.files || [];

  const currentFile = useMemo(() => {
    if (!files.length) return null;
    const filename = activeFile || files.find(f => f.isEntryPoint)?.filename || files[0]?.filename;
    return files.find(f => f.filename === filename) || files[0];
  }, [files, activeFile]);

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
          <div className="mb-28">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground-50 mb-2">
                  {starter.name}
                </h1>
                <p className="text-foreground-400 max-w-2xl">
                  {starter.description}
                </p>
              </div>
            </div>

            {starter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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
          </div>

          <div className="space-y-8 flex-1">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 space-y-2">
                  <h3 className="text-sm font-semibold text-foreground-200 mb-3">
                    Project Files
                  </h3>
                  <div className="space-y-1">
                    {files.map((file) => (
                      <button
                        key={file.filename}
                        onClick={() => setActiveFile(file.filename)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          currentFile?.filename === file.filename
                            ? 'bg-background-800 text-foreground-50 border border-background-600'
                            : 'text-foreground-400 hover:bg-background-900 hover:text-foreground-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs opacity-60">
                            {file.filename.includes('/') ? '📁' : '📄'}
                          </span>
                          <span className="font-mono truncate">
                            {file.filename}
                          </span>
                        </div>
                      </button>
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
