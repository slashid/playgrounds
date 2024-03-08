import { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs } from ".";

export default {
  title: "Breadcrumbs",
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

type Story = StoryObj<typeof Breadcrumbs>;

export const Primary: Story = {
  name: "Breadcrumbs",
  render: () => (
    <Breadcrumbs
      breadcrumbs={[
        { name: "Breadcrumb1" },
        { name: "Breadcrumb2", disabled: true },
        { name: "Breadcrumb3" },
        { name: "Breadcrumb4" },
      ]}
    />
  ),
};
