<script lang="ts" setup>
	import { computed } from 'vue';
	import Icon, { type IconName } from '../../atoms/icon/icon.vue';

	const { name, icon } = defineProps<{
		name: string;
		link: string;
		icon?: IconName;
	}>();

	const iconName = computed(() => {
		return icon ? icon : (name.toLowerCase() as IconName);
	});
</script>

<template>
	<a class="flex gap-2" :href="link" rel="nofollow">
		<Icon :name="iconName" />

		{{ name }}
	</a>
</template>
