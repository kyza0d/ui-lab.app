'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { memo } from 'react';
import { Badge, Scroll, Tooltip } from 'ui-lab-components';
import { cn } from '@/shared';
import { usePrefetchOnHover } from '@/shared/hooks/use-prefetch-on-hover';
import { useLandingSidebarToggle } from '@/features/layout/hooks/landing-sidebar-context';
import {
  FaBook,
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
  { id: 'docs', label: 'Getting Started', href: '/docs', icon: FaBook },
  { id: 'design-system', label: 'Design System', href: '/design-system', icon: FaSwatchbook },
  { id: 'community', label: 'Community', href: '/community', icon: FaUsers },
];

const QUICK_LINKS = [
  { label: 'Getting Started', href: '/docs/usage' },
  { label: 'API Reference', href: '/docs' },
  { label: 'Examples', href: '/components' },
  { label: 'Customization', href: '/docs/customization' },
];

const AGENT_LINKS = [
  { label: 'Skill', href: '/docs/agent/skills' },
  { label: 'LLMS.txt', href: '/llms.txt' },
  { label: 'MCP', href: '/docs/agents-mcps-installation' },
];

export function LandingSidebar() {
  const { isOpen, toggleSidebar, closeSidebar } = useLandingSidebarToggle();
  const pathname = usePathname();

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={closeSidebar} />}

      <aside className={cn(
        'w-64 flex flex-col lg:-mt-4',
        'fixed lg:static left-0 top-0 h-screen lg:h-auto border-r border-background-700',
        'z-[55] lg:z-20',
        'transition-transform duration-300 ease-out',
        'lg:transition-none lg:transform-none',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex bg-background-950 flex-col sticky md:sticky top-(--header-height) z-20 h-screen md:h-auto">
          <div className="z-10">
            <nav className="py-3 px-2 space-y-1">
              {LANDING_NAV_ITEMS.map((navItem) => {
                const Icon = navItem.icon;
                const isActive = pathname.startsWith(navItem.href);

                if (navItem.label === "Community") {
                  return (
                    <Tooltip position='right' key={navItem.id} content="Coming soon" showArrow={true}>
                      <div className='relative'>
                        <button
                          className="opacity-60 flex items-center gap-3 pl-0.5 pr-2 py-0.5 text-xs font-semibold rounded-full text-foreground-400 border border-transparent"
                        >
                          <div className="w-10 h-10 bg-background-800 border border-background-700 rounded-sm flex items-center justify-center text-foreground-300">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-semibold">Community</span>
                        </button>
                      </div>
                    </Tooltip>
                  );
                }

                // Normal active nav item
                return (
                  <Link
                    key={navItem.id}
                    href={navItem.href}
                    className={cn(
                      "flex border items-center gap-3 pl-0.5 pr-2 py-0.5 text-xs font-semibold rounded-sm",
                      isActive
                        ? "border-background-700 text-foreground-50 bg-background-800"
                        : "border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 bg-background-800 border border-background-700 rounded-sm flex items-center justify-center",
                        isActive ? "bg-transparent text-foreground-50" : "text-foreground-300"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold">{navItem.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <Scroll className="h-[calc(100vh-var(--header-height))]" maxHeight="100%" fadeY>
            <div className="py-7 px-5 space-y-8">
              <div>
                <span className="text-xs font-semibold text-foreground-400">Quick Links</span>
                <div className="relative mt-2.5">
                  <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600"></div>
                  <div className="space-y-1 pl-3">
                    {QUICK_LINKS.map((link) => (
                      <SidebarItemLink
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'block px-3 py-1.5  rounded-sm cursor-pointer',
                          'transition-colors duration-300 ease-out',
                          'hover:duration-0',
                          'text-foreground-200 hover:text-foreground-200 hover:bg-background-800/50'
                        )}
                      >
                        <span className='text-xs font-medium'>{link.label}</span>
                      </SidebarItemLink>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-foreground-400">Resources</span>
                <div className="relative mt-2.5">
                  <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600"></div>
                  <div className="space-y-1 pl-3">
                    <SidebarItemLink
                      href="/docs/troubleshooting"
                      className={cn(
                        'block px-3 py-1.5 text-xs rounded-sm cursor-pointer',
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
                        'block px-3 py-1.5 text-xs rounded-sm cursor-pointer',
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

              <div>
                <span className="text-xs font-semibold text-foreground-400">AI & Agents</span>
                <div className="relative mt-2.5">
                  <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600"></div>
                  <div className="space-y-1 pl-3">
                    {AGENT_LINKS.map((link) => (
                      <SidebarItemLink
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'block px-3 py-1.5  font-medium text-xs rounded-sm cursor-pointer',
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
            </div>
          </Scroll>
        </div>
      </aside>
    </>
  );
}
