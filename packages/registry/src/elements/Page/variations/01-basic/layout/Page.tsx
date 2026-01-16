import React from 'react';

interface PageProps {
  children?: React.ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div className="flex flex-col w-full bg-background-950">
      <header className="bg-background-800 border-b border-background-700">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-lg font-semibold text-foreground-100">Page Title</h1>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {children}
        </div>
      </main>

      <footer className="bg-background-800 border-t border-background-700">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="text-foreground-500 text-sm">&copy; 2024</p>
        </div>
      </footer>
    </div>
  );
}
