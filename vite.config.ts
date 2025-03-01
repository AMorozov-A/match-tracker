import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['styled-components', { displayName: true, ssr: false }]],
      },
    }),
  ],
  optimizeDeps: {
    include: ['styled-components'],
  },
});
