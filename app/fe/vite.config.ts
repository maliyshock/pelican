import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    port: 3000,
    fs: {
      cachedChecks: false,
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src/"),
    },
  },
  plugins: [react()],
});
