<script lang="ts" setup>
	import Panel from '@rlanz/design-system/panel';
	import { usePageTitle } from '~/composables/use_page_title';

	defineProps<{
		categories: any[];
	}>();

	usePageTitle('Créer un article');
</script>

<template>
	<Panel>
		<form>
			{{ categories }}
		</form>
	</Panel>
</template>
