import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getAllComponentNames, getArtifactDir } from './component-cache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(PACKAGE_DIR, 'dist');
const COMPONENTS_DIR = path.resolve(PACKAGE_DIR, 'src/components');

/**
 * Aggregates CSS from all component artifacts and processes with PostCSS
 */
export async function aggregateCSS(): Promise<void> {
  console.log('Aggregating CSS...');

  const componentNames = getAllComponentNames();
  const cssFiles: string[] = [];

  // Collect CSS from each component artifact
  for (const componentName of componentNames) {
    const artifactDir = getArtifactDir(componentName);
    const cssPath = path.resolve(artifactDir, `${componentName}.css`);

    if (fs.existsSync(cssPath)) {
      try {
        const css = fs.readFileSync(cssPath, 'utf-8');
        cssFiles.push(css);
      } catch (error) {
        console.warn(`Failed to read CSS from ${componentName}:`, error);
      }
    }
  }

  // Combine all CSS
  const combinedCSS = cssFiles.join('\n');

  // Write to temporary file for PostCSS processing
  const tempCSSPath = path.resolve(DIST_DIR, 'combined.css');

  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  fs.writeFileSync(tempCSSPath, combinedCSS, 'utf-8');

  try {
    // Process combined CSS with PostCSS (Tailwind)
    execSync(`npx postcss "${tempCSSPath}" -o "${path.resolve(DIST_DIR, 'styles.css')}"`, {
      cwd: PACKAGE_DIR,
      stdio: 'pipe',
    });

    // Also copy processed CSS to style.css for backup
    const processedCSS = fs.readFileSync(path.resolve(DIST_DIR, 'styles.css'), 'utf-8');
    fs.writeFileSync(path.resolve(DIST_DIR, 'style.css'), processedCSS, 'utf-8');

    // Process global styles.css through PostCSS as well
    const globalStylesPath = path.resolve(PACKAGE_DIR, 'src/styles.css');
    if (fs.existsSync(globalStylesPath)) {
      execSync(
        `npx postcss "${globalStylesPath}" >> "${path.resolve(DIST_DIR, 'styles.css')}"`,
        {
          cwd: PACKAGE_DIR,
          stdio: 'pipe',
        }
      );
    }

    // Clean up temporary file
    fs.unlinkSync(tempCSSPath);

    console.log('✓ CSS aggregated and processed');
  } catch (error) {
    console.error('Failed to aggregate CSS:', error);
    // Don't throw - CSS is less critical than JS
  }
}
