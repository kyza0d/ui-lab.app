"use client"
import React, { useState } from 'react';
import { ChatContainerWithActions } from './layout/ChatContainerWithActions';
import { ChatMessage } from './layout/ChatMessage';
import { ChatInputWithActions } from './layout/ChatInputWithActions';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
}

export function ChatWithActions() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hello! I can help you with questions or tasks.', sender: 'ai' },
    { id: '2', content: 'Can you help me with debugging?', sender: 'user' },
    { id: '3', content: 'Absolutely! I can help you debug your code. What issue are you facing?', sender: 'ai' },
  ]);

  const handleSendMessage = (content: string) => {
    const userMessage = {
      id: String(messages.length + 1),
      content,
      sender: 'user' as const,
    };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const aiMessage = {
        id: String(messages.length + 2),
        content: 'I can help with that. Let me analyze your code.',
        sender: 'ai' as const,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  const handleAction = (action: string) => {
    const actionMessage = {
      id: String(messages.length + 1),
      content: `[Action: ${action}]`,
      sender: 'user' as const,
    };
    setMessages([...messages, actionMessage]);
  };

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-2xl mx-auto h-96">
        <ChatContainerWithActions>
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message.content} sender={message.sender} />
            ))}
          </div>
          <div className="border-t border-background-700 p-4 bg-background-700/50">
            <div className="flex gap-2 mb-3 flex-wrap">
              <button
                onClick={() => handleAction('Copy code')}
                className="px-2 py-1 bg-background-700 hover:bg-background-600 text-foreground-400 hover:text-foreground-300 rounded text-xs transition-colors"
              >
                📋 Copy
              </button>
              <button
                onClick={() => handleAction('Explain')}
                className="px-2 py-1 bg-background-700 hover:bg-background-600 text-foreground-400 hover:text-foreground-300 rounded text-xs transition-colors"
              >
                💡 Explain
              </button>
              <button
                onClick={() => handleAction('Refactor')}
                className="px-2 py-1 bg-background-700 hover:bg-background-600 text-foreground-400 hover:text-foreground-300 rounded text-xs transition-colors"
              >
                ✨ Refactor
              </button>
            </div>
            <ChatInputWithActions onSendMessage={handleSendMessage} />
          </div>
        </ChatContainerWithActions>
      </div>
    </div>
  );
}
