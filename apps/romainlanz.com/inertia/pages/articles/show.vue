<script lang="ts" setup>
	import Headline from '@rlanz/design-system/headline';
	import type { ArticleViewModelSerialized } from '#articles/view_models/article_view_model';

	defineProps<{
		vm: ArticleViewModelSerialized;
	}>();
</script>

<template>
	<div class="mx-auto max-w-7xl px-4">
		<article :class="$style.article">
			<Headline
				:title="vm.article.title"
				:category="vm.category.illustrationName"
				:published-at="vm.article.publishedAtHuman"
				:published-at-datetime="vm.article.publishedAt"
				:reading-time="5"
			/>

			<div v-html="vm.article.content"></div>
		</article>
	</div>
</template>

<style module>
	.article {
		font-size: 1.125rem;
		line-height: 26px;
		margin-inline: auto;
		width: 80ch;
		margin-top: 7rem;

		& > header {
			margin-bottom: 5rem;
		}

		.codegroup {
			margin-top: 1rem;
			margin-bottom: 1.5rem;
		}

		a {
			cursor: pointer;
			text-decoration: underline;
		}

		& > * > pre {
			--at-apply: border-2 border-solid border-gray-800 bg-yellow-100 rounded-lg shadow-small;
			font-size: 0.875rem;
			margin-bottom: 1.5rem;
			margin-top: 1rem;
			overflow-y: auto;
			padding: 1rem 1.5rem;
		}

		& > * > blockquote {
			--at-apply: text-gray-500;
		}

		& > * > p code {
			--at-apply: text-yellow-900 bg-yellow-400 rounded;
			display: inline-block;
			font-size: 0.875rem;
			padding: 0 0.25rem;
		}

		& > * > .alert {
			margin-block: 1rem;
		}

		& > * > p {
			margin-block: 1rem;
		}

		& > * > h2 {
			font-size: 2.75rem;
			margin-top: 3.75rem;
			margin-bottom: 1.75rem;
		}

		& > * > h3 {
			font-size: 2.25rem;
			margin-top: 2.5rem;
			margin-bottom: 1.25rem;
		}

		& > * > h4 {
			font-size: 1.75rem;
			margin-top: 2rem;
			margin-bottom: 1rem;
		}
	}
</style>
