import React from 'react';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'home' }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-background-800 border-r border-background-700 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-background-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent-500 rounded-lg" />
          <span className="text-lg font-semibold text-foreground-50">UI Lab</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <a
              key={item.id}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-accent-500 text-foreground-50'
                  : 'text-foreground-400 hover:text-foreground-300 hover:bg-background-700'
              }`}
            >
              <div className="w-5 h-5 bg-background-700 rounded flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-background-700">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded-lg transition-colors">
          <div className="w-5 h-5 bg-background-700 rounded flex-shrink-0" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
