import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [svgr(), react()],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/setup.js',
   },
   resolve: {
      alias: {
         '@icons': '/src/assets/',
         '@images': '/src/assets/',
         '@tests': '/src/tests',
      },
   },
});
