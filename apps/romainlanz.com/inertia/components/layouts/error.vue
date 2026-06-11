<script lang="ts" setup>
	import ErrorCode from '@rlanz/design-system/error-code';

	defineProps<{
		title: string;
		description: string;
		errorCode: number;
	}>();
</script>

<template>
	<section class="m-auto my-[9.5rem] max-w-7xl px-4">
		<div class="flex gap-[7.25rem]">
			<div class="flex flex-col justify-center gap-6">
				<h1 class="text-4xl sm:text-6xl lg:text-5xl">{{ title }}</h1>

				<p>
					{{ description }}
				</p>

				<div class="flex gap-4">
					<slot name="actions" />
				</div>
			</div>

			<ErrorCode class="hidden shrink-0 basis-[404px] lg:block" :code="errorCode" />
		</div>
	</section>
</template>
