"use client";

export default function ThemingPage() {
  return (
    <div className="w-full bg-background-950 mx-auto max-w-7xl">
      <main className="w-full">
        <div className="px-8 py-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground-50 mb-2">Theming</h2>
            <p className="text-foreground-400">
              Create custom color themes to match your brand.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
