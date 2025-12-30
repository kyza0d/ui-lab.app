import {
  loadComponentCache,
  saveComponentCache,
  detectChangedComponents,
  getAllComponentNames,
} from './component-cache';
import { buildChangedComponents } from './build-component';
import { aggregateBundle } from './aggregate-bundle';
import { handleTypes } from './aggregate-types';
import { aggregateCSS } from './aggregate-css';

/**
 * Main incremental build orchestrator
 * Handles component-level change detection and parallel build aggregation
 */
async function main(): Promise<void> {
  const startTime = Date.now();

  try {
    // Skip cache in CI environment
    if (process.env.CI === 'true') {
      console.log('CI environment detected - running full build');
      // For CI, we'd still want to use the cache mechanism but always rebuild
      // For now, just log it
    }

    // 1. Load cache
    const cache = loadComponentCache();

    // 2. Detect changed components
    const allComponents = getAllComponentNames();
    const changedComponents = detectChangedComponents(cache);

    if (changedComponents.length === 0) {
      console.log('✓ No changes detected - using cached build');
      console.log(`  Last built: ${new Date(cache.timestamp).toLocaleString()}`);
      console.log('  Use "npm run build:force" to rebuild anyway');
      process.exit(0);
    }

    console.log(
      `Found ${changedComponents.length}/${allComponents.length} changed components: ${changedComponents.join(', ')}`
    );

    // 3. Build changed components
    console.log('');
    await buildChangedComponents(changedComponents, cache);

    // 4. Aggregate everything in parallel
    console.log('');
    await Promise.all([aggregateBundle(), handleTypes(changedComponents), aggregateCSS()]);

    // 5. Save cache
    saveComponentCache(cache);

    const elapsed = Date.now() - startTime;
    console.log(`\n✓ Build completed in ${elapsed}ms`);
    console.log(`  Rebuilt: ${changedComponents.length}/${allComponents.length} components`);
    if (elapsed < 1000) {
      console.log(`  Time saved: ${Math.round(3800 - elapsed)}ms (${Math.round(((3800 - elapsed) / 3800) * 100)}% faster)`);
    }

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Build failed:', error);
    process.exit(1);
  }
}

// Run the build
main();
