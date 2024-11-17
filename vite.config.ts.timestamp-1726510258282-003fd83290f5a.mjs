// vite.config.ts
import { defineConfig } from "file:///Users/nikitabiichuk/Desktop/Nikita's%20Biichuk%20Personal/Cyber%20Cloud/FE/cyber-cloud-web-demo/node_modules/vite/dist/node/index.js";
import react from "file:///Users/nikitabiichuk/Desktop/Nikita's%20Biichuk%20Personal/Cyber%20Cloud/FE/cyber-cloud-web-demo/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { nodePolyfills } from "file:///Users/nikitabiichuk/Desktop/Nikita's%20Biichuk%20Personal/Cyber%20Cloud/FE/cyber-cloud-web-demo/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
      include: ["path"],
      // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
      exclude: [
        "http"
        // Excludes the polyfill for `http` and `node:http`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true,
        // can also be 'build', 'dev', or false
        global: true,
        process: true
      },
      // Override the default polyfills for specific modules.
      overrides: {
        // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
        fs: "memfs"
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true
    })
  ],
  build: {
    outDir: "dist",
    // sourcemap: true, // Generates source maps for easier debugging in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"]
        }
      }
    }
  },
  server: {
    port: 3e3,
    //base 5173
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmlraXRhYmlpY2h1ay9EZXNrdG9wL05pa2l0YSdzIEJpaWNodWsgUGVyc29uYWwvQ3liZXIgQ2xvdWQvRkUvY3liZXItY2xvdWQtd2ViLWRlbW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9uaWtpdGFiaWljaHVrL0Rlc2t0b3AvTmlraXRhJ3MgQmlpY2h1ayBQZXJzb25hbC9DeWJlciBDbG91ZC9GRS9jeWJlci1jbG91ZC13ZWItZGVtby92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbmlraXRhYmlpY2h1ay9EZXNrdG9wL05pa2l0YSdzJTIwQmlpY2h1ayUyMFBlcnNvbmFsL0N5YmVyJTIwQ2xvdWQvRkUvY3liZXItY2xvdWQtd2ViLWRlbW8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbm9kZVBvbHlmaWxscyh7XG4gICAgICAvLyBUbyBhZGQgb25seSBzcGVjaWZpYyBwb2x5ZmlsbHMsIGFkZCB0aGVtIGhlcmUuIElmIG5vIG9wdGlvbiBpcyBwYXNzZWQsIGFkZHMgYWxsIHBvbHlmaWxsc1xuICAgICAgaW5jbHVkZTogWydwYXRoJ10sXG4gICAgICAvLyBUbyBleGNsdWRlIHNwZWNpZmljIHBvbHlmaWxscywgYWRkIHRoZW0gdG8gdGhpcyBsaXN0LiBOb3RlOiBpZiBpbmNsdWRlIGlzIHByb3ZpZGVkLCB0aGlzIGhhcyBubyBlZmZlY3RcbiAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgJ2h0dHAnLCAvLyBFeGNsdWRlcyB0aGUgcG9seWZpbGwgZm9yIGBodHRwYCBhbmQgYG5vZGU6aHR0cGAuXG4gICAgICBdLFxuICAgICAgLy8gV2hldGhlciB0byBwb2x5ZmlsbCBzcGVjaWZpYyBnbG9iYWxzLlxuICAgICAgZ2xvYmFsczoge1xuICAgICAgICBCdWZmZXI6IHRydWUsIC8vIGNhbiBhbHNvIGJlICdidWlsZCcsICdkZXYnLCBvciBmYWxzZVxuICAgICAgICBnbG9iYWw6IHRydWUsXG4gICAgICAgIHByb2Nlc3M6IHRydWUsXG4gICAgICB9LFxuICAgICAgLy8gT3ZlcnJpZGUgdGhlIGRlZmF1bHQgcG9seWZpbGxzIGZvciBzcGVjaWZpYyBtb2R1bGVzLlxuICAgICAgb3ZlcnJpZGVzOiB7XG4gICAgICAgIC8vIFNpbmNlIGBmc2AgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2Vycywgd2UgY2FuIHVzZSB0aGUgYG1lbWZzYCBwYWNrYWdlIHRvIHBvbHlmaWxsIGl0LlxuICAgICAgICBmczogJ21lbWZzJyxcbiAgICAgIH0sXG4gICAgICAvLyBXaGV0aGVyIHRvIHBvbHlmaWxsIGBub2RlOmAgcHJvdG9jb2wgaW1wb3J0cy5cbiAgICAgIHByb3RvY29sSW1wb3J0czogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICAvLyBzb3VyY2VtYXA6IHRydWUsIC8vIEdlbmVyYXRlcyBzb3VyY2UgbWFwcyBmb3IgZWFzaWVyIGRlYnVnZ2luZyBpbiBwcm9kdWN0aW9uXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCwgLy9iYXNlIDUxNzNcbiAgICBvcGVuOiB0cnVlLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc2MsU0FBUyxvQkFBb0I7QUFDbmUsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBRTlCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQTtBQUFBLE1BRVosU0FBUyxDQUFDLE1BQU07QUFBQTtBQUFBLE1BRWhCLFNBQVM7QUFBQSxRQUNQO0FBQUE7QUFBQSxNQUNGO0FBQUE7QUFBQSxNQUVBLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLE1BQ1g7QUFBQTtBQUFBLE1BRUEsV0FBVztBQUFBO0FBQUEsUUFFVCxJQUFJO0FBQUEsTUFDTjtBQUFBO0FBQUEsTUFFQSxpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBO0FBQUEsSUFFUixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsUUFDL0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
