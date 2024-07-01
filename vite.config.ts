import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import inject from '@rollup/plugin-inject'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
      include: ['path'],
      // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
      exclude: [
        'http', // Excludes the polyfill for `http` and `node:http`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Override the default polyfills for specific modules.
      overrides: {
        // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
        fs: 'memfs',
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  // optimizeDeps: {
  //   esbuildOptions: {
  //     // Node.js global to browser globalThis
  //     define: {
  //       global: 'globalThis',
  //     },
  //   },
  // },
  // build: {
  //   rollupOptions: {
  //     plugins: [
  //       inject({
  //         // Provide global variables to replace modules
  //         // global: 'globalThis',
  //         process: 'process',
  //         Buffer: ['buffer', 'Buffer'],
  //       }),
  //     ],
  //   },
  // },
  build: {
    outDir: 'dist',
    sourcemap: true, // Generates source maps for easier debugging in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    // port: 3000, //base 5173
    open: true,
  },
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
