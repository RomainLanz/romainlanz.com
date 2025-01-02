<script lang="ts" setup>
	import {
		PaginationRoot,
		PaginationNextTrigger,
		PaginationPrevTrigger,
		PaginationContext,
		PaginationItem,
		PaginationEllipsis,
		type PaginationPageChangeDetails as PageChangeDetails,
	} from '@ark-ui/vue/pagination';
	import Button from '../../atoms/button/button.vue';
	import Icon from '../../atoms/icon/icon.vue';

	const {
		activePage,
		siblingCount = 1,
		pageSize = 4,
	} = defineProps<{
		activePage: number;
		count: number;
		siblingCount?: number;
		pageSize?: number;
	}>();

	const emits = defineEmits<{
		pageChange: [number];
	}>();

	function onPageChange(details: PageChangeDetails) {
		emits('pageChange', details.page);
	}
</script>

<template>
	<PaginationRoot
		class="flex items-center gap-4 font-bold"
		:page="activePage"
		:count
		:sibling-count="siblingCount"
		:page-size="pageSize"
		@page-change="onPageChange"
	>
		<PaginationPrevTrigger v-if="activePage !== 1" as-child>
			<Button class="aspect-ratio-square" size="small" :flat="true">
				<Icon name="chevron-right" class="rotate-180" />
			</Button>
		</PaginationPrevTrigger>

		<PaginationContext v-slot="pagination">
			<template v-for="(page, index) in pagination.pages">
				<PaginationItem v-if="page.type === 'page'" :key="index" :value="page.value" :type="page.type" as-child>
					<Button class="aspect-ratio-square !text-lg" size="small" :flat="page.value !== activePage">
						{{ page.value }}
					</Button>
				</PaginationItem>

				<PaginationEllipsis v-else :key="`e${index}`" :index="index"> &#8230; </PaginationEllipsis>
			</template>
		</PaginationContext>

		<PaginationNextTrigger v-if="activePage !== count" as-child>
			<Button class="aspect-ratio-square" size="small" :flat="true">
				<Icon name="chevron-right" />
			</Button>
		</PaginationNextTrigger>
	</PaginationRoot>
</template>
