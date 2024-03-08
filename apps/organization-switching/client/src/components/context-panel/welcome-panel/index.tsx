import { Chat, Panel, Text } from "@slashid/ui";
import { panel } from "./style.css";

export const WelcomePanel = () => {
  return (
    <Panel
      className={panel}
      title="Welcome"
      icon={<Chat />}
      content={
        <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
          Please sign in to start the demo.
          <br />
          <br />
          If you don’t have an account, you can sign up by simply completing the form. SlashID authentication only
          takes a few moments.
        </Text>
      }
    />
  );
};
