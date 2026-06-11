import '../src/css/reset.css';
import { definePreview } from '@storybook/vue3-vite';

(globalThis as typeof globalThis & { RomainLanz: { appUrl: string } }).RomainLanz = {
	appUrl: 'http://romainlanz.localhost:3333',
};

export const preview = definePreview({
	addons: [],
	parameters: {
		layout: 'centered',
	},
});
