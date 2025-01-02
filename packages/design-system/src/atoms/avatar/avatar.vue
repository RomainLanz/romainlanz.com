<script lang="ts" setup>
	defineProps<{
		url: string;
	}>();
</script>

<template>
	<img class="size-[24px] border-2 border-gray-800 rounded-full border-solid" :src="url" alt="" />
</template>
