<script lang="ts">
	export interface Header {
		label: string;
		key: string;
		cell?: string;
		width?: string;
		align?: 'left' | 'center' | 'right';
	}

	export interface Item {
		id: string;
		[key: string]: string | number | boolean;
	}
</script>

<script lang="ts" setup generic="T extends Item">
	defineProps<{
		headers: Header[];
		items: T[];
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
						:style="{ width: header.width, textAlign: header.align }"
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
						:style="{ width: header.width, textAlign: header.align }"
					>
						<template v-if="header.cell">
							<slot :name="header.cell" :item="item" :header="header" />
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
