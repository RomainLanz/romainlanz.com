<script lang="ts" setup>
	import type { PasteViewModelSerialized } from '#paste/view_models/paste_view_model';

	defineProps<{
		vm: PasteViewModelSerialized;
	}>();
</script>

<template>
	<div v-html="vm.paste.content"></div>
</template>
