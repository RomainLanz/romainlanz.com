<script lang="ts" setup>
	import LiveStatus from '@rlanz/design-system/live-status';

	defineProps<{ isLive: boolean }>();
</script>

<template>
	<LiveStatus v-if="isLive" />
</template>
