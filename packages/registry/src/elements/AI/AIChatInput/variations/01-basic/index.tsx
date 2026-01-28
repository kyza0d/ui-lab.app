"use client"
import React, { useState } from 'react';
import { PromptInput } from './layout/PromptInput';

export function BasicAIChatInput() {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (value: string) => {
    console.log('Prompt submitted:', value);
    setPrompt('');
  };

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground-50 mb-8">AI Chat Input</h1>

        <div className="space-y-8">
          <div>
            <p className="text-foreground-400 mb-4">Ask the AI anything:</p>
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleSubmit}
              placeholder="Enter your prompt..."
            />
          </div>

          {prompt && (
            <div className="bg-background-800 rounded-md border border-background-700 p-6">
              <p className="text-sm text-foreground-400 mb-2">Current prompt:</p>
              <p className="text-foreground-50">{prompt}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
