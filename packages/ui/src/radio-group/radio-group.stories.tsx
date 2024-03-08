import { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from ".";
import { useState } from "react";

export default {
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

const ControlledRadioGroup = () => {
  const [value, setValue] = useState("");

  const onValueChange = (val: string) => {
    setValue(val);
    console.log(value);
  };

  return (
    <div style={{ maxWidth: 300 }}>
      <RadioGroup
        onValueChange={onValueChange}
        value={value}
        items={[
          {
            id: "item1",
            content: (
              <div>
                <input type="radio" id="item1" checked={value === "item1"} />
                <label htmlFor="item1">item1</label>
              </div>
            ),
          },
          {
            id: "item2",
            content: (
              <div>
                <input type="radio" id="item2" checked={value === "item2"} />
                <label htmlFor="item2">item2</label>
              </div>
            ),
          },
          {
            id: "item3",
            content: (
              <div>
                <input type="radio" id="item3" checked={value === "item3"} />
                <label htmlFor="item3">item3</label>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export const Primary: Story = {
  render: () => <ControlledRadioGroup />,
};
