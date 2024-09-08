import '../src/css/reset.css';
import 'virtual:uno.css';

import type { Preview } from '@storybook/vue3';

const preview: Preview = {
	parameters: {
		layout: 'centered',
	},
};

export default preview;
