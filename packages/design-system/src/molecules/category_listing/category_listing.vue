<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Illustration, { type IllustrationName } from '../../atoms/illustration/illustration.vue';

	defineProps<{
		categories: Array<{
			id: string;
			name: string;
			slug: string;
			illustrationName: IllustrationName;
			articleCount: number;
		}>;
	}>();

	function computeCategoryUrl(category: { slug: string }) {
		// return client.$url('')
	}
</script>

<template>
	<ul class="list-none m-0 p-0">
		<li
			class="border-solid border-2 border-transparent w-[300px] rounded-lg hover:bg-yellow-300 hover:border-gray-800"
			v-for="category of categories"
			:key="category.id"
		>
			<Link class="flex items-center text-lg px-4 py-3 gap-3" href="#">
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
