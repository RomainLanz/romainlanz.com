<script lang="ts" setup>
	import { FieldRoot, FieldLabel, FieldInput, FieldTextarea, FieldHelperText, FieldErrorText } from '@ark-ui/vue/field';
	import { computed } from 'vue';
	import type { FieldInputProps } from '@ark-ui/vue/field';

	const { errorMessage, type = 'text' } = defineProps<{
		label?: string;
		type?: FieldInputProps['type'] | 'textarea';
		errorMessage?: string;
		helpMessage?: string;
	}>();

	const model = defineModel<any>();

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
			class="resize-y border-2 border-gray-800 rounded-lg border-solid bg-transparent px-4 py-2 disabled:cursor-not-allowed placeholder:text-gray-600 placeholder:font-bold"
			:autoresize="true"
			:type
		/>

		<FieldErrorText class="text-sm text-red-500 uppercase">
			{{ errorMessage }}
		</FieldErrorText>

		<FieldHelperText v-if="!errorMessage && helpMessage" class="text-sm text-cyan-500">
			{{ helpMessage }}
		</FieldHelperText>
	</FieldRoot>
</template>
