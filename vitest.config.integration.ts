// vitest.config.integration.ts
import path from 'path';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...defaultExclude],
    setupFiles: ["dotenv/config"],
    include: ['test/integration/**/*.integration.test.ts'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
