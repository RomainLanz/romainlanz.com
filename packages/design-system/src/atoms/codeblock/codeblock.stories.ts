import Codeblock from './codeblock.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
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
} satisfies Meta<typeof Codeblock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
