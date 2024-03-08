import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Input } from ".";

export default {
  component: Input,
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

const ControlledInput = () => {
  const [val, setVal] = useState("");
  return (
    <Input
      id="test"
      name="test"
      label="Input"
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
};

export const Primary: Story = {
  render: () => <ControlledInput />,
};
