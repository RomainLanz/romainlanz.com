<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import ReferenceLink from '@rlanz/design-system/reference-link';
	import Table from '@rlanz/design-system/table';
	import { client } from '@rlanz/rpc/client';
	import { computed } from 'vue';
	import { usePageTitle } from '~/composables/use_page_title';
	import type { AllArticleViewModelSerialized } from '#admin/articles/view_models/all_article_view_model';

	const { vm } = defineProps<{
		vm: AllArticleViewModelSerialized;
	}>();

	usePageTitle('Articles');

	const newArticleUrl = client.$url('admin.articles.create');

	const headers = [
		{
			label: 'Publication',
			key: 'publishedAtHuman',
			width: '200px',
		},
		{
			label: 'Titre',
			key: 'title',
			cell: 'title',
		},
		{
			label: 'Actions',
			key: 'actions',
			cell: 'actions',
			width: '70px',
		},
	];

	const items = computed(() => {
		return vm.map((article) => ({
			id: article.id,
			title: article.title,
			slug: article.slug,
			publishedAtHuman: article.publishedAtHuman,
		}));
	});

	function computeShowUrl(slug: string) {
		return client.$url('articles.show', { params: { slug } });
	}

	function computeEditUrl(id: string) {
		return client.$url('admin.articles.edit', { params: { id } });
	}
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="w-min">
			<Button color="violet" :href="newArticleUrl">Écrire</Button>
		</div>

		<Table :headers :items>
			<template #title="{ item }">
				<div class="flex items-center gap-2">
					<ReferenceLink :href="computeShowUrl(item.slug)" prefetch />
					<span>{{ item.title }}</span>
				</div>
			</template>

			<template #actions="{ item }">
				<div class="flex gap-2">
					<Link :href="computeEditUrl(item.id)">Modifier</Link>
				</div>
			</template>
		</Table>
	</div>
</template>
