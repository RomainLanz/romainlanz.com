<script lang="ts" setup>
	import { computed, onBeforeUnmount, ref, watch } from 'vue';

	const props = defineProps<{
		title: string;
		summary: string;
	}>();

	const debouncedUrl = ref('');
	let timeout: ReturnType<typeof setTimeout> | undefined;

	const previewUrl = computed(() => {
		if (!props.title.trim() && !props.summary.trim()) {
			return '';
		}

		const search = new URLSearchParams({
			title: props.title || 'Titre de l’article',
			subtitle: props.summary || 'Résumé de l’article',
		});

		return `/admin/og/preview?${search.toString()}`;
	});

	watch(
		previewUrl,
		(url) => {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				debouncedUrl.value = url;
			}, 400);
		},
		{ immediate: true },
	);

	onBeforeUnmount(() => {
		clearTimeout(timeout);
	});
</script>

<template>
	<section class="flex flex-col gap-2">
		<h2 class="text-sm font-semibold text-slate-900">Aperçu OG</h2>

		<div class="aspect-[1200/630] overflow-hidden rounded border border-slate-200 bg-slate-50">
			<img v-if="debouncedUrl" class="size-full object-cover" :src="debouncedUrl" alt="" />
		</div>
	</section>
</template>
