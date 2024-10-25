<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import { client } from '@rlanz/rpc/client';
	import { usePageTitle } from '~/composables/use_page_title';
	import type { AllArticleViewModelSerialized } from '#admin/articles/view_models/all_article_view_model';

	defineProps<{
		vm: AllArticleViewModelSerialized;
	}>();

	usePageTitle('Articles');

	const newArticleUrl = client.$url('admin.articles.create');
</script>

<template>
	<div>
		<Link :href="newArticleUrl">Ajouter</Link>

		{{ vm }}
	</div>
</template>
