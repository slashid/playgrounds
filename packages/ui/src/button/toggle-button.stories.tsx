import { Meta, StoryObj } from "@storybook/react";
import { ToggleButton } from "./toggle-button";

export default {
  component: ToggleButton,
} satisfies Meta<typeof ToggleButton>;

type Story = StoryObj<typeof ToggleButton>;

export const Primary: Story = {
  render: () => <ToggleButton>S</ToggleButton>,
};
