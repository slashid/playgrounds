import { Meta, StoryObj } from "@storybook/react";
import { ExternalLink } from ".";

export default {
  component: ExternalLink,
} satisfies Meta<typeof ExternalLink>;

type Story = StoryObj<typeof ExternalLink>;

export const Default: Story = {
  render: () => (
    <ExternalLink href="https://developer.slashid.dev/docs">docs</ExternalLink>
  ),
};
