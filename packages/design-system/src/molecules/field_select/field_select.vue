<script lang="ts" setup>
	import { FieldErrorText, FieldHelperText, FieldRoot } from '@ark-ui/vue/field';
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
	import { computed } from 'vue';
	import ClientOnly from '../../atoms/client_only/client_only.ts';
	import Icon from '../../atoms/icon/icon.vue';

	export interface FieldSelectItem {
		label: string;
		value: string | number;
		disabled?: boolean;
	}

	const { errorMessage, items } = defineProps<{
		label?: string;
		items: FieldSelectItem[];
		placeholder?: string;
		errorMessage?: string;
		helpMessage?: string;
	}>();

	const model = defineModel<any>();

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
					class="w-full flex cursor-pointer items-center gap-2 border-2 border-gray-800 rounded-lg border-solid bg-transparent px-4 py-2 transition-colors disabled:cursor-not-allowed hover:bg-yellow-100 placeholder:text-gray-600 placeholder:font-bold"
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
						<SelectContent class="min-w-48 border-2 border-gray-800 rounded-lg border-solid bg-white p-2 shadow-small">
							<SelectItemGroup>
								<SelectItem
									v-for="item in collection.items"
									:key="item.value"
									class="flex cursor-pointer items-center justify-between rounded-ms px-2 py-0.5 transition-colors duration-200 hover:bg-yellow-300"
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

		<FieldErrorText class="text-sm text-red-500 uppercase">
			{{ errorMessage }}
		</FieldErrorText>

		<FieldHelperText v-if="!errorMessage" class="text-sm text-cyan-500">
			{{ helpMessage }}
		</FieldHelperText>
	</FieldRoot>
</template>
