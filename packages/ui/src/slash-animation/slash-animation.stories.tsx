import { Meta, StoryObj } from "@storybook/react";
import { SlashAnimation } from ".";

export default {
  component: SlashAnimation,
} satisfies Meta<typeof SlashAnimation>;

type Story = StoryObj<typeof SlashAnimation>;

export const Default: Story = {
  render: () => <SlashAnimation title={"Get your Slash style"} />,
};

export const H1: Story = {
  render: () => <SlashAnimation as="h1" title={"Get your Slash style"} />,
};
