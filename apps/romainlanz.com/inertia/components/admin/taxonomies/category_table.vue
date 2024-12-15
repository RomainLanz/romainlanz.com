<script lang="ts" setup>
	import Illustration from '@rlanz/design-system/illustration';
	import Table from '@rlanz/design-system/table';

	defineProps<{
		items: Array<{ name: string; illustrationName: string }>;
	}>();

	const headers = [
		{
			label: '',
			key: 'illustrationName',
			cell: 'illustration',
			width: '70px',
		},
		{
			label: 'Name',
			key: 'name',
		},
	];
</script>

<template>
	<Table :headers :items="items">
		<template #illustration="{ item }">
			<Illustration class="size-10" :name="item.illustrationName" />
		</template>
	</Table>
</template>
