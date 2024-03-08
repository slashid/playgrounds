import { User, Panel, Text } from "@slashid/ui";
import { panel } from "./style.css";

export const PersonalOrgPanel = () => {
  return (
    <Panel
      className={panel}
      title="Your personal organization"
      icon={<User />}
      content={
        <>
          <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
            This organization is yours and the contents are available only to
            you.
            <br />
            <br />
            Try creating another organization to collaborate with others.
          </Text>
        </>
      }
    />
  );
};
