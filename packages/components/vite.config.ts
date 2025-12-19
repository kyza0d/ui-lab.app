import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { Plugin } from 'vite';

// Plugin to exclude test files from the build
const excludeTestsPlugin = (): Plugin => ({
  name: 'exclude-tests',
  resolveId(id) {
    // Prevent resolution of test files
    if (id.match(/\.(test|spec)\.(ts|tsx)$/)) {
      return { id: '', external: true };
    }
  },
  transform(code, id) {
    // Remove test file imports
    if (id.includes('tests/') || id.match(/\.(test|spec)\.(ts|tsx)$/)) {
      return { code: 'export {};' };
    }
  },
});

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    excludeTestsPlugin(),
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.ts', '**/*.test.tsx', 'src/tests/**', '**/tests/**'],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UILabUI',
      formats: ['es', 'umd'],
      fileName: (format) => `ui-lab-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
