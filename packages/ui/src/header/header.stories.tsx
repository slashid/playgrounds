import { Meta, StoryObj } from "@storybook/react";

import { Header } from "./header";

export default {
  component: Header,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  name: "Header",
  render: () => <Header logo={<p>logo</p>} />,
};
