// vite.config.ts
import { defineConfig } from "file:///home/kyza/Projects/ui-lab/app/node_modules/.pnpm/vite@5.4.21_@types+node@20.19.27_lightningcss@1.30.2/node_modules/vite/dist/node/index.js";
import react from "file:///home/kyza/Projects/ui-lab/app/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.21_@types+node@20.19.27_lightningcss@1.30.2_/node_modules/@vitejs/plugin-react/dist/index.js";
import dts from "file:///home/kyza/Projects/ui-lab/app/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.19.27_rollup@4.54.0_typescript@5.9.3_vite@5.4.21_@_cd114b7b027dd3b1e087cd4a5bda2810/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/home/kyza/Projects/ui-lab/app/packages/@ui";
var excludeTestsPlugin = () => ({
  name: "exclude-tests",
  resolveId(id) {
    if (id.match(/\.(test|spec)\.(ts|tsx)$/)) {
      return { id: "", external: true };
    }
  },
  transform(_code, id) {
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
      entry: {
        "ui-lab-ui": path.resolve(__vite_injected_original_dirname, "src/index.ts"),
        "theme-script": path.resolve(__vite_injected_original_dirname, "src/providers/themeScript.ts")
      },
      formats: ["es"]
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        entryFileNames: "[name].es.js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9reXphL1Byb2plY3RzL3VpLWxhYi9hcHAvcGFja2FnZXMvQHVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9reXphL1Byb2plY3RzL3VpLWxhYi9hcHAvcGFja2FnZXMvQHVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2t5emEvUHJvamVjdHMvdWktbGFiL2FwcC9wYWNrYWdlcy9AdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuXG4vLyBQbHVnaW4gdG8gZXhjbHVkZSB0ZXN0IGZpbGVzIGZyb20gdGhlIGJ1aWxkXG5jb25zdCBleGNsdWRlVGVzdHNQbHVnaW4gPSAoKTogUGx1Z2luID0+ICh7XG4gIG5hbWU6ICdleGNsdWRlLXRlc3RzJyxcbiAgcmVzb2x2ZUlkKGlkKSB7XG4gICAgaWYgKGlkLm1hdGNoKC9cXC4odGVzdHxzcGVjKVxcLih0c3x0c3gpJC8pKSB7XG4gICAgICByZXR1cm4geyBpZDogJycsIGV4dGVybmFsOiB0cnVlIH07XG4gICAgfVxuICB9LFxuICB0cmFuc2Zvcm0oX2NvZGUsIGlkKSB7XG4gICAgaWYgKGlkLmluY2x1ZGVzKCd0ZXN0cy8nKSB8fCBpZC5tYXRjaCgvXFwuKHRlc3R8c3BlYylcXC4odHN8dHN4KSQvKSkge1xuICAgICAgcmV0dXJuIHsgY29kZTogJ2V4cG9ydCB7fTsnIH07XG4gICAgfVxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgZXhjbHVkZVRlc3RzUGx1Z2luKCksXG4gICAgcmVhY3QoKSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgIGV4Y2x1ZGU6IFsnKiovKi50ZXN0LnRzJywgJyoqLyoudGVzdC50c3gnLCAnc3JjL3Rlc3RzLyoqJywgJyoqL3Rlc3RzLyoqJ10sXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICAndWktbGFiLXVpJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgICAndGhlbWUtc2NyaXB0JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9wcm92aWRlcnMvdGhlbWVTY3JpcHQudHMnKSxcbiAgICAgIH0sXG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5lcy5qcycsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsU0FBUyxvQkFBb0I7QUFDaFYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTSxxQkFBcUIsT0FBZTtBQUFBLEVBQ3hDLE1BQU07QUFBQSxFQUNOLFVBQVUsSUFBSTtBQUNaLFFBQUksR0FBRyxNQUFNLDBCQUEwQixHQUFHO0FBQ3hDLGFBQU8sRUFBRSxJQUFJLElBQUksVUFBVSxLQUFLO0FBQUEsSUFDbEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxVQUFVLE9BQU8sSUFBSTtBQUNuQixRQUFJLEdBQUcsU0FBUyxRQUFRLEtBQUssR0FBRyxNQUFNLDBCQUEwQixHQUFHO0FBQ2pFLGFBQU8sRUFBRSxNQUFNLGFBQWE7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLG1CQUFtQjtBQUFBLElBQ25CLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLGtCQUFrQjtBQUFBLE1BQ2xCLFNBQVMsQ0FBQyxnQkFBZ0IsaUJBQWlCLGdCQUFnQixhQUFhO0FBQUEsSUFDMUUsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxRQUNMLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxRQUNuRCxnQkFBZ0IsS0FBSyxRQUFRLGtDQUFXLDhCQUE4QjtBQUFBLE1BQ3hFO0FBQUEsTUFDQSxTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxXQUFXO0FBQUEsTUFDL0IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
