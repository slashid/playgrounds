import { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

export default {
  component: Spinner,
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  name: "Spinner",
  render: () => <Spinner />,
};
