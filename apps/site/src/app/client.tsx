'use client';

import { AppProvider } from "@/features/theme";
import { ChatProvider } from "@/features/chat";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ChatProvider>
        {children}
      </ChatProvider>
    </AppProvider>
  );
}
