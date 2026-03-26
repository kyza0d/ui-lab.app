import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { createPostcssPlugins } from './postcss.config.mts';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: createPostcssPlugins(),
    },
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.ts', '**/*.test.tsx', 'src/tests/**', '**/tests/**'],
    }),
  ],
  build: {
    sourcemap: false,
    emptyOutDir: false,
    lib: {
      entry: {
        'ui-lab-ui': path.resolve(__dirname, 'src/index.ts'),
        'theme-script': path.resolve(__dirname, 'src/providers/themeScript.ts'),
        'theme-server': path.resolve(__dirname, 'src/theme-server.ts'),
        'scroll-script': path.resolve(__dirname, 'src/scroll-script.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom', 'react-dom/client', 'shiki', /^shiki\/.*/],
      output: {
        entryFileNames: '[name].es.js',
        banner: (chunk) => chunk.name === 'ui-lab-ui' ? '"use client";' : '',
      },
    },
  },
});
