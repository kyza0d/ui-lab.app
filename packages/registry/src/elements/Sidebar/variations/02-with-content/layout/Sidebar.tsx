import React from 'react';
import { List, Divider } from 'ui-lab-components';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'dashboard' }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'home', label: 'Home' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-background-800 border-r border-background-700 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-background-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent-500 rounded-lg" />
          <span className="text-lg font-semibold text-foreground-50">Dashboard</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto">
        <List ariaLabel="Navigation" className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <List.Item
                key={item.id}
                interactive
                selected={isActive}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-accent-500 text-foreground-50'
                    : 'text-foreground-400 hover:text-foreground-300 hover:bg-background-700'
                }`}
              >
                <a
                  href="#"
                  className="flex items-center gap-3 w-full"
                >
                  <div className="w-5 h-5 bg-background-700 rounded flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </List.Item>
            );
          })}
        </List>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-background-700">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-background-700">
          <div className="w-8 h-8 bg-accent-500 rounded-full flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground-50 truncate">John Doe</div>
            <div className="text-xs text-foreground-400 truncate">john@example.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
