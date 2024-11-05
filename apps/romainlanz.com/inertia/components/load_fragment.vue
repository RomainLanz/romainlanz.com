<script lang="ts" setup>
	import { resolvePageComponent } from '@adonisjs/inertia/helpers';
	import { markRaw, onMounted, ref } from 'vue';

	const { source } = defineProps<{
		source: string;
	}>();

	const component = ref<any>(null);

	onMounted(async () => {
		const response = await fetch(source, {
			headers: {
				'X-Inertia': 'true',
				'X-Inertia-Fragment': 'true',
			},
		}).then((r) => r.json());

		component.value = await resolvePageComponent(
			`../fragments/${response.component}.vue`,
			import.meta.glob('../fragments/**/*.vue')
		).then((c: any) => markRaw(c.default));
	});
</script>

<template>
	<div v-if="component === null">
		<slot name="fallback" />
	</div>

	<Component :is="component" v-else />
</template>
