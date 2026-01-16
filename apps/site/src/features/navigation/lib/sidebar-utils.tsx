'use client';

import React, { useEffect, useRef, memo, type RefObject } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn, usePrefetchOnHover } from '@/shared';

export interface SidebarSection {
  label: string;
  items: Array<{
    id: string;
    label: string;
  }>;
}

export function useSidebarScroll(
  storageKey: string,
  containerRef: RefObject<HTMLDivElement>
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const savedPosition = sessionStorage.getItem(storageKey);
    if (savedPosition) {
      container.scrollTop = parseInt(savedPosition, 10);
    }

    const handleScroll = () => {
      sessionStorage.setItem(storageKey, container.scrollTop.toString());
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [storageKey, containerRef]);
}

export const SidebarItemLink = memo(function SidebarItemLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { onMouseEnter } = usePrefetchOnHover(href);

  return (
    <>
      <Link
        href={href}
        prefetch={false}
        onMouseEnter={onMouseEnter}
        style={{ display: 'none' }}
        aria-hidden
      />
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push(href)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            router.push(href);
          }
        }}
        onMouseEnter={onMouseEnter}
        className={className}
      >
        {children}
      </div>
    </>
  );
});
