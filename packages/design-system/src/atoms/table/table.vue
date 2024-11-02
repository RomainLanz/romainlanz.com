<script lang="ts">
	export interface Header {
		label: string;
		key: string;
		cell?: string;
		align?: 'left' | 'center' | 'right';
	}

	export interface Item {
		id: string;
		[key: string]: string | number | boolean;
	}
</script>

<script lang="ts" setup>
	defineProps<{
		headers: Header[];
		items: Item[];
	}>();
</script>

<template>
	<div class="border-2 border-gray-800 rounded-lg border-solid">
		<table class="w-full overflow-hidden shadow-sm border-none border-collapse rounded-lg border-spacing-none">
			<thead class="bg-white border-none">
				<tr>
					<th
						class="border-collapse border-1 border-solid border-gray-800 text-base px-4 py-3"
						v-for="header in headers"
						:key="header.key"
					>
						{{ header.label }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in items" :key="item.id">
					<td
						class="border-collapse border-1 border-solid border-gray-800 text-base px-4 py-3"
						v-for="header in headers"
						:key="header.key"
					>
						<template v-if="header.cell">
							<slot :name="header.cell" :item="item" />
						</template>
						<template v-else>
							{{ item[header.key] }}
						</template>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
