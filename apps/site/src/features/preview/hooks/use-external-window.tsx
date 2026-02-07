"use client";

import { useCallback, useRef } from "react";

interface OpenWindowOptions {
  categoryId: string;
  exampleId: string;
  width?: number;
  height?: number;
}

export function useExternalWindow() {
  const windowRef = useRef<Window | null>(null);

  const openWindow = useCallback((options: OpenWindowOptions) => {
    const { categoryId, exampleId, width = 1200, height = 900 } = options;

    if (windowRef.current && !windowRef.current.closed) {
      windowRef.current.focus();
      return;
    }

    const url = `/preview/${categoryId}/${exampleId}`;
    windowRef.current = window.open(
      url,
      "_blank",
      `width=${width},height=${height},scrollbars=yes,resizable=yes`
    );

    if (!windowRef.current) {
      console.error("Failed to open external window. Check popup blockers.");
      return;
    }

    windowRef.current.addEventListener("beforeunload", () => {
      windowRef.current = null;
    });
  }, []);

  const closeWindow = useCallback(() => {
    if (windowRef.current && !windowRef.current.closed) {
      windowRef.current.close();
      windowRef.current = null;
    }
  }, []);

  return { openWindow, closeWindow, isOpen: windowRef.current !== null && !windowRef.current.closed };
}
