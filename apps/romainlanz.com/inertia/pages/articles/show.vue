<script lang="ts" setup>
	import { Head } from '@inertiajs/vue3';
	import Headline from '@rlanz/design-system/headline';
	import { computed } from 'vue';
	import ArticleContent from '~/components/articles/article_content.vue';
	import type { ArticleViewModelSerialized } from '#articles/view_models/article_view_model';

	const { vm } = defineProps<{
		vm: ArticleViewModelSerialized;
		ogImageUrl: string;
	}>();

	const escapedSummary = computed(() => vm.article.summary.replaceAll('"', '&quot;'));
</script>

<template>
	<Head :title="vm.article.title">
		<meta name="description" :content="escapedSummary" />
		<meta name="author" content="Romain Lanz" />

		<meta property="og:title" :content="vm.article.title" />
		<meta property="og:description" :content="escapedSummary" />
		<meta property="og:image" :content="ogImageUrl" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />

		<meta name="twitter:card" content="summary_large_image" />
		<meta property="twitter:domain" content="romainlanz.com" />
		<meta name="twitter:title" :content="vm.article.title" />
		<meta name="twitter:description" :content="escapedSummary" />
		<meta name="twitter:image" :content="ogImageUrl" />
	</Head>

	<div class="mx-auto max-w-7xl px-4">
		<article :class="$style.article">
			<Headline
				:title="vm.article.title"
				:category="vm.category.illustrationName"
				:published-at="vm.article.publishedAtHuman"
				:published-at-datetime="vm.article.publishedAt"
				:reading-time="vm.article.readingTime"
			/>

			<ArticleContent :html="vm.article.content" />
		</article>
	</div>
</template>

<style module>
	.article {
		font-size: 1.125rem;
		line-height: 26px;
		margin-inline: auto;
		max-width: 80ch;
		margin-top: 7rem;

		& > header {
			margin-bottom: 5rem;
		}
	}
</style>
