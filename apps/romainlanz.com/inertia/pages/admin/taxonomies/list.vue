<script lang="ts" setup>
	import CategoryTable from '~/components/admin/taxonomies/category_table.vue';
	import { usePageTitle } from '~/composables/use_page_title';
	import type { AllTaxonomiesViewModelSerialized } from '#admin/taxonomies/view_models/all_taxonomies_view_model';

	const { vm } = defineProps<{
		vm: AllTaxonomiesViewModelSerialized;
	}>();

	usePageTitle('Taxonomy');
</script>

<template>
	<div class="flex flex-col gap-4">
		<h2>Catégories</h2>
		<CategoryTable :items="vm.categories" />
	</div>
</template>
