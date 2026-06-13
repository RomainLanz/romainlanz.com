<script lang="ts" setup>
	import { FieldErrorText, FieldLabel, FieldRoot } from '@ark-ui/vue/field';
	import rehypeRaw from 'rehype-raw';
	import rehypeStringify from 'rehype-stringify';
	import remarkGfm from 'remark-gfm';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import { unified } from 'unified';
	import { computed, ref } from 'vue';

	const { errorMessage, label } = defineProps<{
		errorMessage?: string;
		label: string;
	}>();

	const model = defineModel<string>({ required: true });
	const activePanel = ref<'write' | 'preview'>('write');

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeStringify);

	const preview = computed(() => {
		if (!model.value.trim()) {
			return { html: '', error: null };
		}

		try {
			return { html: String(processor.processSync(model.value)), error: null };
		} catch {
			return { html: '', error: "L'aperçu n'a pas pu être généré." };
		}
	});

	const invalid = computed(() => typeof errorMessage !== 'undefined');
</script>

<template>
	<FieldRoot class="flex flex-col gap-2" :invalid>
		<div class="flex flex-wrap items-center justify-between gap-3">
			<FieldLabel class="text-gray-800">
				{{ label }}
			</FieldLabel>

			<div class="grid grid-cols-2 overflow-hidden rounded-lg border-2 border-solid border-gray-800 lg:hidden">
				<button
					class="px-4 py-2 text-sm font-bold transition-colors"
					:class="activePanel === 'write' ? 'bg-yellow-300 text-yellow-900' : 'bg-white text-gray-700'"
					type="button"
					@click="activePanel = 'write'"
				>
					Markdown
				</button>
				<button
					class="border-0 border-l-2 border-solid border-gray-800 px-4 py-2 text-sm font-bold transition-colors"
					:class="activePanel === 'preview' ? 'bg-yellow-300 text-yellow-900' : 'bg-white text-gray-700'"
					type="button"
					@click="activePanel = 'preview'"
				>
					Aperçu
				</button>
			</div>
		</div>

		<div
			class="grid min-h-[44rem] overflow-hidden rounded-lg border-2 border-solid border-gray-800 bg-white lg:grid-cols-2"
		>
			<div class="flex min-h-[44rem] flex-col" :class="{ 'hidden lg:flex': activePanel !== 'write' }">
				<div
					class="hidden border-0 border-b-2 border-solid border-gray-800 bg-yellow-100 px-4 py-2 text-sm font-bold lg:block"
				>
					Markdown
				</div>

				<textarea
					v-model="model"
					:aria-label="label"
					class="bg-off-white min-h-[44rem] flex-1 resize-y px-4 py-3 font-mono text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-500 focus:bg-white"
					:class="{ 'bg-red-100': invalid }"
					spellcheck="false"
				></textarea>
			</div>

			<div
				class="min-h-[44rem] border-0 border-solid border-gray-800 bg-white lg:border-l-2"
				:class="{ 'hidden lg:block': activePanel !== 'preview' }"
			>
				<div
					class="hidden border-0 border-b-2 border-solid border-gray-800 bg-yellow-100 px-4 py-2 text-sm font-bold lg:block"
				>
					Aperçu
				</div>

				<div v-if="preview.html" :class="$style.content" v-html="preview.html"></div>
				<div v-else-if="preview.error" class="px-4 py-3 text-red-500">{{ preview.error }}</div>
				<div v-else class="px-4 py-3 text-gray-500">Aperçu vide</div>
			</div>
		</div>

		<FieldErrorText class="text-sm text-red-500 uppercase">
			{{ errorMessage }}
		</FieldErrorText>
	</FieldRoot>
</template>

<style module>
	.content {
		font-size: 1rem;
		line-height: 1.625rem;
		max-height: 44rem;
		overflow: auto;
		padding: 0.75rem 1rem;
	}

	.content > * {
		margin-block: 1rem;
	}

	.content a {
		cursor: pointer;
		text-decoration: underline;
	}

	.content pre {
		background-color: var(--color-yellow-100);
		border: 2px solid var(--color-gray-800);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-small);
		font-size: 0.875rem;
		overflow: auto;
		padding: 1rem 1.5rem;
	}

	.content blockquote {
		border-left: 0.25rem solid var(--color-yellow-400);
		color: var(--color-gray-500);
		padding-left: 1rem;
	}

	.content li code,
	.content p code {
		background-color: var(--color-yellow-400);
		border-radius: 0.25rem;
		color: var(--color-yellow-900);
		display: inline-block;
		font-size: 0.925rem;
		padding: 0 0.25rem;
	}

	.content ul,
	.content ol {
		padding-left: 1.5rem;
	}

	.content ul {
		list-style: disc;
	}

	.content ol {
		list-style: decimal;
	}

	.content h2 {
		font-size: 2rem;
		margin-top: 2rem;
	}

	.content h3 {
		font-size: 1.5rem;
		margin-top: 1.5rem;
	}

	.content h4 {
		font-size: 1.25rem;
		margin-top: 1.25rem;
	}
</style>
