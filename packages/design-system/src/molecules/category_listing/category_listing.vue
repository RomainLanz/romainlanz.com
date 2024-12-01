<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Illustration from '../../atoms/illustration/illustration.vue';
	import { client } from '@rlanz/rpc/client';
	import type { IllustrationName } from '../../atoms/illustration/illustration_name.js';

	const { activeCategory = null } = defineProps<{
		allArticlesCount: number;
		activeCategory?: string | null;
		categories: Array<{
			id: string;
			name: string;
			slug: string;
			illustrationName: IllustrationName;
			articleCount: number;
		}>;
	}>();

	const allUrl = client.$url('articles.index');
	function computeCategoryUrl(category: { slug: string }) {
		return client.$url('articles.index', { query: { category: category.slug } });
	}
</script>

<template>
	<ul class="list-none m-0 p-0 flex flex-wrap">
		<li
			class="border-solid border-2 w-[300px] rounded-lg hover:bg-yellow-300 transition-all"
			:class="{
				'border-transparent': activeCategory !== null,
				'border-gray-800 hover:shadow-small': activeCategory === null,
			}"
		>
			<Link class="flex items-center text-lg px-4 py-3 gap-3" :href="allUrl">
				<div class="grid place-items-center w-10">
					<Illustration class="h-10" name="all" />
				</div>

				<span>All</span>

				<span
					class="bg-yellow-100 text-xs rounded-md border border-solid border-gray-800 grid place-items-center h-[20px] px-1 min-w-[20px]"
				>
					{{ allArticlesCount }}
				</span>
			</Link>
		</li>

		<li
			class="border-solid border-2 w-[300px] rounded-lg hover:bg-yellow-300 transition-all"
			:class="{
				'border-transparent': activeCategory !== category.slug,
				'border-gray-800 hover:shadow-small': activeCategory === category.slug,
			}"
			v-for="category in categories"
			:key="category.id"
		>
			<Link class="flex items-center text-lg px-4 py-3 gap-3" :href="computeCategoryUrl(category)">
				<div class="grid place-items-center w-10">
					<Illustration class="h-10" :name="category.illustrationName" />
				</div>

				<span>{{ category.name }}</span>

				<span
					class="bg-yellow-100 text-xs rounded-md border border-solid border-gray-800 grid place-items-center h-[20px] px-1 min-w-[20px]"
				>
					{{ category.articleCount }}
				</span>
			</Link>
		</li>
	</ul>
</template>
