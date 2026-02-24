'use client';

import { useState } from 'react';
import {
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiBox,
  FiPieChart,
  FiMessageSquare,
  FiBell,
  FiHelpCircle,
  FiBriefcase
} from 'react-icons/fi';
import { Divider, List } from 'ui-lab-components';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'home' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Dashboard', icon: FiHome },
    { id: 'projects', label: 'Projects', icon: FiBriefcase },
    { id: 'analytics', label: 'Analytics', icon: FiPieChart },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare },
  ];

  const secondaryNavItems = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const bottomNavItems = [
    { id: 'help', label: 'Help & Support', icon: FiHelpCircle },
  ];

  return (
    <aside
      className={`
        ${isCollapsed ? 'w-24' : 'w-80'} 
        bg-background-900 border-r border-background-800 
        flex flex-col transition-all duration-300 ease-in-out
        h-screen sticky top-0 shadow-xl
      `}
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center justify-between px-6 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap animate-in fade-in duration-300">
            <div className="w-10 h-10 bg-accent-600 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md">
              <FiBox size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-bold text-foreground-50 leading-none">UI Lab</span>
              <span className="text-sm text-foreground-400 mt-1 font-medium">Enterprise</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            p-2.5 rounded-xl text-foreground-400 hover:bg-background-800 hover:text-foreground-50 
            transition-all focus:outline-none focus:ring-2 focus:ring-accent-500/30
            ${isCollapsed ? 'mx-auto' : ''}
          `}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <FiChevronRight size={22} /> : <FiChevronLeft size={22} />}
        </button>
      </div>

      <div className="px-6">
        <Divider className="bg-background-800" />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <List aria-label="Main navigation" className="px-4 py-6 space-y-2">
          {mainNavItems.map((item) => (
            <NavItem key={item.id} item={item} isActive={activeItem === item.id} isCollapsed={isCollapsed} />
          ))}
        </List>

        <div className="px-4 my-4">
          <List.Divider />
        </div>

        <List aria-label="Secondary navigation" className="px-4 py-2 space-y-2">
          {secondaryNavItems.map((item) => (
            <NavItem key={item.id} item={item} isActive={activeItem === item.id} isCollapsed={isCollapsed} />
          ))}
        </List>
      </nav>

      {/* Footer */}
      <div className="p-4 shrink-0 space-y-2 bg-background-900 z-10">
        <Divider className="mb-4 bg-background-800" />

        {bottomNavItems.map((item) => (
          <NavItem key={item.id} item={item} isActive={activeItem === item.id} isCollapsed={isCollapsed} />
        ))}

        <button
          className={`
            w-full flex items-center gap-4 px-3 py-3
            text-foreground-400 hover:text-red-400 hover:bg-red-500/10
            rounded-xl transition-all duration-200 group
            ${isCollapsed ? 'justify-center' : ''}
          `}
          title={isCollapsed ? "Logout" : undefined}
        >
          <FiLogOut size={22} className="shrink-0 transition-colors" />
          {!isCollapsed && (
            <span className="text-md font-medium whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2 duration-200">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}

function NavItem({ item, isActive, isCollapsed }: { item: any, isActive: boolean, isCollapsed: boolean }) {
  const Icon = item.icon;
  return (
    <a
      href="#"
      className={`
            flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative
            ${isActive
          ? 'bg-accent-500/10 text-accent-500 shadow-sm'
          : 'text-foreground-400 hover:text-foreground-50 hover:bg-background-800'}
            ${isCollapsed ? 'justify-center' : ''}
          `}
      title={isCollapsed ? item.label : undefined}
    >
      <Icon
        size={22}
        className={`shrink-0 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}
      />

      {!isCollapsed && (
        <span className="text-md font-medium whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2 duration-200">
          {item.label}
        </span>
      )}
    </a>
  )
}
