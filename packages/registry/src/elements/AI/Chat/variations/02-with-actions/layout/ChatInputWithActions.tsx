import React, { useState } from 'react';

interface ChatInputWithActionsProps {
  onSendMessage: (message: string) => void;
}

export function ChatInputWithActions({ onSendMessage }: ChatInputWithActionsProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-background-700 border border-background-600 rounded px-3 py-2 text-sm text-foreground-50 placeholder-foreground-500 focus:outline-none focus:border-accent-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-accent-500 text-foreground-50 rounded font-medium hover:bg-accent-600 transition-colors text-sm"
      >
        Send
      </button>
    </form>
  );
}
