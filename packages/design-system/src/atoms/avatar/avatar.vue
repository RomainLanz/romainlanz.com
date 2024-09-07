<script lang="ts" setup>
	defineProps<{
		url: string;
	}>();
</script>

<template>
	<img class="rounded-full size-[24px] border-2 border-solid border-gray-800" :src="url" alt="" />
</template>
