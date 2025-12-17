'use client';

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 rounded p-1 text-foreground-500 opacity-0 transition-opacity hover:bg-background-800 hover:text-foreground-300 focus:opacity-100 group-hover:opacity-100"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
