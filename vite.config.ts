import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Avoid eval() used in source maps
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Alias for "src"
    },
  },
  server: {
    hmr: {
      overlay: false, // Disable overlay for errors
    },
  },
});
