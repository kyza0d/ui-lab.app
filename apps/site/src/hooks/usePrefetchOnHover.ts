import { useCallback, useRef, useState } from 'react';

const PREFETCH_DEBOUNCE_MS = 100;
const prefetchedUrls = new Set<string>();

export function usePrefetchOnHover(href: string) {
  const [shouldPrefetch, setShouldPrefetch] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    debounceTimeoutRef.current = setTimeout(() => {
      if (!prefetchedUrls.has(href)) {
        setShouldPrefetch(true);
        prefetchedUrls.add(href);
      }
    }, PREFETCH_DEBOUNCE_MS);
  }, [href]);

  const handleMouseLeave = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  return {
    shouldPrefetch,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
}
