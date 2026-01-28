import React, { useState } from 'react';

export function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = document.body.innerText;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 rounded font-medium transition-colors flex items-center gap-2 ${
        copied
          ? 'bg-success-500 text-foreground-50'
          : 'bg-accent-500 text-foreground-50 hover:bg-accent-600'
      }`}
    >
      <span>{copied ? '✓' : '📋'}</span>
      {copied ? 'Copied!' : 'Copy Page'}
    </button>
  );
}
