import { defineConfig, splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [splitVendorChunkPlugin()],
});
