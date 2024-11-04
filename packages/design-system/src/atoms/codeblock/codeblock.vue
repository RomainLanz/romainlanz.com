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
	<div class="font-mono block bg-yellow-100 border-2 border-solid border-gray-800 shadow-small rounded-lg">
		<header class="bg-yellow-300 rounded-t-lg flex justify-between overflow-hidden">
			<div>
				<button
					class="border-2 border-solid border-transparent border-t-gray-800 border-r-gray-800 rounded-tr-lg text-sm font-bold cursor-pointer mt-[-2px] px-4 py-2 transition-colors hover:bg-yellow-100"
					:class="{
						'bg-yellow-300 border-b-gray-800': activeTab !== tab,
						'bg-yellow-100 border-b-yellow-100': activeTab === tab,
					}"
					v-for="tab in parsedTabs"
					:key="tab"
					@click="activeTab = tab"
				>
					{{ tab }}
				</button>
			</div>

			<div class="flex items-center justify-end gap-2 border-b-2 border-b-solid border-gray-800 grow px-5">
				<div class="rounded-full border-2 border-solid border-gray-800 size-3 bg-cyan-300"></div>
				<div class="rounded-full border-2 border-solid border-gray-800 size-3 bg-yellow-300"></div>
				<div class="rounded-full border-2 border-solid border-gray-800 size-3 bg-red-300"></div>
			</div>
		</header>

		<template v-for="tab in parsedTabs" :key="tab">
			<div v-show="activeTab === tab">
				<slot :name="tab" />
			</div>
		</template>
	</div>
</template>
