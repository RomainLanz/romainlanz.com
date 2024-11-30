<script lang="ts" setup>
	import { Head } from '@inertiajs/vue3';
	import Headline from '@rlanz/design-system/headline';
	import type { ArticleViewModelSerialized } from '#articles/view_models/article_view_model';

	defineProps<{
		vm: ArticleViewModelSerialized;
	}>();
</script>

<template>
	<Head :title="vm.article.title" />

	<div class="mx-auto max-w-7xl px-4">
		<article :class="$style.article">
			<Headline
				:title="vm.article.title"
				:category="vm.category.illustrationName"
				:published-at="vm.article.publishedAtHuman"
				:published-at-datetime="vm.article.publishedAt"
				:reading-time="vm.article.readingTime"
			/>

			<div :class="$style.content" v-html="vm.article.content"></div>
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

	.content {
		& > * {
			margin-block: 1rem;
		}

		& a {
			cursor: pointer;
			text-decoration: underline;
		}

		& pre {
			font-size: 0.875rem;
			overflow-y: auto;
			padding: 1rem 1.5rem;
		}

		& :global(.shiki.has-focused .line:not(.focused)) {
			filter: blur(0.095rem);
			opacity: 0.7;
			transition:
				filter 0.35s,
				opacity 0.35s;
		}

		& :global(.shiki.has-focused:hover .line:not(.focused)) {
			filter: blur(0);
			opacity: 1;
		}

		& :global(.shiki.has-diff .diff) {
			display: inline-block;
			margin: 0 -24px;
			padding: 0 24px;
			transition: background-color 0.5s;
			width: calc(100% + 48px);

			:global(&.add) {
				--at-apply: important-bg-lime-300;
				--shiki-dark-bg: transparent;
			}

			:global(&.remove) {
				--at-apply: important-bg-red-300;
				--shiki-dark-bg: transparent;
				opacity: 0.7;
			}

			@media (prefers-color-scheme: dark) {
				:global(&.add) {
					--at-apply: important-bg-lime-800;
				}

				:global(&.remove) {
					--at-apply: important-bg-red-800;
				}
			}
		}

		& > pre {
			--at-apply: border-2 border-solid border-gray-800 bg-yellow-100 rounded-lg shadow-small;
			margin-bottom: 1.5rem;
			margin-top: 1rem;
		}

		& > blockquote {
			--at-apply: text-gray-500;
		}

		p code {
			--at-apply: text-yellow-900 bg-yellow-400 rounded;
			display: inline-block;
			font-size: 0.875rem;
			padding: 0 0.25rem;
		}

		& > h2 {
			font-size: 2.75rem;
			margin-top: 3.75rem;
			margin-bottom: 1.75rem;
		}

		& > h3 {
			font-size: 2.25rem;
			margin-top: 2.5rem;
			margin-bottom: 1.25rem;
		}

		& > h4 {
			font-size: 1.75rem;
			margin-top: 2rem;
			margin-bottom: 1rem;
		}
	}
</style>
