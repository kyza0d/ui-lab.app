'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { Scroll } from 'ui-lab-components';
import { cn, usePrefetchOnHover } from '@/shared';
import {
  FaSwatchbook,
  FaTags,
  FaUsers,
} from 'react-icons/fa6';

const SidebarItemLink = memo(function SidebarItemLink({
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

const LANDING_NAV_ITEMS = [
  { id: 'release-notes', label: 'Release Notes', href: '/releases', icon: FaTags },
  { id: 'community', label: 'Community', href: '/community', icon: FaUsers },
  { id: 'design-system', label: 'Design System', href: '/design-system', icon: FaSwatchbook },
];

const QUICK_LINKS = [
  { label: 'Getting Started', href: '/docs/usage' },
  { label: 'API Reference', href: '/docs' },
  { label: 'Examples', href: '/components' },
  { label: 'Customization', href: '/docs/customization' },
];

export function LandingSidebar() {
  return (
    <aside className={cn('hidden md:flex w-68 flex-col relative z-20 -mt-4')}>
      <div className="flex border-r bg-background-950 border-background-700 flex-col sticky top-(--header-height) z-20">
        <div className="z-10">
          <nav className="py-3 px-2 space-y-1">
            {LANDING_NAV_ITEMS.map((navItem) => {
              const Icon = navItem.icon;

              return (
                <Link
                  key={navItem.id}
                  href={navItem.href}
                  className={cn(
                    'flex border items-center gap-3 pl-0.5 pr-2 py-0.5 text-sm font-semibold rounded-md',
                    'border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 bg-background-800 border border-background-700 rounded-md flex items-center justify-center',
                      'text-foreground-300'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{navItem.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Scroll className="h-[calc(100vh-var(--header-height))]" maxHeight="100%" fadeY>
          <div className="py-7 px-5 space-y-8">
            <div>
              <span className="text-sm font-semibold text-foreground-400">Quick Links</span>
              <div className="relative mt-2.5">
                <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600"></div>
                <div className="space-y-1 pl-3">
                  {QUICK_LINKS.map((link) => (
                    <SidebarItemLink
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block px-3 py-1.5 text-sm rounded-md cursor-pointer',
                        'transition-colors duration-300 ease-out',
                        'hover:duration-0',
                        'text-foreground-200 hover:text-foreground-200 hover:bg-background-800/50'
                      )}
                    >
                      {link.label}
                    </SidebarItemLink>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold text-foreground-400">Resources</span>
              <div className="relative mt-2.5">
                <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600"></div>
                <div className="space-y-1 pl-3">
                  <SidebarItemLink
                    href="/docs/troubleshooting"
                    className={cn(
                      'block px-3 py-1.5 text-sm rounded-md cursor-pointer',
                      'transition-colors duration-300 ease-out',
                      'hover:duration-0',
                      'text-foreground-200 hover:text-foreground-200 hover:bg-background-800/50'
                    )}
                  >
                    Troubleshooting
                  </SidebarItemLink>
                  <SidebarItemLink
                    href="/docs"
                    className={cn(
                      'block px-3 py-1.5 text-sm rounded-md cursor-pointer',
                      'transition-colors duration-300 ease-out',
                      'hover:duration-0',
                      'text-foreground-200 hover:text-foreground-200 hover:bg-background-800/50'
                    )}
                  >
                    Documentation
                  </SidebarItemLink>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </aside>
  );
}
