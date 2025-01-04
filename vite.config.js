import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1600, // Increase if you encounter large asset warnings
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return; // Suppresses specific Rollup warnings
          }
          warn(warning);
        }
      }
    },
    server: {
      port: 5173, // Dev server port
      open: true  // Automatically opens the browser
    },
    resolve: {
      alias: {
        '@': '/src' // Simplifies imports
      }
    },
    define: {
      'process.env': env
    }
  };
});
