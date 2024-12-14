import Table from './table.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../../atoms/button/button.vue';

const meta = {
	component: Table,
	title: 'Atoms/Table',
	args: {
		headers: [
			{
				key: 'id',
				label: 'ID',
			},
			{
				key: 'name',
				label: 'Name',
			},
			{
				key: 'email',
				label: 'Email',
			},
		],
		items: [
			{
				id: '1',
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
			{
				id: '2',
				name: 'Jane Doe',
				email: 'jane.doe@example.com',
			},
		],
	},
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const WithSlot: Story = {
	args: {
		headers: [
			{
				key: 'id',
				label: 'ID',
			},
			{
				key: 'name',
				label: 'Name',
			},
			{
				key: 'email',
				label: 'Email',
			},
			{
				key: 'actions',
				label: '',
				cell: 'actions',
			},
		],
		items: [
			{
				id: '1',
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
			{
				id: '2',
				name: 'Jane Doe',
				email: 'jane.doe@example.com',
			},
		],
	},
	render: (args) => ({
		components: {
			Table,
			Button,
		},
		setup: () => ({ args }),
		template: `
      <Table v-bind='args'>
        <template #actions="{ item }">
          <Button color="yellow" size="small">Click me - {{ item.name }}</Button>
        </template>
      </Table>
    `,
	}),
};

export const WithCustomWidth: Story = {
	args: {
		headers: [
			{
				key: 'id',
				label: 'ID',
				align: 'center',
				width: '70px',
			},
			{
				key: 'name',
				label: 'Name',
				width: '300px',
				align: 'left',
			},
			{
				key: 'email',
				label: 'Email',
				width: '300px',
				align: 'left',
			},
		],

		items: [
			{
				id: '1',
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
			{
				id: '2',
				name: 'Jane Doe',
				email: 'jane.doe@example.com',
			},
		],
	},
};
