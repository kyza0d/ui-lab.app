const sourceCodeMap: Record<string, string> = {
  'header-basic': `import { Button } from 'ui-lab-components';

export function HeaderBasic() {
  return (
    <header className="bg-background-800 border-b border-background-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-500 rounded-lg" />
          <span className="text-lg font-semibold text-foreground-50">Logo</span>
        </div>
        <nav className="flex gap-1">
          <a href="#" className="px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">Home</a>
          <a href="#" className="px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">About</a>
          <a href="#" className="px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
}`,

  'header-with-nav': `import { Button } from 'ui-lab-components';
import { FaUser, FaBell } from 'react-icons/fa6';

export function HeaderWithNav() {
  return (
    <header className="bg-background-800 border-b border-background-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-500 rounded-lg" />
          <span className="text-lg font-semibold text-foreground-50">Logo</span>
        </div>
        <nav className="hidden md:flex gap-1">
          <a href="#" className="px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">Home</a>
          <a href="#" className="px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">Products</a>
          <a href="#" className="px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">Documentation</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">
            <FaBell className="w-5 h-5" />
          </button>
          <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">
            <FaUser className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}`,

  'sidebar-collapsed': `import { FaHome, FaFileLines, FaCog, FaQuestionCircle } from 'react-icons/fa6';

export function SidebarCollapsed() {
  const menuItems = [
    { icon: FaHome, label: 'Home' },
    { icon: FaFileLines, label: 'Pages' },
    { icon: FaCog, label: 'Settings' },
    { icon: FaQuestionCircle, label: 'Help' },
  ];

  return (
    <aside className="w-20 bg-background-800 border-r border-background-700 p-4">
      <div className="space-y-4">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              className="w-12 h-12 flex items-center justify-center text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded-lg transition-colors"
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </aside>
  );
}`,

  'sidebar-expanded': `import { FaHome, FaFileLines, FaCog, FaQuestionCircle, FaChevronDown } from 'react-icons/fa6';

export function SidebarExpanded() {
  const menuItems = [
    { icon: FaHome, label: 'Home', submenu: null },
    { icon: FaFileLines, label: 'Pages', submenu: ['All Pages', 'New Page'] },
    { icon: FaCog, label: 'Settings', submenu: null },
    { icon: FaQuestionCircle, label: 'Help', submenu: null },
  ];

  return (
    <aside className="w-64 bg-background-800 border-r border-background-700 p-4">
      <div className="space-y-1">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i}>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded-lg transition-colors group">
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.submenu && <FaChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </button>
              {item.submenu && (
                <div className="ml-4 space-y-1">
                  {item.submenu.map((sub, si) => (
                    <button
                      key={si}
                      className="w-full text-left px-3 py-1.5 text-xs text-foreground-500 hover:text-foreground-400 hover:bg-background-700 rounded transition-colors"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}`,

  'card-simple': `import { Card, Button } from 'ui-lab-components';

export function CardSimple() {
  return (
    <Card className="max-w-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground-50 mb-2">Simple Card</h3>
        <p className="text-sm text-foreground-400 mb-6">
          This is a simple card with a title, description, and action button.
        </p>
        <Button className="w-full">Learn More</Button>
      </div>
    </Card>
  );
}`,

  'card-with-image': `import { Card, Button } from 'ui-lab-components';

export function CardWithImage() {
  return (
    <Card className="max-w-sm overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-accent-500 to-accent-700" />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground-50 mb-2">Card with Image</h3>
        <p className="text-sm text-foreground-400 mb-6">
          This card features an image header with content and action button below.
        </p>
        <Button className="w-full">Read More</Button>
      </div>
    </Card>
  );
}`,
};

export function getElementSourceCode(demoPath: string): string | null {
  return sourceCodeMap[demoPath] || null;
}
