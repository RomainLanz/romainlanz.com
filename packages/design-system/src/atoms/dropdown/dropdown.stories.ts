import Button from '../button/button.vue';
import Dropdown from './dropdown.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Dropdown,
	title: 'Atoms/Dropdown',
	render: (args) => ({
		component: {
			Dropdown,
			Button,
		},
		setup: () => ({ args }),
		template: `
      <Dropdown v-bind="args">
        <Button color="yellow">Click Me</Button>
      </Dropdown>
    `,
	}),
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		actions: [
			{
				label: 'Action 1',
				code: 'action-1',
				onClick: () => {
					alert('Action 1');
				},
			},
			{
				label: 'Action 2',
				code: 'action-2',
				onClick: () => {
					alert('Action 2');
				},
			},
		],
	},
};
