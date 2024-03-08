import { Meta, StoryObj } from "@storybook/react";

import { Form } from ".";

export default {
  title: "Form",
  component: Form,
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  name: "Form",
  render: () => (
    <Form
      fields={[
        {
          value: "value",
          name: "name",
          label: "label",
          type: "type",
          placeholder: "placeholder",
        },
      ]}
      submitButton={<button>Submit</button>}
    />
  ),
};
