import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
