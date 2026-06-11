import { defineConfig } from 'oxlint';

export default defineConfig({
	ignorePatterns: ['apps/romainlanz.com/.adonisjs/**', 'apps/romainlanz.com/types/db.ts'],
	plugins: ['typescript', 'vue'],
	rules: {
		'typescript/no-namespace': 'off',
	},
});
