/// <reference types="vitest" />
import path from "path";
import { defaultExclude, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...defaultExclude],
    setupFiles: ["dotenv/config"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
