import { Chat, Panel, Text } from "@slashid/ui";
import { panel } from "./style.css";

const WelcomePanel = () => {
  return (
    <Panel
      className={panel}
      title="Welcome"
      icon={<Chat />}
      content={
        <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
          Please, sign in to start the demo. <br />
          If you don’t have an account, sign up. SlashID authentication only
          takes a few moments.
        </Text>
      }
    />
  );
};

export default WelcomePanel;
