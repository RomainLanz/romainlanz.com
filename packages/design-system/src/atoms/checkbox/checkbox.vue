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
	<CheckboxRoot v-model:checked="model" class="flex items-center gap-2 cursor-pointer">
		<CheckboxControl
			class="flex items-center justify-center bg-yellow-100 hover:bg-yellow-300 rounded-ms border-2 border-solid border-gray-800 size-[20px]"
		>
			<CheckboxIndicator>
				<Icon name="success" />
			</CheckboxIndicator>
		</CheckboxControl>

		<CheckboxHiddenInput />

		<CheckboxLabel v-if="label">{{ label }}</CheckboxLabel>
	</CheckboxRoot>
</template>
