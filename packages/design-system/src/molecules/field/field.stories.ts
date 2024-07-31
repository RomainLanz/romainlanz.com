import Field from "./field.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  component: Field,
  title: "Molecules/Field",
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  argTypes: {
    label: {
      type: "string",
    },
    errorMessage: {
      type: "string",
    },
    helpMessage: {
      type: "string",
    },
  },
};
