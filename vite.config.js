import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  css: {
    modules: {
      generateScopedName: '[local]___[hash:base64:5]',
    },
  },
  alias: {
    '@mui/styles': '@mui/styles/esm', // Replace with the appropriate ESM entry point if different
  },
});
