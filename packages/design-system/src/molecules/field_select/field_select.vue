<script lang="ts">
	export interface FieldSelectItem {
		label: string;
		value: string | number;
		disabled?: boolean;
	}
</script>

<script lang="ts" setup>
	import { computed } from 'vue';
	import {
		createListCollection,
		SelectRoot,
		SelectLabel,
		SelectControl,
		SelectTrigger,
		SelectValueText,
		SelectIndicator,
		SelectPositioner,
		SelectContent,
		SelectItemGroup,
		SelectItem,
		SelectItemText,
		SelectItemIndicator,
		SelectHiddenSelect,
	} from '@ark-ui/vue/select';
	import { FieldErrorText, FieldHelperText, FieldRoot } from '@ark-ui/vue/field';
	import Icon from '../../atoms/icon/icon.vue';
	import ClientOnly from '../../atoms/client_only/client_only.ts';

	const model = defineModel<any>();

	const { errorMessage, items } = defineProps<{
		label?: string;
		items: FieldSelectItem[];
		placeholder?: string;
		errorMessage?: string;
		helpMessage?: string;
	}>();

	const collection = createListCollection({
		items,
	});

	const invalid = computed(() => typeof errorMessage !== 'undefined');
</script>

<template>
	<FieldRoot class="flex flex-col gap-1" :invalid>
		<SelectRoot v-model="model" :collection="collection">
			<SelectLabel v-if="label" class="text-gray-800">
				{{ label }}
			</SelectLabel>

			<SelectControl>
				<SelectTrigger
					class="flex items-center w-full gap-2 border-2 border-solid border-gray-800 transition-colors rounded-lg bg-transparent px-4 py-2 disabled:cursor-not-allowed placeholder:text-gray-600 placeholder:font-bold hover:bg-yellow-100 cursor-pointer"
					:class="{
						'justify-between': placeholder,
						'justify-end': !placeholder,
					}"
				>
					<SelectValueText :placeholder></SelectValueText>
					<SelectIndicator>
						<Icon name="dropdown" />
					</SelectIndicator>
				</SelectTrigger>
			</SelectControl>

			<ClientOnly>
				<Teleport to="body">
					<SelectPositioner>
						<SelectContent class="bg-white min-w-48 rounded-lg p-2 border-2 border-solid border-gray-800 shadow-small">
							<SelectItemGroup>
								<SelectItem
									v-for="item in collection.items"
									class="cursor-pointer flex items-center justify-between px-2 py-0.5 rounded-ms hover:bg-yellow-300 transition-colors duration-200"
									:key="item.value"
									:item="item"
								>
									<SelectItemText>{{ item.label }}</SelectItemText>
									<SelectItemIndicator>
										<Icon name="success" />
									</SelectItemIndicator>
								</SelectItem>
							</SelectItemGroup>
						</SelectContent>
					</SelectPositioner>
				</Teleport>
			</ClientOnly>

			<SelectHiddenSelect />
		</SelectRoot>

		<FieldErrorText class="text-red-500 text-sm uppercase">
			{{ errorMessage }}
		</FieldErrorText>

		<FieldHelperText v-if="!errorMessage" class="text-cyan-500 text-sm">
			{{ helpMessage }}
		</FieldHelperText>
	</FieldRoot>
</template>
