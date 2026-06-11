import { preview } from '../../../.storybook/preview';
import AlertNote from './alert_note.vue';

const meta = preview.meta({
	component: AlertNote,
	title: 'Molecules/AlertNote',
	argTypes: {
		type: {
			options: ['info', 'success', 'warning', 'danger'],
		},
		default: {
			type: 'string',
		},
	},
});

export default meta;

export const Base = meta.story({
	args: {
		type: 'info',
		default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
	},
});

export const WithLongText = meta.story({
	args: {
		type: 'info',
		default:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
	},
});

export const WithTwoParagraph = meta.story({
	args: {
		type: 'info',
	},
	render: (args) => ({
		components: {
			AlertNote,
		},
		setup: () => ({ args }),
		template: `
      <AlertNote v-bind="args">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</p>
      </AlertNote>
    `,
	}),
});
