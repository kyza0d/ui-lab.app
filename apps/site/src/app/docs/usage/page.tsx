"use client";

export default function UsagePage() {
  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main className="w-full mx-auto max-w-3xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-foreground-50 mb-4">Usage</h1>
            <p className="text-lg text-foreground-300">
              Learn how to use UI Lab components in your applications.
            </p>
          </div>
        </main>
        <div className="w-full lg:w-auto">
        </div>
      </div>
    </div>
  );
}
