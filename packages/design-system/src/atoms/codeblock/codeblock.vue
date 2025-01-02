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
	<div class="block border-2 border-gray-800 rounded-lg border-solid bg-yellow-100 font-mono shadow-small">
		<header class="flex justify-between overflow-hidden rounded-t-lg bg-yellow-300">
			<div>
				<button
					v-for="tab in parsedTabs"
					:key="tab"
					class="mt-[-2px] cursor-pointer border-2 border-transparent border-r-gray-800 border-t-gray-800 rounded-tr-lg border-solid px-4 py-2 text-sm font-bold transition-colors hover:bg-yellow-100"
					:class="{
						'bg-yellow-300 border-b-gray-800': activeTab !== tab,
						'bg-yellow-100 border-b-yellow-100': activeTab === tab,
					}"
					@click="activeTab = tab"
				>
					{{ tab }}
				</button>
			</div>

			<div class="flex grow items-center justify-end gap-2 border-b-2 border-gray-800 border-b-solid px-5">
				<div class="size-3 border-2 border-gray-800 rounded-full border-solid bg-cyan-300"></div>
				<div class="size-3 border-2 border-gray-800 rounded-full border-solid bg-yellow-300"></div>
				<div class="size-3 border-2 border-gray-800 rounded-full border-solid bg-red-300"></div>
			</div>
		</header>

		<template v-for="tab in parsedTabs" :key="tab">
			<div v-show="activeTab === tab">
				<slot :name="tab" />
			</div>
		</template>
	</div>
</template>
