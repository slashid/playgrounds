import { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from ".";

export default {
  component: Collapsible,
} satisfies Meta<typeof Collapsible>;

type Story = StoryObj<typeof Collapsible>;

export const Horizontal: Story = {
  render: () => (
    <Collapsible
      variant="horizontal"
      content={<div>Collapsible content</div>}
    />
  ),
};

export const Vertical: Story = {
  render: () => (
    <Collapsible variant="vertical" content={<div>Collapsible content</div>} />
  ),
};
