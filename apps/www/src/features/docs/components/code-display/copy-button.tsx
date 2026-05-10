'use client';

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "ui-lab-components";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="absolute p-1 right-2 top-2 z-10"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </Button>
  );
}
