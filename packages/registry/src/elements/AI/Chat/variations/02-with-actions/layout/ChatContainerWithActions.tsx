import React from 'react';

interface ChatContainerWithActionsProps {
  children: React.ReactNode;
}

export function ChatContainerWithActions({ children }: ChatContainerWithActionsProps) {
  return (
    <div className="flex flex-col h-full bg-background-800 border border-background-700 rounded-md overflow-hidden">
      {children}
    </div>
  );
}
