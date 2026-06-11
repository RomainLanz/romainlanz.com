<script lang="ts" setup>
	import {
		CheckboxRoot,
		CheckboxLabel,
		CheckboxControl,
		CheckboxIndicator,
		CheckboxHiddenInput,
		type CheckboxCheckedState,
	} from '@ark-ui/vue/checkbox';
	import Icon from '../../atoms/icon/icon.vue';

	defineProps<{
		label?: string;
	}>();

	const model = defineModel<CheckboxCheckedState>();
</script>

<template>
	<CheckboxRoot v-model:checked="model" class="flex cursor-pointer items-center gap-2">
		<CheckboxControl
			class="rounded-ms flex size-[20px] items-center justify-center border-2 border-solid border-gray-800 bg-yellow-100 hover:bg-yellow-300"
		>
			<CheckboxIndicator>
				<Icon name="success" />
			</CheckboxIndicator>
		</CheckboxControl>

		<CheckboxHiddenInput />

		<CheckboxLabel v-if="label">{{ label }}</CheckboxLabel>
	</CheckboxRoot>
</template>
