import { preview } from '../../../.storybook/preview';
import Button from '../../atoms/button/button.vue';
import Table from './table.vue';

const meta = preview.meta({
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
});

export default meta;

export const Base = meta.story();

export const WithSlot = meta.story({
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
});

export const WithCustomWidth = meta.story({
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
});
