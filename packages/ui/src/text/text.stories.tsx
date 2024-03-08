import { Meta, StoryObj } from "@storybook/react";
import { Text } from ".";

export default {
  component: Text,
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  name: "Text",
  render: () => <Text>Text</Text>,
};
