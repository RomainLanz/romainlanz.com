import Button from "./button.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  argTypes: {
    color: {
      options: ["cyan", "violet", "red", "yellow", "lime"],
    },
    size: {
      options: ["small", "medium"],
    },
    default: {
      type: "string",
    },
  },
  args: {
    default: "Click me",
  },
};

export const Link: Story = {
  argTypes: Base.argTypes,
  args: {
    ...Base.args,
    href: "https://romainlanz.com",
  },
};
