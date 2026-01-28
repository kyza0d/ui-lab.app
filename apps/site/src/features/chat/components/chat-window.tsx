"use client";

import React from "react";
import { Button } from "ui-lab-components";
import { HiX } from "react-icons/hi";
import { useChat } from "../context/chat-context";

export function ChatWindow() {
  const { isOpen, closeChat } = useChat();

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-screen w-[25%] bg-background-950 border-l border-background-700 flex flex-col z-40">
      <div className="flex items-center justify-between px-4 py-3 border-b border-background-700 h-16">
        <h2 className="text-sm font-semibold text-foreground-50">AI Assistant</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={closeChat}
          className="p-1"
          aria-label="Close chat"
        >
          <HiX size={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-sm text-foreground-400">
          Chat window ready. AI responses coming soon.
        </div>
      </div>

      <div className="border-t border-background-700 p-4">
        <input
          type="text"
          placeholder="Ask me anything..."
          disabled
          className="w-full px-3 py-2 rounded-md bg-background-800 border border-background-700 text-foreground-50 placeholder-foreground-400 text-sm"
        />
      </div>
    </div>
  );
}
