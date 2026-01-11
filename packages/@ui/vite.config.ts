import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { Plugin } from 'vite';

// Plugin to exclude test files from the build
const excludeTestsPlugin = (): Plugin => ({
  name: 'exclude-tests',
  resolveId(id) {
    if (id.match(/\.(test|spec)\.(ts|tsx)$/)) {
      return { id: '', external: true };
    }
  },
  transform(_code, id) {
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
      entry: {
        'ui-lab-ui': path.resolve(__dirname, 'src/index.ts'),
        'theme-script': path.resolve(__dirname, 'src/providers/themeScript.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        entryFileNames: '[name].es.js',
      },
    },
  },
});
