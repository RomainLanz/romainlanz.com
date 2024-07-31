import type { Meta, StoryObj } from "@storybook/vue3";
import Tag from "./tag.vue";

const meta = {
  component: Tag,
  title: "Atoms/Tag",
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  argTypes: {
    color: {
      options: ["cyan", "violet", "red", "yellow", "lime"],
    },
    default: {
      type: "string",
    },
  },
  args: {
    default: "Database",
  },
};

export const Link: Story = {
  argTypes: Base.argTypes,
  args: {
    ...Base.args,
    href: "https://romainlanz.com",
  },
};
