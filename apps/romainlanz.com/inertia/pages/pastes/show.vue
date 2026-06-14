<script lang="ts" setup>
	import { Data } from '@generated/data';

	defineProps<{
		vm: Data.Paste.PastePage;
	}>();
</script>

<template>
	<div v-html="vm.paste.content"></div>
</template>
