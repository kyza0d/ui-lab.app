'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

export function HeaderClient() {
  const pathname = usePathname();

  return (
    <Header pathname={pathname} />
  );
}
