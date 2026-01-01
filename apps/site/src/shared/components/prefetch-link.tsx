'use client';

import Link from 'next/link';
import { usePrefetchOnHover } from '../hooks/use-prefetch-on-hover';

interface PrefetchLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode;
}

export function PrefetchLink({ href, children, onMouseEnter: onMouseEnterProp, onMouseLeave: onMouseLeaveProp, ...props }: PrefetchLinkProps) {
  const { shouldPrefetch, onMouseEnter, onMouseLeave } = usePrefetchOnHover(String(href));

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onMouseEnter();
    onMouseEnterProp?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onMouseLeave();
    onMouseLeaveProp?.(e);
  };

  return (
    <Link
      href={href}
      prefetch={shouldPrefetch ? null : false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Link>
  );
}
