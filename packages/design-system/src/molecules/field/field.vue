<script lang="ts" setup>
	import { FieldRoot, FieldLabel, FieldInput, FieldHelperText, FieldErrorText } from '@ark-ui/vue';

	defineProps<{
		label?: string;
		errorMessage?: string;
		helpMessage?: string;
	}>();
</script>

<template>
	<FieldRoot class="flex flex-col gap-1" :invalid="typeof errorMessage !== 'undefined'">
		<FieldLabel v-if="label" class="text-gray-800">
			{{ label }}
		</FieldLabel>

		<FieldInput
			class="border-2 border-solid border-gray-800 rounded-lg bg-transparent px-4 py-2 disabled:cursor-not-allowd placeholder:text-gray-600 placeholder:font-bold"
		/>

		<FieldErrorText class="text-red-500 text-sm uppercase">
			{{ errorMessage }}
		</FieldErrorText>

		<FieldHelperText v-if="!errorMessage" class="text-cyan-500 text-sm">
			{{ helpMessage }}
		</FieldHelperText>
	</FieldRoot>
</template>
