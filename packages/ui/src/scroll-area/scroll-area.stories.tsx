import { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from ".";
import { publicVariables } from "../theme/theme.css";

export default {
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>;

type Story = StoryObj<typeof ScrollArea>;

export const Primary: Story = {
  render: () => (
    <div
      style={{
        width: "300px",
        height: "300px",
        borderRadius: "15px",
        padding: "20px 0 20px 20px",
        backgroundColor: publicVariables.color.placeholder,
      }}
    >
      <ScrollArea>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          ducimus praesentium cupiditate architecto ratione, maxime eaque? Sunt
          rerum dolorum natus consectetur magni eius consequatur necessitatibus
          temporibus, voluptatem, exercitationem vero id?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          ducimus praesentium cupiditate architecto ratione, maxime eaque? Sunt
          rerum dolorum natus consectetur magni eius consequatur necessitatibus
          temporibus, voluptatem, exercitationem vero id?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          ducimus praesentium cupiditate architecto ratione, maxime eaque? Sunt
          rerum dolorum natus consectetur magni eius consequatur necessitatibus
          temporibus, voluptatem, exercitationem vero id?
        </div>
      </ScrollArea>
    </div>
  ),
};
