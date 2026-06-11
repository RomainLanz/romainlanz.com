import { preview } from '../../../.storybook/preview';
import Codeblock from './codeblock.vue';

const meta = preview.meta({
	component: Codeblock,
	title: 'Atoms/Codeblock',
	args: {
		tabs: ['App.jsx', 'setup.ts'],
	},
	render: (args) => ({
		components: {
			Codeblock,
		},
		setup: () => ({ args }),
		template: `
      <Codeblock v-bind="args">
        <template #App.jsx>
          <pre><code class="language-jsx">const a = 1;</code></pre>
        </template>
        <template #setup.ts>
          <pre><code class="language-ts">const b = 1;</code></pre>
        </template>
      </Codeblock>
    `,
	}),
});

export default meta;

export const Base = meta.story();
