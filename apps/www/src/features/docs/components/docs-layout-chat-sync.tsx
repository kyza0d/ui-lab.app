'use client';

import { useEffect } from 'react';

import { useChat } from '@/features/chat';

interface DocsLayoutChatSyncProps {
  rootId: string;
}

export function DocsLayoutChatSync({ rootId }: DocsLayoutChatSyncProps) {
  const { isOpen } = useChat();

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    root.dataset.chatOpen = isOpen ? 'true' : 'false';
  }, [isOpen, rootId]);

  return null;
}
