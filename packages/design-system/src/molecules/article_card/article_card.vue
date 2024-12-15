<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import { computed } from 'vue';
	import { client } from '@rlanz/rpc/client';
	import Tag, { TagProps } from '../../atoms/tag/tag.vue';

	const { slug } = defineProps<{
		slug: string;
		title: string;
		date: string;
		datetime: string;
		excerpt: string;
		tags?: Array<{ name: string; color: TagProps['color'] }>;
	}>();

	const articleUrl = computed(() => {
		return client.$url('articles.show', { params: { slug } });
	});
</script>

<template>
	<Link :href="articleUrl" prefetch>
		<article
			class="flex flex-col gap-4 bg-white border-2 border-solid border-gray-800 rounded-md shadow-small text-gray-800 p-6 isolate transition-colors hover:bg-yellow-100"
		>
			<header>
				<time class="text-xs relative" :class="$style.time" :datetime>
					{{ date }}
				</time>

				<h2 class="text-2xl">{{ title }}</h2>
			</header>

			<p class="text-lg">
				{{ excerpt }}
			</p>

			<div class="flex items-center gap-3">
				<Tag v-if="tags" v-for="tag in tags" :color="tag.color">
					{{ tag.name }}
				</Tag>
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
