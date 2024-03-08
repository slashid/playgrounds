import { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./stack";

export default {
  component: Stack,
} satisfies Meta<typeof Stack>;

type Story = StoryObj<typeof Stack>;

export const Primary: Story = {
  name: "Stack",
  render: () => <Stack>Stack</Stack>,
};
