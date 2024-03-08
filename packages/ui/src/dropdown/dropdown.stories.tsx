import { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from ".";

export default {
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

type Story = StoryObj<typeof Dropdown>;

const onChange = (value: string) => console.log(value);

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <Dropdown
        onChange={onChange}
        label="Dropdown"
        items={[
          { label: "Item1", value: "Item1" },
          { label: "Item2", value: "Item2" },
          { label: "Item3", value: "Item3" },
        ]}
        type="text"
      />
    </div>
  ),
};

export const Short: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <Dropdown
        onChange={onChange}
        variant="short"
        defaultValue="Item1"
        items={[
          { label: "Item1", subLabel: "Item1", value: "Item1" },
          { label: "Item2", value: "Item2" },
          { label: "Item3", value: "Item3" },
        ]}
        type="text"
      />
    </div>
  ),
};
