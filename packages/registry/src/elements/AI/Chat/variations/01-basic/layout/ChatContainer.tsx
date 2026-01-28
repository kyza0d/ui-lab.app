import React from 'react';

interface ChatContainerProps {
  children: React.ReactNode;
}

export function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="flex flex-col h-full bg-background-800 border border-background-700 rounded-md overflow-hidden">
      {children}
    </div>
  );
}
