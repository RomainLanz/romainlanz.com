<script lang="ts" setup>
	import { FieldRoot, FieldLabel, FieldInput, FieldHelperText, FieldErrorText, FieldInputProps } from '@ark-ui/vue';
	import { computed } from 'vue';

	const model = defineModel<any>();

	const { errorMessage, type = 'text' } = defineProps<{
		label?: string;
		type?: FieldInputProps['type'];
		errorMessage?: string;
		helpMessage?: string;
	}>();

	const isInvalid = computed(() => typeof errorMessage !== 'undefined');
</script>

<template>
	<FieldRoot class="flex flex-col gap-1" :invalid="isInvalid">
		<FieldLabel v-if="label" class="text-gray-800">
			{{ label }}
		</FieldLabel>

		<FieldInput
			v-model="model"
			class="border-2 border-solid border-gray-800 rounded-lg bg-transparent px-4 py-2 disabled:cursor-not-allowed placeholder:text-gray-600 placeholder:font-bold"
			:type
		/>

		<FieldErrorText class="text-red-500 text-sm uppercase">
			{{ errorMessage }}
		</FieldErrorText>

		<FieldHelperText v-if="!errorMessage" class="text-cyan-500 text-sm">
			{{ helpMessage }}
		</FieldHelperText>
	</FieldRoot>
</template>
