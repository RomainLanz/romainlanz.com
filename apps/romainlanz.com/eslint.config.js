import { julr } from '@julr/tooling-configs/eslint';

export default julr({
	typescript: {
		tsconfigPath: ['./tsconfig.json', './inertia/tsconfig.json'],
	},
});
