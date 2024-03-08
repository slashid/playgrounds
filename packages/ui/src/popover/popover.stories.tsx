import { Meta, StoryObj } from "@storybook/react";
import { Popover } from ".";

export default {
  component: Popover,
} satisfies Meta<typeof Popover>;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover trigger={<button>Open</button>}>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex minus nam id
        sed temporibus repudiandae commodi dolore accusamus velit ab aperiam
        quam error corporis qui dolores voluptatem, illo asperiores impedit!
      </div>
    </Popover>
  ),
};
