<script lang="ts" setup>
	import { ref } from 'vue';

	const { tabs } = defineProps<{
		tabs: string[] | string;
	}>();

	const parsedTabs = Array.isArray(tabs)
		? tabs
		: tabs
				.replaceAll(`'`, '')
				.replaceAll('[', '')
				.replaceAll(']', '')
				.split(',')
				.map((tab: string) => tab.trim());
	const activeTab = ref(parsedTabs[0]);
</script>

<template>
	<div class="shadow-small block rounded-lg border-2 border-solid border-gray-800 bg-yellow-100 font-mono">
		<header class="flex justify-between overflow-hidden rounded-t-lg bg-yellow-300">
			<div>
				<button
					v-for="tab in parsedTabs"
					:key="tab"
					class="mt-[-2px] cursor-pointer rounded-tr-lg border-2 border-solid border-transparent border-t-gray-800 border-r-gray-800 px-4 py-2 text-sm font-bold transition-colors hover:bg-yellow-100"
					:class="{
						'border-b-gray-800 bg-yellow-300': activeTab !== tab,
						'border-b-yellow-100 bg-yellow-100': activeTab === tab,
					}"
					type="button"
					@click="activeTab = tab"
				>
					{{ tab }}
				</button>
			</div>

			<div class="flex grow items-center justify-end gap-2 border-b-2 border-solid border-gray-800 px-5">
				<div class="size-3 rounded-full border-2 border-solid border-gray-800 bg-cyan-300"></div>
				<div class="size-3 rounded-full border-2 border-solid border-gray-800 bg-yellow-300"></div>
				<div class="size-3 rounded-full border-2 border-solid border-gray-800 bg-red-300"></div>
			</div>
		</header>

		<template v-for="tab in parsedTabs" :key="tab">
			<div v-show="activeTab === tab">
				<slot :name="tab" />
			</div>
		</template>
	</div>
</template>
