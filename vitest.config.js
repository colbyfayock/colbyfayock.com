import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    include: ['tests/unit/**/*.test.{js,jsx}'],
    exclude: ['node_modules', 'tests/e2e'],
    pool: 'vmThreads',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      data: path.resolve(__dirname, './src/data'),
      hooks: path.resolve(__dirname, './src/hooks'),
      lib: path.resolve(__dirname, './src/lib'),
      styles: path.resolve(__dirname, './src/styles'),
    },
  },
});
