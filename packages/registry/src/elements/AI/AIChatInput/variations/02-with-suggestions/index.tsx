"use client"
import React, { useState } from 'react';
import { PromptInputWithSuggestions } from './layout/PromptInputWithSuggestions';

export function AIChatInputWithSuggestions() {
  const [prompt, setPrompt] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const suggestions = [
    'Explain this concept in simple terms',
    'Write a code example',
    'What are the best practices?',
    'How do I debug this?',
  ];

  const handleSubmit = (value: string) => {
    console.log('Prompt submitted:', value);
    setPrompt('');
    setSelectedSuggestion(null);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setPrompt(suggestion);
  };

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground-50 mb-8">Chat with AI</h1>

        <div className="space-y-6">
          {prompt.length === 0 && (
            <div>
              <p className="text-sm text-foreground-400 mb-3">Quick suggestions:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left px-3 py-2 bg-background-800 border border-background-700 rounded hover:border-accent-500 hover:bg-background-700/80 transition-colors text-sm text-foreground-300 hover:text-foreground-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <PromptInputWithSuggestions
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleSubmit}
            placeholder="Enter your prompt or use a suggestion..."
          />

          {selectedSuggestion && (
            <div className="p-4 bg-background-800 border border-accent-500/30 rounded-md">
              <p className="text-xs text-foreground-400 mb-1">Using suggestion:</p>
              <p className="text-foreground-50">{selectedSuggestion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
