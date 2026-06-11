import { preview } from '../../../.storybook/preview';
import Button from '../button/button.vue';
import Dropdown from './dropdown.vue';

const meta = preview.meta({
	component: Dropdown,
	title: 'Atoms/Dropdown',
	render: (args) => ({
		components: {
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
});

export default meta;

export const Base = meta.story({
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
});
