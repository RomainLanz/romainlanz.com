<script lang="ts" setup>
	import Headline from '@rlanz/design-system/headline';
	import type { ArticleViewModelSerialized } from '#articles/view_models/article_view_model';

	defineProps<{
		vm: ArticleViewModelSerialized;
	}>();
</script>

<template>
	<div class="mx-auto max-w-7xl px-4">
		<article>
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
