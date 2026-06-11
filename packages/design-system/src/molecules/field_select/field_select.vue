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
					class="flex w-full cursor-pointer items-center gap-2 rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 transition-colors placeholder:font-bold placeholder:text-gray-600 hover:bg-yellow-100 disabled:cursor-not-allowed"
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
						<SelectContent class="shadow-small min-w-48 rounded-lg border-2 border-solid border-gray-800 bg-white p-2">
							<SelectItemGroup>
								<SelectItem
									v-for="item in collection.items"
									:key="item.value"
									class="rounded-ms flex cursor-pointer items-center justify-between px-2 py-0.5 transition-colors duration-200 hover:bg-yellow-300"
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
