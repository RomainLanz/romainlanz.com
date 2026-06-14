<script lang="ts" setup>
	import { Data } from '@generated/data';
	import CategoryTable from '~/components/admin/taxonomies/category_table.vue';
	import { usePageTitle } from '~/composables/use_page_title';

	const { vm } = defineProps<{
		vm: Data.Admin.Taxonomies.AdminTaxonomyIndex;
	}>();

	usePageTitle('Taxonomy');
</script>

<template>
	<div class="flex flex-col gap-4">
		<h2>Catégories</h2>
		<CategoryTable :items="vm.categories" />
	</div>
</template>
