/**
 * PostCSS plugin for handling @import "ui-lab" directive
 *
 * This plugin allows users to import UILab styles using:
 * @import "ui-lab";
 *
 * Instead of:
 * @import "ui-lab-components/styles.css";
 *
 * The plugin directly injects the CSS content, replacing the import rule entirely.
 * This is similar to how Tailwind's @import "tailwindcss" works.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  postcssPlugin: 'postcss-ui-lab',
  Once(root) {
    root.walkAtRules('import', (atRule) => {
      // Match @import "ui-lab" or @import 'ui-lab'
      const match = atRule.params.match(/^["']ui-lab["']$/);

      if (match) {
        try {
          // Read the compiled styles.css file
          const stylesPath = path.resolve(__dirname, 'styles.css');
          const cssContent = fs.readFileSync(stylesPath, 'utf-8');

          // Parse the CSS content into an AST
          const parsedCSS = postcss.parse(cssContent);

          // Replace the @import rule with the actual CSS content
          // This injects the CSS directly rather than leaving an import statement
          atRule.replaceWith(parsedCSS.nodes);
        } catch (err) {
          throw atRule.error(
            `Failed to load ui-lab styles: ${err.message}`,
            { word: 'ui-lab' }
          );
        }
      }
    });
  },
};

export const postcss = true;
