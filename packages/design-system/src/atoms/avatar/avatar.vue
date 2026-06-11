<script lang="ts" setup>
	defineProps<{
		url: string;
	}>();
</script>

<template>
	<img class="size-[24px] rounded-full border-2 border-solid border-gray-800" :src="url" alt="" />
</template>
