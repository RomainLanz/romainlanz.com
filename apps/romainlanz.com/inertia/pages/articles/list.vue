<script lang="ts" setup>
	import { Head, router } from '@inertiajs/vue3';
	import ArticleCard from '@rlanz/design-system/article-card';
	import CategoryListing from '@rlanz/design-system/category-listing';
	import Pagination from '@rlanz/design-system/pagination';
	import { client } from '~/client';
	import type { ArticleListViewModelSerialized } from '#articles/view_models/article_list_view_model';

	const {
		activeCategory,
		activeTag,
		activePage = 1,
		categoryListingAllArticlesCount,
		paginationArticlesCount,
		vm,
	} = defineProps<{
		activeCategory: string | null;
		activeTag: string | null;
		activePage: number;
		categoryListingAllArticlesCount: number;
		paginationArticlesCount: number;
		vm: ArticleListViewModelSerialized;
	}>();

	const paginationCount = paginationArticlesCount;

	function onPageChange(page: number) {
		const url = client.urlFor('articles.index', undefined, {
			qs: { page, category: activeCategory, tag: activeTag },
		});
		router.visit(url, {
			preserveScroll: true,
		});
	}

	function computeAllCategoriesHref() {
		return client.urlFor('articles.index');
	}

	function computeCategoryHref(category: { slug: string }) {
		return client.urlFor('articles.index', undefined, { qs: { category: category.slug } });
	}

	function computeArticleHref(slug: string) {
		return client.urlFor('articles.show', { slug });
	}
</script>

<template>
	<Head title="Tous les articles" />

	<div class="mx-auto max-w-7xl p-4">
		<h1 class="mt-27 mb-15 border-b-2 border-solid border-gray-900 pb-6">Tous les articles</h1>

		<div class="lg:cols-3 grid gap-6">
			<aside class="col-span-1">
				<h3 class="text-sm font-bold uppercase">Categories</h3>

				<CategoryListing
					:active-category="activeCategory"
					:categories="vm.categories"
					:all-href="computeAllCategoriesHref()"
					:all-articles-count="categoryListingAllArticlesCount"
					:category-href="computeCategoryHref"
				/>
			</aside>

			<section class="col-span-2 flex flex-col gap-4">
				<ArticleCard
					v-for="article in vm.articles"
					:key="article.id"
					:href="computeArticleHref(article.slug)"
					:title="article.title"
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
