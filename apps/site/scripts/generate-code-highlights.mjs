import { codeToHtml } from 'shiki';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const themes = {
  light: 'vitesse-light',
  dark: 'vitesse-dark',
};

export async function generateCodeHighlight(code, language = 'ts', themeMode = 'dark') {
  try {
    const theme = themes[themeMode] || themes.dark;
    const html = await codeToHtml(code, {
      lang: language,
      theme,
    });
    return html.replace(
      /<code>/,
      '<code style="display: block; padding: 1rem;">'
    );
  } catch (error) {
    console.error(`Failed to highlight code: ${error.message}`);
    return `<pre><code style="display: block; padding: 1rem;">${code}</code></pre>`;
  }
}

export async function generateHighlightsMap() {
  const highlightsMap = {};

  const codeSnippets = [
    {
      id: 'install-npm',
      code: 'npm install ui-lab-components',
      language: 'bash',
    },
    {
      id: 'install-pnpm',
      code: 'pnpm add ui-lab-components',
      language: 'bash',
    },
    {
      id: 'install-yarn',
      code: 'yarn add ui-lab-components',
      language: 'bash',
    },
    {
      id: 'install-bun',
      code: 'bun add ui-lab-components',
      language: 'bash',
    },
    {
      id: 'docs-theme-css',
      code: `@theme {
  --background-50:   oklch(99.2% 0.001 240);
  --background-100:  oklch(97.5% 0.002 240);
  --background-200:  oklch(95.0% 0.004 240);
  /* ... up to 950 */
  --background-950:  oklch(11.8% 0.018 240);

  /* Semantic aliases */
  --background-surface:   var(--background-100);
  --background-elevated:  var(--background-50);
  --background-contrast:  var(--background-950);
  --background-border:    var(--background-200 / 0.12);
}`,
      language: 'css',
    },
    {
      id: 'docs-globals-css',
      code: `@theme {
  /* Brand */
  --color-primary: oklch(68% 0.22 245);
  --color-danger:  oklch(65% 0.28 25);

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  /* Shadows */
  --shadow-card: 0 4px 16px rgb(0 0 0 / 0.10);
  --shadow-modal: 0 12px 48px rgb(0 0 0 / 0.24);

  /* Transitions */
  --transition-fast: 120ms cubic-bezier(0.2, 0, 0.4, 1);
}`,
      language: 'css',
    },
  ];

  for (const snippet of codeSnippets) {
    const light = await generateCodeHighlight(snippet.code, snippet.language, 'light');
    const dark = await generateCodeHighlight(snippet.code, snippet.language, 'dark');
    highlightsMap[snippet.id] = { light, dark, language: snippet.language };
  }

  return highlightsMap;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const highlightsMap = await generateHighlightsMap();
  const outputPath = path.join(__dirname, '../src/lib/code-highlights.json');
  fs.writeFileSync(outputPath, JSON.stringify(highlightsMap, null, 2));
  console.log('Generated code highlights:', outputPath);
}
