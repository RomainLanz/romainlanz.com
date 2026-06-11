import TailwindCSS from '@tailwindcss/vite';
import Vue from '@vitejs/plugin-vue';
import VueJSX from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [TailwindCSS(), Vue(), VueJSX()],
});
