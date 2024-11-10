import { julr } from '@julr/tooling-configs/eslint';

export default julr(
	{
		typescript: {
			tsconfigPath: ['./tsconfig.json', './inertia/tsconfig.json'],
		},
	},
	{
		rules: {
			'perfectionist/sort-imports': [
				'error',
				{
					'groups': ['side-effect', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
					'internal-pattern': ['#**/*', '~/**/*'],
					'newlines-between': 'never',
					'order': 'asc',
					'type': 'alphabetical',
				},
			],
		},
	}
);
