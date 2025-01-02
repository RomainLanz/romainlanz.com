<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import { client } from '@rlanz/rpc/client';
	import { computed } from 'vue';
	import Tag from '../../atoms/tag/tag.vue';
	import type { TagProps } from '../../atoms/tag/tag.vue';

	const { slug } = defineProps<
		{
			slug: string;
			title: string;
			date: string;
			datetime: string;
			excerpt: string;
			tags?: Array<{ name: string; color: TagProps['color'] }>;
		} & ({ readingTime: number } | { thumbnailUrl: string; videoLength: string })
	>();

	const articleUrl = computed(() => {
		return client.$url('articles.show', { params: { slug } });
	});
</script>

<template>
	<Link :href="articleUrl" prefetch>
		<article
			class="isolate flex flex-col gap-4 border-2 border-gray-800 rounded-md border-solid bg-white p-6 text-gray-800 shadow-small transition-colors hover:bg-yellow-100"
		>
			<header>
				<time class="relative text-xs" :class="$style.time" :datetime>
					{{ date }}
				</time>

				<h2 class="text-2xl">{{ title }}</h2>
			</header>

			<p class="text-lg">
				{{ excerpt }}
			</p>

			<div class="flex items-center gap-3">
				<Tag v-for="tag in tags" v-if="tags" :color="tag.color">
					{{ tag.name }}
				</Tag>

				<span class="text-xs uppercase">{{ readingTime }}mn de lecture</span>
			</div>
		</article>
	</Link>
</template>

<style module>
	.time:before {
		background-color: theme('colors.yellow.500');
		content: '';
		height: 6px;
		bottom: 0;
		margin-left: -2.5%;
		position: absolute;
		width: 105%;
		z-index: -1;
	}
</style>
