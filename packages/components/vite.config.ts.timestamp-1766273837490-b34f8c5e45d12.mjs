// vite.config.ts
import { defineConfig } from "file:///home/kyza/Projects/ui-lab/app/node_modules/.pnpm/vite@5.4.21_@types+node@20.19.26_lightningcss@1.30.2/node_modules/vite/dist/node/index.js";
import react from "file:///home/kyza/Projects/ui-lab/app/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.21_@types+node@20.19.26_lightningcss@1.30.2_/node_modules/@vitejs/plugin-react/dist/index.js";
import dts from "file:///home/kyza/Projects/ui-lab/app/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.19.26_rollup@4.53.3_typescript@5.9.3_vite@5.4.21_@_de1a7785c34d52ad6eb079ca47c91baf/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/home/kyza/Projects/ui-lab/app/packages/components";
var excludeTestsPlugin = () => ({
  name: "exclude-tests",
  resolveId(id) {
    if (id.match(/\.(test|spec)\.(ts|tsx)$/)) {
      return { id: "", external: true };
    }
  },
  transform(code, id) {
    if (id.includes("tests/") || id.match(/\.(test|spec)\.(ts|tsx)$/)) {
      return { code: "export {};" };
    }
  }
});
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  plugins: [
    excludeTestsPlugin(),
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ["**/*.test.ts", "**/*.test.tsx", "src/tests/**", "**/tests/**"]
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "UILabUI",
      formats: ["es", "umd"],
      fileName: (format) => `ui-lab-ui.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9reXphL1Byb2plY3RzL3VpLWxhYi9hcHAvcGFja2FnZXMvY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUva3l6YS9Qcm9qZWN0cy91aS1sYWIvYXBwL3BhY2thZ2VzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUva3l6YS9Qcm9qZWN0cy91aS1sYWIvYXBwL3BhY2thZ2VzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuXG4vLyBQbHVnaW4gdG8gZXhjbHVkZSB0ZXN0IGZpbGVzIGZyb20gdGhlIGJ1aWxkXG5jb25zdCBleGNsdWRlVGVzdHNQbHVnaW4gPSAoKTogUGx1Z2luID0+ICh7XG4gIG5hbWU6ICdleGNsdWRlLXRlc3RzJyxcbiAgcmVzb2x2ZUlkKGlkKSB7XG4gICAgLy8gUHJldmVudCByZXNvbHV0aW9uIG9mIHRlc3QgZmlsZXNcbiAgICBpZiAoaWQubWF0Y2goL1xcLih0ZXN0fHNwZWMpXFwuKHRzfHRzeCkkLykpIHtcbiAgICAgIHJldHVybiB7IGlkOiAnJywgZXh0ZXJuYWw6IHRydWUgfTtcbiAgICB9XG4gIH0sXG4gIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgIC8vIFJlbW92ZSB0ZXN0IGZpbGUgaW1wb3J0c1xuICAgIGlmIChpZC5pbmNsdWRlcygndGVzdHMvJykgfHwgaWQubWF0Y2goL1xcLih0ZXN0fHNwZWMpXFwuKHRzfHRzeCkkLykpIHtcbiAgICAgIHJldHVybiB7IGNvZGU6ICdleHBvcnQge307JyB9O1xuICAgIH1cbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIGV4Y2x1ZGVUZXN0c1BsdWdpbigpLFxuICAgIHJlYWN0KCksXG4gICAgZHRzKHtcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgICBleGNsdWRlOiBbJyoqLyoudGVzdC50cycsICcqKi8qLnRlc3QudHN4JywgJ3NyYy90ZXN0cy8qKicsICcqKi90ZXN0cy8qKiddLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdVSUxhYlVJJyxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAndW1kJ10sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHVpLWxhYi11aS4ke2Zvcm1hdH0uanNgLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdVLFNBQVMsb0JBQW9CO0FBQ3JXLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU0scUJBQXFCLE9BQWU7QUFBQSxFQUN4QyxNQUFNO0FBQUEsRUFDTixVQUFVLElBQUk7QUFFWixRQUFJLEdBQUcsTUFBTSwwQkFBMEIsR0FBRztBQUN4QyxhQUFPLEVBQUUsSUFBSSxJQUFJLFVBQVUsS0FBSztBQUFBLElBQ2xDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsVUFBVSxNQUFNLElBQUk7QUFFbEIsUUFBSSxHQUFHLFNBQVMsUUFBUSxLQUFLLEdBQUcsTUFBTSwwQkFBMEIsR0FBRztBQUNqRSxhQUFPLEVBQUUsTUFBTSxhQUFhO0FBQUEsSUFDOUI7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxtQkFBbUI7QUFBQSxJQUNuQixNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxNQUNsQixTQUFTLENBQUMsZ0JBQWdCLGlCQUFpQixnQkFBZ0IsYUFBYTtBQUFBLElBQzFFLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLGFBQWEsTUFBTTtBQUFBLElBQzNDO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxXQUFXO0FBQUEsTUFDL0IsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsYUFBYTtBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
