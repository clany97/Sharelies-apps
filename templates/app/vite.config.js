import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// BASE_PATH and OUT_DIR are set by factory/scripts/build-site.mjs for the deployed site.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.BASE_PATH ?? "/",
  build: { outDir: process.env.OUT_DIR ?? "dist", emptyOutDir: true },
});
