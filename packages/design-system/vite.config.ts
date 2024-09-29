import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import Vue from '@vitejs/plugin-vue';
import DTS from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		UnoCSS(),
		Vue(),
		DTS({
			cleanVueFileName: true,
			exclude: ['src/**/*.stories.ts'],
			tsconfigPath: 'tsconfig.app.json',
		}),
	],
	build: {
		outDir: 'build',
		lib: {
			entry: 'src/main.ts',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['vue', '@inertiajs/vue3'],
		},
	},
});
