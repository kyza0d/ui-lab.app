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

const headerExamples = [
  {
    id: "basic",
    title: "Basic Header",
    description: "A simple header with logo and navigation items",
    code: `import { Header } from "@/elements/header";

export function Example() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" }
  ];

  return (
    <Header
      logoText="MyApp"
      navItems={navItems}
    />
  );
}`,
    render: (
      <header className="w-full bg-white">
        <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-6 md:py-4">
          <div className="text-lg font-bold">MyApp</div>
          <nav className="hidden md:flex gap-6 flex-1">
            <a href="/" className="text-sm text-gray-700 hover:text-gray-900">Home</a>
            <a href="/features" className="text-sm text-gray-700 hover:text-gray-900">Features</a>
            <a href="/pricing" className="text-sm text-gray-700 hover:text-gray-900">Pricing</a>
            <a href="/docs" className="text-sm text-gray-700 hover:text-gray-900">Docs</a>
          </nav>
        </div>
        <div className="border-b border-gray-200"></div>
      </header>
    )
  },
  {
    id: "with-actions",
    title: "Header with Actions",
    description: "A header with navigation and action buttons",
    code: `import { Header } from "@/elements/header";

export function Example() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" }
  ];

  const actions = [
    {
      label: "Search",
      icon: "🔍",
      onClick: () => console.log("Search clicked")
    },
    {
      label: "Profile",
      icon: "👤",
      onClick: () => console.log("Profile clicked")
    }
  ];

  return (
    <Header
      logoText="MyApp"
      navItems={navItems}
      actions={actions}
    />
  );
}`,
    render: (
      <header className="w-full bg-white">
        <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-6 md:py-4">
          <div className="text-lg font-bold">MyApp</div>
          <nav className="hidden md:flex gap-6 flex-1">
            <a href="/" className="text-sm text-gray-700 hover:text-gray-900">Home</a>
            <a href="/products" className="text-sm text-gray-700 hover:text-gray-900">Products</a>
            <a href="/about" className="text-sm text-gray-700 hover:text-gray-900">About</a>
          </nav>
          <div className="flex gap-2">
            <button className="px-3 py-2 text-sm rounded-md hover:bg-gray-100">🔍</button>
            <button className="px-3 py-2 text-sm rounded-md hover:bg-gray-100">👤</button>
          </div>
        </div>
        <div className="border-b border-gray-200"></div>
      </header>
    )
  },
  {
    id: "sticky",
    title: "Sticky Header",
    description: "A header that remains fixed at the top when scrolling",
    code: `import { Header } from "@/elements/header";

export function Example() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <div>
      <Header
        logoText="Brand"
        navItems={navItems}
        sticky={true}
      />
      <main className="pt-16">
        {/* Page content goes here */}
      </main>
    </div>
  );
}`,
    render: (
      <header className="w-full bg-white sticky top-0">
        <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-6 md:py-4">
          <div className="text-lg font-bold">Brand</div>
          <nav className="hidden md:flex gap-6 flex-1">
            <a href="/" className="text-sm text-gray-700 hover:text-gray-900">Home</a>
            <a href="/services" className="text-sm text-gray-700 hover:text-gray-900">Services</a>
            <a href="/contact" className="text-sm text-gray-700 hover:text-gray-900">Contact</a>
          </nav>
        </div>
        <div className="border-b border-gray-200"></div>
      </header>
    )
  }
];

export function HeaderShowcase() {
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
      for (const example of headerExamples) {
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

  const currentExample = headerExamples.find(ex => ex.id === activeExample) || headerExamples[0];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeExample} onValueChange={setActiveExample} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {headerExamples.map(example => (
            <TabsTrigger key={example.id} value={example.id} className="text-sm">
              {example.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {headerExamples.map(example => (
          <TabsContent key={example.id} value={example.id} className="space-y-4">
            <div>
              <p className="text-sm text-foreground-400 mb-4">{example.description}</p>

              <div className="border border-background-700 rounded-lg overflow-hidden bg-white">
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
