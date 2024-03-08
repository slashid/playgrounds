import { Panel, Text, Chat } from "@slashid/ui";
import { panel } from "./style.css";

export const CreateAnOrgPanel = () => {
  return (
    <Panel
      className={panel}
      title="Create a new organization"
      icon={<Chat />}
      content={
        <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
          To create another organization click the "Create new organization"
          button.
          <br />
          <br />
          You are an administrator of any organization you create.
        </Text>
      }
    />
  );
};
