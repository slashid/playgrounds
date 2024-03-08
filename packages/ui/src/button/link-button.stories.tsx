import { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "./link-button";

export default {
  component: LinkButton,
} satisfies Meta<typeof LinkButton>;

type Story = StoryObj<typeof LinkButton>;

const onClick = () => console.log("I clicked!");

export const Base: Story = {
  render: () => (
    <LinkButton variant="base" onClick={onClick}>
      Button
    </LinkButton>
  ),
};

export const Back: Story = {
  render: () => (
    <LinkButton variant="back" onClick={onClick}>
      Button
    </LinkButton>
  ),
};
