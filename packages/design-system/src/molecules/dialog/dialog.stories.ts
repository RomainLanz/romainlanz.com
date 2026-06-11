import { preview } from '../../../.storybook/preview';
import Button from '../../atoms/button/button.vue';
import Dialog from './dialog.vue';

const meta = preview.meta({
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
});

export default meta;

export const Base = meta.story();
