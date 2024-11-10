<script lang="ts" setup>
	import { router } from '@inertiajs/vue3';
	import ArticleCard from '@rlanz/design-system/article-card';
	import CategoryListing from '@rlanz/design-system/category-listing';
	import Pagination from '@rlanz/design-system/pagination';
	import { client } from '@rlanz/rpc/client';
	import type { ArticleListViewModelSerialized } from '#articles/view_models/article_list_view_model';

	const {
		activeCategory,
		activePage = 1,
		allArticlesCount,
		vm,
	} = defineProps<{
		activeCategory: string | null;
		activePage: number;
		allArticlesCount: number;
		vm: ArticleListViewModelSerialized;
	}>();

	const paginationCount =
		vm.categories.find((category) => category.slug === activeCategory)?.articleCount ?? allArticlesCount;

	function onPageChange(page: number) {
		const url = client.$url('articles.index', { query: { page, category: activeCategory } });
		router.visit(url, {
			preserveScroll: true,
		});
	}
</script>

<template>
	<div class="mx-auto max-w-7xl p-4">
		<h1 class="mb-15 mt-27 border-b-2 border-gray-900 border-b-solid pb-6">Tous les articles</h1>

		<div class="grid gap-6 lg:cols-3">
			<aside class="col-span-1">
				<h3 class="text-sm font-bold uppercase">Categories</h3>

				<CategoryListing :active-category="activeCategory" :categories="vm.categories" :all-articles-count />
			</aside>

			<section class="col-span-2 flex flex-col gap-4">
				<ArticleCard
					v-for="article in vm.articles"
					:key="article.id"
					:title="article.title"
					:slug="article.slug"
					:date="article.publishedAtHuman"
					:datetime="article.publishedAt"
					:excerpt="article.summary"
					:reading-time="5"
				/>

				<Pagination :active-page="activePage" :count="paginationCount" @page-change="onPageChange" />
			</section>
		</div>
	</div>
</template>
