import { Meta, StoryObj } from "@storybook/react";
import Panel from ".";
import { Chat } from "../icon/chat";
import { Text } from "../text";

export default {
  component: Panel,
} satisfies Meta<typeof Panel>;

type Story = StoryObj<typeof Panel>;

export const Base: Story = {
  render: () => (
    <Panel
      title="Welcome"
      icon={<Chat />}
      content={
        <Text variant={{ size: "sm", weight: "medium", color: "white" }}>
          Please, sign in to start the demo. <br />
          If you don’t have an account, sign up. SlashID authentication only
          takes a few moments.
        </Text>
      }
    />
  ),
};

export const Subtle: Story = {
  render: () => (
    <Panel
      variant={{ borderColor: "subtle", background: "soft" }}
      content={
        <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
          Try adding some items to cart by clicking on an item.
        </Text>
      }
    />
  ),
};
