import { Meta, StoryObj } from "@storybook/react";
import { Divider } from ".";

export default {
  component: Divider,
} satisfies Meta<typeof Divider>;

type Story = StoryObj<typeof Divider>;

export const Primary: Story = {
  name: "Divider",
  render: () => <Divider>Divider</Divider>,
};
