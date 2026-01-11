"use client";

export default function OverviewPage() {
  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main className="w-full mx-auto max-w-3xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-foreground-50 mb-4">Documentation</h1>
            <p className="text-lg text-foreground-300 mb-12">
              Complete guides and references for building with UI Lab.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-foreground-50 mb-4">Getting Started</h2>
                <p className="text-foreground-200 mb-4">
                  Learn how to install and use UI Lab components in your project. Find setup instructions for different frameworks and platforms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground-50 mb-4">Components</h2>
                <p className="text-foreground-200 mb-4">
                  Explore our library of reusable components. Each component includes usage examples, props documentation, and accessibility guidelines.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground-50 mb-4">Design System</h2>
                <p className="text-foreground-200 mb-4">
                  Understand the design system foundations: colors, typography, spacing, tokens, and component guidelines that ensure consistency across your interfaces.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground-50 mb-4">Best Practices</h2>
                <p className="text-foreground-200 mb-4">
                  Discover recommended patterns and practices for using components effectively, maintaining accessibility, and following design principles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground-50 mb-4">Customization</h2>
                <p className="text-foreground-200 mb-4">
                  Customize components to match your brand. Learn how to extend components, create themes, and adapt styles to your needs.
                </p>
              </section>
            </div>
          </div>
        </main>
        <div className="w-full lg:w-auto">
        </div>
      </div>
    </div>
  );
}
