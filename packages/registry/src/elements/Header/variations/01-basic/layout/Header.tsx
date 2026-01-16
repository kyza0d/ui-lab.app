interface HeaderProps {
  logoText?: string;
}

export function Header({ logoText = 'Logo' }: HeaderProps) {
  return (
    <header className="bg-background-800 border-b border-background-700">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-500 rounded-lg" />
          <span className="text-lg font-semibold text-foreground-50">{logoText}</span>
        </div>
        <nav className="flex gap-1">
          <a href="#" className="px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">Home</a>
          <a href="#" className="px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">About</a>
          <a href="#" className="px-3 py-2 text-sm text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
}
