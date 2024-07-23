import Icon, { IconName } from "./icon.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  component: Icon,
  title: "Atoms/Icon",
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  argTypes: {
    name: {
      options: IconName,
    },
  },
  args: {
    name: "close",
  },
};
