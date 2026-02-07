'use client';

import { AppProvider } from "@/features/theme";
import { ChatProvider, useChat } from "@/features/chat";
import { cn } from "@/shared";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen: isChatOpen } = useChat();

  return (
    <div
      className={cn(
        isChatOpen ? "mr-[25%]" : "mr-0"
      )}
    >
      {children}
    </div>
  );
}

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ChatProvider>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </ChatProvider>
    </AppProvider>
  );
}