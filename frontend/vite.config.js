// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				// Skip specific warnings related to null bytes
				if (warning.message && warning.message.includes('null bytes')) {
					return;
				}
				// Use default warning behavior for other warnings
				warn(warning);
			}
		}
	},
	optimizeDeps: {
		exclude: [ 'astro' ]
	}
});
