import { defineConfig } from 'oxlint';

export default defineConfig({
	ignorePatterns: ['apps/romainlanz.com/.adonisjs/**', 'apps/romainlanz.com/types/db.ts'],
	plugins: ['typescript', 'vue'],
	rules: {
		'typescript/no-namespace': 'off',
	},
	overrides: [
		{
			files: ['apps/romainlanz.com/src/**/*.{ts,tsx}'],
			rules: {
				'no-restricted-imports': [
					'error',
					{
						patterns: [
							{
								regex: '^#(?:app|admin|pages|middleware|transformers)/',
								message: 'Application code under src must not depend on the app delivery layer.',
							},
							{
								regex: '^\\.\\./(?:\\.\\./)*app(?:/|$)',
								message: 'Application code under src must not depend on the app delivery layer.',
							},
						],
					},
				],
			},
		},
	],
});
