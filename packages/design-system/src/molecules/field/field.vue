<script lang="ts" setup>
	import {
		FieldRoot,
		FieldLabel,
		FieldInput,
		FieldTextarea,
		FieldHelperText,
		FieldErrorText,
		FieldInputProps,
	} from '@ark-ui/vue/field';
	import { computed } from 'vue';

	const model = defineModel<any>();

	const { errorMessage, type = 'text' } = defineProps<{
		label?: string;
		type?: FieldInputProps['type'] | 'textarea';
		errorMessage?: string;
		helpMessage?: string;
	}>();

	const inputComponent = computed(() => (type === 'textarea' ? FieldTextarea : FieldInput));
	const invalid = computed(() => typeof errorMessage !== 'undefined');
</script>

<template>
	<FieldRoot class="flex flex-col gap-1" :invalid>
		<FieldLabel v-if="label" class="text-gray-800">
			{{ label }}
		</FieldLabel>

		<Component
			:is="inputComponent"
			v-bind="$attrs"
			v-model="model"
			class="border-2 border-solid border-gray-800 resize-y rounded-lg bg-transparent px-4 py-2 disabled:cursor-not-allowed placeholder:text-gray-600 placeholder:font-bold"
			:autoresize="true"
			:type
		/>

		<FieldErrorText class="text-red-500 text-sm uppercase">
			{{ errorMessage }}
		</FieldErrorText>

		<FieldHelperText v-if="!errorMessage && helpMessage" class="text-cyan-500 text-sm">
			{{ helpMessage }}
		</FieldHelperText>
	</FieldRoot>
</template>
