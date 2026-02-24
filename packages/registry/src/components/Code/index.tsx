import React from 'react';
import { Code } from "ui-lab-components";
import type { ComponentDetail } from '@/types';

const basicCode = `import { Code } from 'ui-lab-components';

export function Example() {
  return (
    <Code language="tsx">
      {code}
    </Code>
  );
}`;

const withFilenameCode = `import { Code } from 'ui-lab-components';

export function Example() {
  return (
    <Code
      language="tsx"
      filename="Button.tsx"
      theme={{ light: 'github-light', dark: 'github-dark' }}
    >
      {code}
    </Code>
  );
}`;

const sampleCode = `export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded bg-blue-500 text-white"
    >
      {children}
    </button>
  );
}`;

export const codeDetail: ComponentDetail = {
  id: "code",
  name: "Code",
  description: "Syntax-highlighted code display with horizontal scroll, line expand, and copy button.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        Code renders syntax-highlighted code using Shiki. It adapts to light and dark mode automatically, supports horizontal scrolling for wide code, collapses long files with an expand toggle, and provides a one-click copy button.
      </p>
      <p>
        Pass a named Shiki theme string or a <code>{`{ light, dark }`}</code> object for automatic mode-aware theming. For SSR, pass pre-rendered HTML via <code>preHighlightedLight</code> / <code>preHighlightedDark</code> to avoid client-side flash.
      </p>
    </div>
  ),
  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Syntax-highlighted code with copy button",
      code: basicCode,
      preview: (
        <div className="w-full max-w-lg">
          <Code language="tsx">{sampleCode}</Code>
        </div>
      ),
    },
    {
      id: "with-filename",
      title: "With Filename",
      description: "Shows a header bar with the filename and language",
      code: withFilenameCode,
      preview: (
        <div className="w-full max-w-lg">
          <Code language="tsx" filename="Button.tsx">{sampleCode}</Code>
        </div>
      ),
    },
  ],
};
