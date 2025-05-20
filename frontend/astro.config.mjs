// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'url';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [ tailwindcss() ],
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Skip warnings related to null bytes
          if (warning.message && warning.message.includes('null bytes')) {
            return;
          }
          warn(warning);
        }
      }
    },
    optimizeDeps: {
      exclude: [ 'astro' ]
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      fs: {
        allow: [ '.' ]
      }
    }
  },
  adapter: vercel()
});