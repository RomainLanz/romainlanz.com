import '../src/css/reset.css';
import 'virtual:uno.css';
import type { Preview } from '@storybook/vue3';

globalThis.RomainLanz = {
	appUrl: 'http://romainlanz.localhost:3333',
};

const preview: Preview = {
	parameters: {
		layout: 'centered',
	},
};

export default preview;
