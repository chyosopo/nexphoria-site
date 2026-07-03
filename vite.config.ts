import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: "./",
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor splits — order matters (check specific libs before react)
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("lucide-react")) return "lucide";
            if (id.includes("wouter")) return "router";
            if (
              id.includes("react-dom") ||
              id.includes("scheduler") ||
              /[\\/]react[\\/]/.test(id)
            )
              return "react";
            return;
          }
          // Shared layout shell — rendered on every route
          if (/[\\/]components[\\/](Nav|Footer|SiteLayout)\./.test(id))
            return "components";
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
