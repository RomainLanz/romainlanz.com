<script lang="ts" setup>
	import Tag, { type TagProps } from '../../atoms/tag/tag.vue';
	import Illustration, { type IllustrationName } from '../../atoms/illustration/illustration.vue';

	defineProps<{
		title: string;
		category: IllustrationName;
		publishedAt: string;
		publishedAtDatetime: string;
		readingTime: number;
		tags?: Array<{ name: string; color: TagProps['color'] }>;
	}>();
</script>

<template>
	<header class="flex flex-col gap-2">
		<div>
			<time class="relative text-xl" :class="$style.time" :datetime="publishedAtDatetime">
				{{ publishedAt }}
			</time>
		</div>

		<div class="relative">
			<Illustration class="absolute left-[-162px] w-[130px]" :name="category" />
			<h1 class="text-6xl max-w-4xl">{{ title }}</h1>
		</div>

		<div class="flex items-center gap-3">
			<Tag v-if="tags" v-for="tag in tags" :color="tag.color">
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
