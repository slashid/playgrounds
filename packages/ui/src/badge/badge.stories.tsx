import { Meta, StoryObj } from "@storybook/react";
import { Badge } from ".";

export default {
  component: Badge,
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

export const ShortActive: Story = {
  render: () => <Badge>{1}</Badge>,
};

export const ShortInactive: Story = {
  render: () => <Badge variant={{ state: "inactive" }}>label</Badge>,
};

export const LongActive: Story = {
  render: () => (
    <Badge variant={{ size: "long", state: "active" }}>label</Badge>
  ),
};

export const LongInactive: Story = {
  render: () => (
    <Badge variant={{ size: "long", state: "inactive" }}>label</Badge>
  ),
};
