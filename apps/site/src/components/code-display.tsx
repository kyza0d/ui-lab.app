"use client";

import { useState } from "react";
import { FaCopy, FaCheck, FaDownload } from "react-icons/fa6";
import { copyToClipboard } from "@/lib/config-generator";

interface CodeDisplayProps {
  code: string;
  language?: string;
  fileName?: string;
  title?: string;
  showCopyButton?: boolean;
}

export const CodeDisplay = ({
  code,
  language = "css",
  fileName = "globals.css",
  showCopyButton = false
}: CodeDisplayProps) => {
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const lines = code.split("\n");
  const maxLineNumber = lines.length;
  const lineNumberWidth = maxLineNumber.toString().length;

  return (
    <div className="space-y-3">
      <div className="rounded-lg border-2 border-background-700 bg-background-900">
        {/* Main Header */}

        <div className="sticky top-15 z-10 flex justify-end px-4 py-2 bg-background-800 border-b border-background-700">
          {/* Sticky Copy Button - positioned above scrollable content */}
          <div className="w-full flex items-center">
            <div className="mr-auto">
              <code className="text-xs text-foreground-400 font-mono">
                {fileName}
              </code>
              <span className="text-xs text-foreground-500 bg-background-700 px-2 py-1 rounded">
                {language}
              </span>
            </div>

            <button
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              className="px-2 py-1 text-xs text-foreground-400 hover:text-foreground-200 rounded transition-colors"
              title="Toggle line numbers"
            >
              Lines
            </button>

            <button
              onClick={handleDownload}
              className="p-2 text-foreground-400 hover:text-foreground-200 hover:bg-background-700 rounded transition-colors"
              title="Download file"
            >
              <FaDownload size={14} />
            </button>

            {showCopyButton && (
              <div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1 text-xs text-foreground-400 hover:text-foreground-200 hover:bg-background-700 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <FaCheck size={12} className="text-accent-500" />
                  ) : (
                    <FaCopy size={12} />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Code Content */}
        <div className="overflow-x-auto overflow-hidden">
          <pre className="p-4 text-xs leading-relaxed font-mono text-foreground-300">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span
                    className="inline-block w-12 pr-4 text-right text-foreground-500 select-none"
                    style={{ minWidth: `${(lineNumberWidth + 2) * 0.6}rem` }}
                  >
                    {index + 1}
                  </span>
                )}
                <span className="flex-1">
                  {line || "\n"}
                </span>
              </div>
            ))}
          </pre>
        </div>

        {/* Footer Info */}
        <div className="px-4 py-2 bg-background-800 border-t border-background-700">
          <span className="text-xs text-foreground-500">
            {lines.length} lines
          </span>
        </div>
      </div>
    </div >
  );
};
