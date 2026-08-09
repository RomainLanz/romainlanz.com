<script lang="ts" setup>
	import { Data } from '@generated/data';
	import { Head, Link, router } from '@inertiajs/vue3';
	import ArticleCard from '@rlanz/design-system/article-card';
	import CategoryListing from '@rlanz/design-system/category-listing';
	import Pagination from '@rlanz/design-system/pagination';
	import Tag from '@rlanz/design-system/tag';
	import { client } from '~/client';

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
		vm: Data.Articles.ArticleListPage;
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

	function computeAllTagsHref() {
		return client.urlFor('articles.index', undefined, { qs: { category: activeCategory } });
	}

	function computeFilterTagHref(tag: { slug: string }) {
		return client.urlFor('articles.index', undefined, {
			qs: { category: activeCategory, tag: tag.slug },
		});
	}

	function computeArticleHref(slug: string) {
		return client.urlFor('articles.show', { slug });
	}

	function computeArticleTagHref(slug: string) {
		return client.urlFor('articles.index', undefined, {
			qs: { category: activeCategory, tag: slug },
		});
	}
</script>

<template>
	<Head title="Tous les articles" />

	<div class="mx-auto max-w-7xl p-4">
		<h1 class="mt-27 mb-15 border-b-2 border-solid border-gray-900 pb-6">Tous les articles</h1>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<aside class="lg:col-span-1">
				<h3 class="text-sm font-bold uppercase">Categories</h3>

				<CategoryListing
					:active-category="activeCategory"
					:categories="vm.categories"
					:all-href="computeAllCategoriesHref()"
					:all-articles-count="categoryListingAllArticlesCount"
					:category-href="computeCategoryHref"
				/>

				<h3 class="mt-12 mb-4 text-sm font-bold uppercase">Tags</h3>

				<div class="flex flex-wrap gap-3">
					<Link :href="computeAllTagsHref()" :aria-current="activeTag === null ? 'page' : undefined">
						<Tag :class="{ 'shadow-tiny': activeTag === null }">Any</Tag>
					</Link>

					<Link
						v-for="tag in vm.tags"
						:key="tag.id"
						:href="computeFilterTagHref(tag)"
						:aria-current="activeTag === tag.slug ? 'page' : undefined"
					>
						<Tag :color="tag.color" :class="{ 'shadow-tiny': activeTag === tag.slug }">
							{{ tag.name }}
						</Tag>
					</Link>
				</div>
			</aside>

			<section class="flex flex-col gap-4 lg:col-span-2">
				<ArticleCard
					v-for="article in vm.articles"
					:key="article.id"
					:href="computeArticleHref(article.slug)"
					:title="article.title"
					:date="article.publishedAtHuman"
					:datetime="article.publishedAt"
					:excerpt="article.summary"
					:reading-time="5"
					:tags="article.tags.map((tag) => ({ ...tag, href: computeArticleTagHref(tag.slug) }))"
				/>

				<Pagination :active-page="activePage" :count="paginationCount" @page-change="onPageChange" />
			</section>
		</div>
	</div>
</template>
