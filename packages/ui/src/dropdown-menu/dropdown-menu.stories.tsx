import { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from ".";

export default {
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;

type Story = StoryObj<typeof DropdownMenu>;

const onClick = () => console.log("onClick");

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <DropdownMenu
        label="DropdownMenu"
        items={[
          { content: "Item1", subLabel: "subLabel" },
          { content: "Item2" },
          { content: "Item3" },
        ]}
      />
    </div>
  ),
};

export const Short: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <DropdownMenu
        label="DropdownMenu"
        variant="short"
        items={[
          { content: "Item1", subLabel: "subLabel", onClick },
          { content: "Item2" },
          { content: "Item3" },
        ]}
      />
    </div>
  ),
};
