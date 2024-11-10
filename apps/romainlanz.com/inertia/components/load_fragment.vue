<script lang="ts" setup>
	import { resolvePageComponent } from '@adonisjs/inertia/helpers';
	import { usePage } from '@inertiajs/vue3';
	import { markRaw, onMounted, ref } from 'vue';

	const { source } = defineProps<{
		source: string;
	}>();

	const assetVersion = usePage().version;
	const componentProps = ref<any>(null);
	const component = ref<any>(null);

	onMounted(async () => {
		const response = await fetch(source, {
			headers: {
				'X-Inertia': 'true',
				'X-Inertia-Fragment': 'true',
				'X-Inertia-Version': assetVersion,
			},
		}).then((r) => r.json());

		componentProps.value = response.props;
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

	<Component :is="component" v-bind="componentProps" v-else />
</template>
