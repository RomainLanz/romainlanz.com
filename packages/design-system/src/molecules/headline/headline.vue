<script lang="ts" setup>
	import Illustration from '../../atoms/illustration/illustration.vue';
	import Tag, { type TagProps } from '../../atoms/tag/tag.vue';
	import type { IllustrationName } from '../../atoms/illustration/illustration_name.js';

	defineProps<{
		title: string;
		category: IllustrationName;
		publishedAt: string;
		publishedAtDatetime?: string;
		readingTime: number;
		tags?: Array<{ name: string; color: TagProps['color'] }>;
	}>();
</script>

<template>
	<header class="flex flex-col gap-2">
		<div>
			<time class="relative text-xl" :class="$style.time" :datetime="publishedAtDatetime">
				{{ publishedAtDatetime ? publishedAt : 'Non publié' }}
			</time>
		</div>

		<div class="relative">
			<Illustration class="absolute left-[-162px] hidden w-[130px] xl:block" :name="category" />
			<h1 class="max-w-4xl text-6xl">{{ title }}</h1>
		</div>

		<div class="flex items-center gap-3">
			<Tag v-for="tag in tags" v-if="tags" :color="tag.color">
				{{ tag.name }}
			</Tag>

			<span class="text-xs uppercase">{{ readingTime }}mn de lecture</span>
		</div>
	</header>
</template>

<style module>
	.time:before {
		background-color: theme('colors.yellow.500');
		content: '';
		height: 6px;
		bottom: 4px;
		position: absolute;
		width: 100%;
		z-index: -1;
	}
</style>
