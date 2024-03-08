import { Meta, StoryObj } from "@storybook/react";
import { Circle } from "./circle";

export default {
  component: Circle,
} satisfies Meta<typeof Circle>;

type Story = StoryObj<typeof Circle>;

export const Primary: Story = {
  name: "Circle",
  render: () => <Circle>Circle</Circle>,
};
