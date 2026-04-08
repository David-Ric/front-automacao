import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/pga/',
  plugins: [react()],
  server: {
    port: 5173,
    open: '/pga/'
  },
  preview: {
    open: '/pga/'
  }
});
