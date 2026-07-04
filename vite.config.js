import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [], // This array must be explicitly declared to satisfy Cloudflare
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
