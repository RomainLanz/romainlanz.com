import AlertNote from './alert_note.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
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
} satisfies Meta<typeof AlertNote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		type: 'info',
		default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
	},
};

export const WithLongText: Story = {
	args: {
		type: 'info',
		default:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
	},
};

export const WithTwoParagraph: Story = {
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
};
