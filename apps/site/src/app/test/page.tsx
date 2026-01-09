'use client';

import { ThemeProvider, useThemeMode } from 'ui-lab-components';

function ThemeModeToggle() {
  const { themeMode, toggleThemeMode, setThemeMode } = useThemeMode();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-foreground-100">Current Mode:</span>
        <span className="px-3 py-1 rounded bg-accent-600 text-accent-50 font-mono text-sm uppercase">
          {themeMode}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleThemeMode}
          className="px-4 py-2 rounded border border-accent-700 bg-accent-950 text-accent-100 hover:bg-accent-900 transition-colors"
        >
          Toggle Theme
        </button>
        <button
          onClick={() => setThemeMode('light')}
          className={`px-4 py-2 rounded border transition-colors ${
            themeMode === 'light'
              ? 'border-accent-500 bg-accent-600 text-accent-50'
              : 'border-background-700 bg-background-800 text-foreground-300 hover:bg-background-700'
          }`}
        >
          Light
        </button>
        <button
          onClick={() => setThemeMode('dark')}
          className={`px-4 py-2 rounded border transition-colors ${
            themeMode === 'dark'
              ? 'border-accent-500 bg-accent-600 text-accent-50'
              : 'border-background-700 bg-background-800 text-foreground-300 hover:bg-background-700'
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
}

function ColorGrid() {
  const colorRoles = ['background', 'foreground', 'accent', 'success', 'danger', 'warning', 'info'];
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  return (
    <div className="space-y-8">
      {colorRoles.map(role => (
        <div key={role} className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground-100 uppercase tracking-widest">{role}</h3>
          <div className="grid grid-cols-11 gap-1">
            {shades.map(shade => {
              const varName = `--${role}-${shade}`;
              const style = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
              return (
                <div
                  key={shade}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="w-full h-8 rounded border border-background-700"
                    style={{ backgroundColor: style || 'transparent' }}
                    title={style}
                  />
                  <span className="text-xs text-foreground-500">{shade}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TestPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-950 p-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h1 className="text-3xl font-bold text-foreground-50 mb-2">Light/Dark Mode Theme Switching</h1>
            <p className="text-foreground-400">
              Switch between light and dark modes to see OKLCH color inversion in action
            </p>
          </div>

          <div className="p-6 bg-background-900 rounded border border-background-700">
            <ThemeModeToggle />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground-50">Color Palette</h2>
            <p className="text-foreground-400 text-sm">
              Colors are automatically inverted using OKLCH color space when switching modes
            </p>
            <div className="mt-4 p-6 bg-background-900 rounded border border-background-700">
              <ColorGrid />
            </div>
          </div>

          <div className="p-4 bg-success-950 rounded border border-success-700 text-sm text-success-100">
            <p className="font-semibold mb-2">How it works:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Click Toggle Theme or select Light/Dark mode directly</li>
              <li>Colors instantly invert using OKLCH lightness scales</li>
              <li>Your preference is saved to localStorage</li>
              <li>Refreshing the page remembers your choice</li>
            </ul>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
