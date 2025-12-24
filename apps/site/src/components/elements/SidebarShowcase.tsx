"use client";

import { useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import { usePreviewContext } from "@/components/preview/PreviewContext";
import { generateThemePalettes } from "@/lib/color-utils";
import { generateShikiTheme } from "@/lib/themes/shiki/generator";
import { generateSyntaxPalettes } from "@/lib/themes/syntax-colors";
import { useApp } from "@/lib/app-context";
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from "ui-lab-components";
import { FaCheck, FaCopy } from "react-icons/fa6";

const sidebarExamples = [
  {
    id: "basic",
    title: "Basic Sidebar",
    description: "A simple sidebar with navigation items",
    code: `import { Sidebar } from "@/elements/sidebar";

export function Example() {
  const sidebarItems = [
    { id: "1", label: "Dashboard", href: "/", icon: "📊" },
    { id: "2", label: "Projects", href: "/projects", icon: "📁" },
    { id: "3", label: "Settings", href: "/settings", icon: "⚙️" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} />
      <main className="flex-1">
        {/* Page content */}
      </main>
    </div>
  );
}`,
    render: (
      <div className="flex h-64 border border-background-700 rounded">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            <a href="/" className="flex items-center gap-3 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <span>📊</span> Dashboard
            </a>
            <a href="/projects" className="flex items-center gap-3 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <span>📁</span> Projects
            </a>
            <a href="/settings" className="flex items-center gap-3 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <span>⚙️</span> Settings
            </a>
          </nav>
          <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-500">
            © 2024 App
          </div>
        </div>
        <div className="flex-1 bg-gray-50" />
      </div>
    )
  },
  {
    id: "submenu",
    title: "Sidebar with Submenu",
    description: "A sidebar with expandable submenu items",
    code: `import { Sidebar } from "@/elements/sidebar";

export function Example() {
  const sidebarItems = [
    {
      id: "1",
      label: "Dashboard",
      href: "/",
      icon: "📊"
    },
    {
      id: "2",
      label: "Products",
      icon: "📦",
      submenu: [
        { id: "2-1", label: "All Products", href: "/products" },
        { id: "2-2", label: "Categories", href: "/categories" }
      ]
    },
    {
      id: "3",
      label: "Analytics",
      icon: "📈",
      submenu: [
        { id: "3-1", label: "Reports", href: "/reports" },
        { id: "3-2", label: "Metrics", href: "/metrics" }
      ]
    },
    { id: "4", label: "Settings", href: "/settings", icon: "⚙️" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} />
      <main className="flex-1">
        {/* Page content */}
      </main>
    </div>
  );
}`,
    render: (
      <div className="flex h-64 border border-background-700 rounded">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 text-sm">
            <a href="/" className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <span>📊</span> Dashboard
            </a>
            <div>
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 text-left">
                <span>📦</span> Products <span className="ml-auto">→</span>
              </button>
              <div className="space-y-1 ml-6">
                <a href="/products" className="block px-3 py-1 rounded text-gray-600 hover:bg-gray-100">All Products</a>
                <a href="/categories" className="block px-3 py-1 rounded text-gray-600 hover:bg-gray-100">Categories</a>
              </div>
            </div>
            <div>
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 text-left">
                <span>📈</span> Analytics <span className="ml-auto">→</span>
              </button>
            </div>
            <a href="/settings" className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <span>⚙️</span> Settings
            </a>
          </nav>
          <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-500">
            © 2024 App
          </div>
        </div>
        <div className="flex-1 bg-gray-50" />
      </div>
    )
  },
  {
    id: "collapsible",
    title: "Collapsible Sidebar",
    description: "A sidebar with toggle functionality for collapse/expand",
    code: `import { Sidebar } from "@/elements/sidebar";
import { useState } from "react";

export function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { id: "1", label: "Home", href: "/", icon: "🏠", active: true },
    { id: "2", label: "Search", href: "/search", icon: "🔍" },
    { id: "3", label: "Notifications", href: "/notifications", icon: "🔔" },
    { id: "4", label: "Messages", href: "/messages", icon: "💬" },
    { id: "5", label: "Profile", href: "/profile", icon: "👤" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar
        items={sidebarItems}
        isOpen={sidebarOpen}
        onOpenChange={setSidebarOpen}
        collapsible={true}
        width="md"
      />
      <main className="flex-1 bg-gray-50">
        {/* Page content */}
      </main>
    </div>
  );
}`,
    render: (
      <div className="flex h-64 border border-background-700 rounded">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col transition-all">
          <div className="flex items-center justify-end px-4 py-3 border-b border-gray-200">
            <button className="p-2 hover:bg-gray-100 rounded-md">←</button>
          </div>
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            <a href="/" className="flex items-center gap-3 px-4 py-2 rounded-md text-sm bg-blue-100 text-blue-900 font-medium">
              <span>🏠</span> Home
            </a>
            <a href="/search" className="flex items-center gap-3 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <span>🔍</span> Search
            </a>
            <a href="/notifications" className="flex items-center gap-3 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <span>🔔</span> Notifications
            </a>
            <a href="/messages" className="flex items-center gap-3 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <span>💬</span> Messages
            </a>
            <a href="/profile" className="flex items-center gap-3 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <span>👤</span> Profile
            </a>
          </nav>
          <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-500">
            © 2024 App
          </div>
        </div>
        <div className="flex-1 bg-gray-50" />
      </div>
    )
  }
];

export function SidebarShowcase() {
  const { currentThemeMode, currentThemeColors } = useApp();
  const { activeTab, setActiveTab, copied, setCopied } = usePreviewContext();
  const [highlightedCode, setHighlightedCode] = useState<Record<string, string>>({});
  const [activeExample, setActiveExample] = useState("basic");
  const [shikiTheme, setShikiTheme] = useState<any>(null);

  useEffect(() => {
    const initShiki = async () => {
      const themePalettes = generateThemePalettes(currentThemeColors);
      const syntaxPalettes = generateSyntaxPalettes(themePalettes);
      const theme = generateShikiTheme(syntaxPalettes, currentThemeMode);
      setShikiTheme(theme);
    };

    initShiki();
  }, [currentThemeMode, currentThemeColors]);

  useEffect(() => {
    const highlightCode = async () => {
      if (!shikiTheme) return;

      const highlighted: Record<string, string> = {};
      for (const example of sidebarExamples) {
        try {
          const html = await codeToHtml(example.code, {
            lang: "typescript",
            theme: shikiTheme
          });
          highlighted[example.id] = html;
        } catch (e) {
          highlighted[example.id] = example.code;
        }
      }
      setHighlightedCode(highlighted);
    };

    highlightCode();
  }, [shikiTheme]);

  const currentExample = sidebarExamples.find(ex => ex.id === activeExample) || sidebarExamples[0];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeExample} onValueChange={setActiveExample} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {sidebarExamples.map(example => (
            <TabsTrigger key={example.id} value={example.id} className="text-sm">
              {example.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {sidebarExamples.map(example => (
          <TabsContent key={example.id} value={example.id} className="space-y-4">
            <div>
              <p className="text-sm text-foreground-400 mb-4">{example.description}</p>

              <div className="border border-background-700 rounded-lg overflow-hidden">
                {example.render}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground-50">Code</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <FaCheck className="w-3 h-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <FaCopy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                {highlightedCode[example.id] ? (
                  <div
                    className="bg-background-800 rounded-lg p-4 overflow-auto text-sm"
                    dangerouslySetInnerHTML={{ __html: highlightedCode[example.id] }}
                  />
                ) : (
                  <pre className="bg-background-800 rounded-lg p-4 overflow-auto text-sm text-foreground-300">
                    {example.code}
                  </pre>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
