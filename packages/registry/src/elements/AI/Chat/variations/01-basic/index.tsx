"use client"
import React, { useState } from 'react';
import { ChatContainer } from './layout/ChatContainer';
import { ChatMessage } from './layout/ChatMessage';
import { ChatInput } from './layout/ChatInput';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
}

export function BasicChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hello! How can I assist you today?', sender: 'ai' },
    { id: '2', content: 'I need help with my project', sender: 'user' },
    { id: '3', content: 'Sure! Tell me more about what you need help with.', sender: 'ai' },
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
        content: 'That sounds interesting! I can help you with that.',
        sender: 'ai' as const,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-2xl mx-auto h-96">
        <ChatContainer>
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message.content} sender={message.sender} />
            ))}
          </div>
          <div className="border-t border-background-700 p-4">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </ChatContainer>
      </div>
    </div>
  );
}
