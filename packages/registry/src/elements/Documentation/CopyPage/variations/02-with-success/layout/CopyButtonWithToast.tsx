import React, { useState } from 'react';

interface CopyButtonWithToastProps {
  onCopySuccess?: () => void;
}

export function CopyButtonWithToast({ onCopySuccess }: CopyButtonWithToastProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    setIsLoading(true);
    try {
      const text = document.body.innerText;
      await navigator.clipboard.writeText(text);
      onCopySuccess?.();
    } catch {
      console.error('Failed to copy');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={isLoading}
      className="px-4 py-2 bg-accent-500 text-foreground-50 rounded font-medium hover:bg-accent-600 transition-colors disabled:opacity-50 flex items-center gap-2"
    >
      <span>{isLoading ? '...' : '📋'}</span>
      {isLoading ? 'Copying...' : 'Copy Page'}
    </button>
  );
}
