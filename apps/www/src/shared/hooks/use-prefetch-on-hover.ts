'use client'

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const PREFETCH_DEBOUNCE_MS = 100;
const prefetchedUrls = new Set<string>();

export function usePrefetchOnHover(href: string) {
  const router = useRouter();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    debounceTimeoutRef.current = setTimeout(() => {
      if (!prefetchedUrls.has(href)) {
        router.prefetch(href);
        prefetchedUrls.add(href);
      }
    }, PREFETCH_DEBOUNCE_MS);
  }, [href, router]);

  const handleMouseLeave = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
}
