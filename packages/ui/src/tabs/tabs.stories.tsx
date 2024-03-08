import { Meta, StoryObj } from "@storybook/react";

import { Tabs } from ".";

export default {
  title: "Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  name: "Tabs",
  render: () => (
    <Tabs
      tabs={[
        { id: "Tab1", title: "Tab1", content: <div>tab1</div> },
        { id: "Tab2", title: "Tab2", content: <div>tab2</div> },
        { id: "Tab3", title: "Tab3", content: <div>tab3</div> },
      ]}
    />
  ),
};
