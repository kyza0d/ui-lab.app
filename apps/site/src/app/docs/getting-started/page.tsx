"use client";
import React from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { TableOfContents } from "@/components/TableOfContents";

const tocItems = [
  { id: "quick-start", title: "Quick start" },
  { id: "first-component", title: "Your first component" },
  { id: "common-components", title: "Common components" },
  { id: "props-patterns", title: "Props & patterns" },
  { id: "next-steps", title: "Next steps" },
];

export default function GettingStartedPage() {
  return (
    <div className="w-full text-foreground-100">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16%] gap-8">
        <main className="max-w-2xl mx-auto w-full px-6 py-16 font-sans text-sm leading-relaxed antialiased">
          {/* Version badge */}
          <div className="mb-8 flex items-center gap-4 text-foreground-400">
            <span className="inline-flex items-center gap-2 rounded border border-foreground-800 px-2 py-0.5 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              v0.1.1
            </span>
            <span>·</span>
            <span>Getting started</span>
          </div>

          {/* Title */}
          <div className="mb-10">
            <div className="text-base font-medium text-foreground-50">Getting started</div>
            <div className="mt-1 text-foreground-300">
              Build your first UI in seconds with UI Lab components.
            </div>
          </div>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Quick start */}
          <section id="quick-start" className="mb-12">
            <span className="text-sm font-medium">Import what you need</span>
            <p className="text-foreground-300 mb-6">
              All components are tree-shakeable and fully typed.
            </p>
            <CodeBlock language="tsx">
              {`import { Button, Card, Input, Label } from "ui-lab-components";`}
            </CodeBlock>
          </section>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* First component */}
          <section id="first-component" className="space-y-8">
            <div>
              <span className="text-sm font-medium">Your first component</span>
              <p className="text-foreground-300 mb-6">
                Drop a button anywhere — it just works.
              </p>
              <CodeBlock language="tsx">
                {`export default function Home() {
  return (
    <div className="flex items-center gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button size="lg">Large</Button>
      <Button loading>Loading...</Button>
    </div>
  );
}`}
              </CodeBlock>
            </div>
          </section>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Common components */}
          <section id="common-components" className="space-y-10">
            <span className="text-sm font-medium">Common components in action</span>

            <div className="space-y-8">
              {/* Card + Form */}
              <div>
                <div className="text-foreground-400 mb-3">Login form</div>
                <CodeBlock language="tsx">
                  {`import { Button, Card, Input, Label } from "ui-lab-components";

export function LoginCard() {
  return (
    <Card className="w-full max-w-sm">
      <Card.Header>
        <Card.Title>Welcome back</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="pass">Password</Label>
          <Input id="pass" type="password" />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">Sign in</Button>
      </Card.Footer>
    </Card>
  );
}`}
                </CodeBlock>
              </div>

              {/* Dashboard card */}
              <div>
                <div className="text-foreground-400 mb-3">Dashboard widget</div>
                <CodeBlock language="tsx">
                  {`<Card className="p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-foreground-400 text-sm">Revenue</p>
      <p className="text-2xl font-semibold">$45,231</p>
    </div>
    <Badge>+12.5%</Badge>
  </div>
</Card>`}
                </CodeBlock>
              </div>
            </div>
          </section>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Props & patterns */}
          <section id="props-patterns" className="space-y-6 text-foreground-300">
            <span className="text-sm font-medium">Props & patterns</span>
            <ul className="space-y-2 text-sm">
              <li>• <code className="text-foreground-200">variant</code> – primary · secondary · tertiary · destructive</li>
              <li>• <code className="text-foreground-200">size</code> – sm · md · lg</li>
              <li>• <code className="text-foreground-200">className</code> – Tailwind classes merged intelligently</li>
              <li>• <code className="text-foreground-200">loading</code> / <code className="text-foreground-200">disabled</code> built-in</li>
              <li>• Full ARIA support out of the box</li>
            </ul>
          </section>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Next steps */}
          <section id="next-steps" className="space-y-6">
            <span className="text-sm font-medium">Next steps</span>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <a href="/docs/theming" className="block underline underline-offset-4 hover:text-foreground-100">
                Theming → Customize colors, radius, and tokens
              </a>
              <a href="/docs/components" className="block underline underline-offset-4 hover:text-foreground-100">
                Components → Full catalogue with props & examples
              </a>
              <a href="/docs/ai-integration" className="block underline underline-offset-4 hover:text-foreground-100">
                AI workflow → Generate code with Cursor, Claude, Copilot
              </a>
            </div>
          </section>

          <div className="mt-20 text-sm text-foreground-500">
            © 2025 UI Lab • Built for humans and machines
          </div>
        </main>

        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
