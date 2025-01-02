import Button from '../../atoms/button/button.vue';
import Dialog from './dialog.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Dialog,
	title: 'Molecules/Dialog',
	args: {
		title: 'Dialog Title',
	},
	render: (args) => ({
		components: {
			Dialog,
			Button,
		},
		setup: () => ({ args }),
		template: `
      <Dialog v-bind="args">
        <template #trigger>
          <Button color="yellow">Click Me</Button>
        </template>

        <template #content>
          <p>Lorem</p>
        </template>
      </Dialog>
    `,
	}),
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
