// frontend/astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
// Retirer l’import du plugin Vite incorrect
import { fileURLToPath } from 'url';

// https://astro.build/config
export default defineConfig({
  // Intégration Tailwind officielle
  integrations: [ tailwind() ],
  // on veut du SSR par défaut
  output: 'server',

  // on utilise l’adapter Node en mode standalone (nécessaire depuis v2.0.0)
  adapter: node({
    mode: 'standalone'
  }),

  vite: {
    // Retirer plugin tailwindcss() et laisser PostCSS gérer Tailwind
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Ignore les warnings de "null bytes"
          if (warning.message?.includes('null bytes')) return;
          warn(warning);
        },
      },
    },
    optimizeDeps: {
      exclude: [ 'astro' ],
    },
    server: {
      fs: {
        // Permet à Vite d’accéder à tout le repo
        allow: [ '.' ],
      },
    },
  },
});
