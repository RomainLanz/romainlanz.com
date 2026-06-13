<script lang="ts" setup>
	defineProps<{
		html: string;
		preview?: boolean;
	}>();
</script>

<template>
	<div :class="[$style.content, { [$style.preview]: preview }]" v-html="html"></div>
</template>

<style module>
	.content {
		& > * {
			margin-block: 1rem;
		}

		& a {
			cursor: pointer;
			text-decoration: underline;
		}

		& pre {
			font-size: 0.875rem;
			overflow-y: auto;
			padding: 1rem 1.5rem;
		}

		& :global(.shiki.has-focused .line:not(.focused)) {
			filter: blur(0.095rem);
			opacity: 0.7;
			transition:
				filter 0.35s,
				opacity 0.35s;
		}

		& :global(.shiki.has-focused:hover .line:not(.focused)) {
			filter: blur(0);
			opacity: 1;
		}

		& :global(.shiki.has-diff .diff) {
			display: inline-block;
			margin: 0 -24px;
			padding: 0 24px;
			transition: background-color 0.5s;
			width: calc(100% + 48px);

			:global(&.add) {
				background-color: var(--color-lime-300) !important;
				--shiki-dark-bg: transparent;
			}

			:global(&.remove) {
				background-color: var(--color-red-300) !important;
				--shiki-dark-bg: transparent;
				opacity: 0.7;
			}

			@media (prefers-color-scheme: dark) {
				:global(&.add) {
					background-color: var(--color-lime-800) !important;
				}

				:global(&.remove) {
					background-color: var(--color-red-800) !important;
				}
			}
		}

		& > pre {
			background-color: var(--color-yellow-100);
			border: 2px solid var(--color-gray-800);
			border-radius: var(--radius-lg);
			box-shadow: var(--shadow-small);
			margin-bottom: 1.5rem;
			margin-top: 1rem;
		}

		& > blockquote {
			background-color: var(--color-yellow-100);
			border: 2px solid var(--color-gray-800);
			border-radius: var(--radius-lg);
			box-shadow: var(--shadow-small);
			color: var(--color-gray-800);
			font-size: 1.05em;
			font-style: italic;
			line-height: 1.7;
			margin-block: 2rem;
			padding: 2rem 1.5rem 1.25rem;
			position: relative;
		}

		& > blockquote::before {
			color: var(--color-yellow-700);
			content: '"';
			font-size: 3rem;
			font-weight: 700;
			left: 1rem;
			line-height: 1;
			position: absolute;
			top: 0.5rem;
		}

		& > blockquote > * {
			margin-block: 1rem;
		}

		& > blockquote > :first-child {
			margin-top: 0;
		}

		& > blockquote > :last-child {
			margin-bottom: 0;
		}

		li code,
		p code {
			background-color: var(--color-yellow-400);
			border-radius: 0.25rem;
			color: var(--color-yellow-900);
			display: inline-block;
			font-size: 1rem;
			padding: 0 0.25rem;
		}

		& > p img {
			margin-inline: auto;
		}

		& > h2 {
			font-size: 2.75rem;
			margin-top: 3.75rem;
			margin-bottom: 1.75rem;
		}

		& > h3 {
			font-size: 2.25rem;
			margin-top: 2.5rem;
			margin-bottom: 1.25rem;
		}

		& > h4 {
			font-size: 1.75rem;
			margin-top: 2rem;
			margin-bottom: 1rem;
		}
	}

	.preview {
		font-size: 1rem;
		line-height: 1.625rem;
		max-height: 44rem;
		overflow: auto;
		padding: 0.75rem 1rem;

		& pre {
			overflow: auto;
		}

		li code,
		p code {
			font-size: 0.925rem;
		}

		& ul,
		& ol {
			padding-left: 1.5rem;
		}

		& ul {
			list-style: disc;
		}

		& ol {
			list-style: decimal;
		}

		& > h2 {
			font-size: 2rem;
			margin-top: 2rem;
		}

		& > h3 {
			font-size: 1.5rem;
			margin-top: 1.5rem;
		}

		& > h4 {
			font-size: 1.25rem;
			margin-top: 1.25rem;
		}
	}
</style>
