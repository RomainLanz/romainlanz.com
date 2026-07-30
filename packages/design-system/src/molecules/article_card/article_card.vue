<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Tag from '../../atoms/tag/tag.vue';
	import type { TagProps } from '../../atoms/tag/tag.vue';

	const { href } = defineProps<{
		href: string;
		title: string;
		date: string;
		datetime: string;
		excerpt: string;
		readingTime: number;
		tags?: Array<{ name: string; color: TagProps['color']; href?: string }>;
	}>();
</script>

<template>
	<article
		class="shadow-small group relative isolate flex flex-col gap-4 rounded-md border-2 border-solid border-gray-800 bg-white p-6 text-gray-800 transition-colors hover:bg-yellow-100"
	>
		<Link class="absolute inset-0" :href prefetch :aria-label="title" />

		<header class="pointer-events-none">
			<time class="relative text-xs" :class="$style.time" :datetime>
				{{ date }}
			</time>

			<h2 class="text-2xl">{{ title }}</h2>
		</header>

		<p class="pointer-events-none text-lg">
			{{ excerpt }}
		</p>

		<div class="pointer-events-none relative flex items-center gap-3">
			<template v-if="tags">
				<Tag v-for="tag in tags" :key="tag.name" class="pointer-events-auto" :color="tag.color" :href="tag.href">
					{{ tag.name }}
				</Tag>
			</template>

			<span class="text-xs uppercase">{{ readingTime }}mn de lecture</span>
		</div>
	</article>
</template>

<style module>
	.time:before {
		background-color: var(--color-yellow-500);
		content: '';
		height: 6px;
		bottom: 0;
		margin-left: -2.5%;
		position: absolute;
		width: 105%;
		z-index: -1;
	}
</style>
