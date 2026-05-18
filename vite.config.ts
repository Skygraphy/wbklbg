import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('node_modules/@fontsource')) return 'fonts';
					if (id.includes('node_modules/@fortawesome')) return 'icons';
					if (id.includes('node_modules/@neondatabase') || id.includes('node_modules/neon')) return 'db';
				}
			}
		}
	}
});
