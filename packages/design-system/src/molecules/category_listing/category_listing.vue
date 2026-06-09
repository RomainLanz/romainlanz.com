<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Illustration from '../../atoms/illustration/illustration.vue';
	import type { IllustrationName } from '../../atoms/illustration/illustration_name.js';

	const { activeCategory = null } = defineProps<{
		allHref: string;
		allArticlesCount: number;
		activeCategory?: string | null;
		categories: Array<{
			id: string;
			name: string;
			slug: string;
			illustrationName: IllustrationName;
			articleCount: number;
		}>;
		categoryHref: (category: { slug: string }) => string;
	}>();
</script>

<template>
	<ul class="m-0 flex flex-col flex-wrap list-none p-0">
		<li
			class="w-[300px] border-2 rounded-lg border-solid transition-all hover:bg-yellow-300"
			:class="{
				'border-transparent': activeCategory !== null,
				'border-gray-800 hover:shadow-small': activeCategory === null,
			}"
		>
			<Link class="flex items-center gap-3 px-4 py-3 text-lg" :href="allHref">
				<div class="grid w-10 place-items-center">
					<Illustration class="h-10" name="all" />
				</div>

				<span>All</span>

				<span
					class="grid h-[20px] min-w-[20px] place-items-center border border-gray-800 rounded-md border-solid bg-yellow-100 px-1 text-xs"
				>
					{{ allArticlesCount }}
				</span>
			</Link>
		</li>

		<li
			v-for="category in categories"
			:key="category.id"
			class="w-[300px] border-2 rounded-lg border-solid transition-all hover:bg-yellow-300"
			:class="{
				'border-transparent': activeCategory !== category.slug,
				'border-gray-800 hover:shadow-small': activeCategory === category.slug,
			}"
		>
			<Link class="flex items-center gap-3 px-4 py-3 text-lg" :href="categoryHref(category)">
				<div class="grid w-10 place-items-center">
					<Illustration class="h-10" :name="category.illustrationName" />
				</div>

				<span>{{ category.name }}</span>

				<span
					class="grid h-[20px] min-w-[20px] place-items-center border border-gray-800 rounded-md border-solid bg-yellow-100 px-1 text-xs"
				>
					{{ category.articleCount }}
				</span>
			</Link>
		</li>
	</ul>
</template>
