<script lang="ts" setup>
	import Table from '@rlanz/design-system/table';
	import Tag from '@rlanz/design-system/tag';
	import type { TagColor } from '@rlanz/design-system/tag-color';

	defineProps<{
		items: Array<{ name: string; slug: string; color: TagColor }>;
	}>();

	const headers = [
		{
			label: 'Nom',
			key: 'name',
		},
		{
			label: 'Slug',
			key: 'slug',
		},
		{
			label: 'Couleur',
			key: 'color',
			cell: 'color',
			width: '140px',
		},
	];
</script>

<template>
	<Table :headers :items="items">
		<template #color="{ item }">
			<Tag :color="item.color">{{ item.color }}</Tag>
		</template>
	</Table>
</template>
