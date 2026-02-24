import { PanelLeft } from 'lucide-react';
import { useState } from 'react';
import {
  FaHouse,
  FaUser,
  FaGear,
  FaRightFromBracket,
  FaChartPie,
  FaMessage,
  FaBell,
  FaCircleQuestion,
  FaBriefcase,
  FaCube
} from 'react-icons/fa6';
import { Divider, List, Fold } from 'ui-lab-components';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'home' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Dashboard', icon: FaHouse },
    { id: 'projects', label: 'Projects', icon: FaBriefcase },
    { id: 'analytics', label: 'Analytics', icon: FaChartPie },
    { id: 'messages', label: 'Messages', icon: FaMessage },
  ];

  const secondaryNavItems = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'settings', label: 'Settings', icon: FaGear },
  ];

  const bottomNavItems = [
    { id: 'help', label: 'Help & Support', icon: FaCircleQuestion },
  ];

  return (
    <aside
      className={`
        ${isCollapsed ? 'w-16' : 'w-70'} 
        bg-background-950 border-r border-background-700 
        flex text-xs flex-col transition-all duration-300 ease-in-out
        h-screen sticky top-0
      `}
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center justify-between px-2 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap animate-in fade-in duration-300">
            <div className="w-12 h-12 bg-background-800 flex items-center justify-center shrink-0 rounded-sm">
              <FaCube size={16} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground-50 leading-none">UI Lab</span>
              <span className="text-xs text-foreground-400 mt-1">Sidebar/01</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            p-2.5 rounded-sm text-foreground-400 hover:bg-background-900 hover:text-foreground-50 
            focus:outline-none focus:ring-2 focus:ring-accent-500/30
            ${isCollapsed ? 'mx-auto' : ''}
          `}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft size={19} />
        </button>
      </div>

      <Divider />

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <List aria-label="Main navigation" className="p-2 space-y-2">
          {mainNavItems.map((item) =>
            item.id === 'projects' && !isCollapsed ? (
              <Fold key={item.id}>
                <Fold.Trigger className="text-foreground-400 h-10 text-xs group rounded-sm">
                  <div className="flex items-center gap-4 min-w-0">
                    <item.icon
                      size={17}
                      className="shrink-0"
                    />
                    Projects
                  </div>
                </Fold.Trigger>
                <Fold.Content>
                  <div className="flex flex-col gap-0.5 pl-3 pr-2 mt-1">
                    {[
                      'Website Redesign',
                      'Mobile App',
                      'Marketing Campaign',
                    ].map((project) => (
                      <a
                        key={project}
                        href="#"
                        className="py-2 px-2 text-xs text-foreground-400 hover:text-foreground-50 rounded-sm hover:bg-background-900 block transition-colors"
                      >
                        {project}
                      </a>
                    ))}
                  </div>
                </Fold.Content>
              </Fold>
            ) : (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                isCollapsed={isCollapsed}
              />
            )
          )}
        </List>

        <List.Divider />

        <List aria-label="Secondary navigation" className="px-4 py-2 space-y-1">
          {secondaryNavItems.map((item) => (
            <NavItem key={item.id} item={item} isActive={activeItem === item.id} isCollapsed={isCollapsed} />
          ))}
        </List>
      </nav>

      {/* Footer */}
      <div className="shrink-0 space-y-1 bg-background-950 z-10">
        <Divider />

        <div className='px-2 pb-2'>
          {bottomNavItems.map((item) => (
            <NavItem key={item.id} item={item} isActive={activeItem === item.id} isCollapsed={isCollapsed} />
          ))}

          <button
            className={`
w-full flex items-center gap-4 px-3 py-2.5
text-foreground-400 hover:text-red-400 hover:bg-red-500/5
rounded-sm transition-all duration-200 group
`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <FaRightFromBracket size={17} className="shrink-0 transition-colors" />
            {!isCollapsed && (
              <span className="font-medium whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2 duration-200">
                Logout
              </span>
            )}
          </button>
        </div>
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
            flex items-center h-10 gap-4 px-3 rounded-sm transition-all duration-200 group relative
            ${isActive
          ? 'bg-background-900 text-foreground-100 border border-background-700'
          : 'text-foreground-400 hover:text-foreground-50 hover:bg-background-900'}
          `}
      title={isCollapsed ? item.label : undefined}
    >
      <Icon
        size={17}
        className="shrink-0 transition-transform duration-200"
      />

      {!isCollapsed && (
        <span className="font-medium whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2 duration-200">
          {item.label}
        </span>
      )}
    </a>
  )
}
