import React, { useRef, useEffect } from 'react';

interface PromptInputWithSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
}

export function PromptInputWithSuggestions({
  value,
  onChange,
  onSubmit,
  placeholder = 'Ask AI...',
}: PromptInputWithSuggestionsProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(value);
      }
    }
  };

  return (
    <div className="flex gap-3 p-4 bg-background-800 border border-background-700 rounded-md">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-0 text-foreground-50 placeholder-foreground-400 focus:outline-none resize-none"
        rows={1}
      />
      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            if (value.trim()) {
              onSubmit(value);
            }
          }}
          disabled={!value.trim()}
          className="px-4 py-2 bg-accent-500 text-foreground-50 rounded font-medium hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 text-sm"
        >
          Send
        </button>
        <button className="px-2 py-1 text-foreground-400 hover:text-foreground-200 text-xs rounded border border-background-700 hover:border-background-600 transition-colors">
          ⌘K
        </button>
      </div>
    </div>
  );
}
