<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Table from '@rlanz/design-system/table';
	import Tag from '@rlanz/design-system/tag';
	import { client } from '~/client';
	import type { TagColor } from '@rlanz/design-system/tag-color';

	defineProps<{
		items: Array<{ id: string; name: string; slug: string; color: TagColor }>;
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
		{
			label: 'Actions',
			key: 'actions',
			cell: 'actions',
			width: '90px',
		},
	];

	function computeEditUrl(id: string) {
		return client.urlFor('admin.taxonomies.tags.edit', { id });
	}
</script>

<template>
	<Table :headers :items="items">
		<template #color="{ item }">
			<Tag :color="item.color">{{ item.color }}</Tag>
		</template>

		<template #actions="{ item }">
			<Link :href="computeEditUrl(item.id)">Modifier</Link>
		</template>
	</Table>
</template>
