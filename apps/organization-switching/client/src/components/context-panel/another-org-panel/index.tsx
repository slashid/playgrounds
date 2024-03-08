import { Panel, Text, CheckOnly } from "@slashid/ui";
import { checkIcon, panel } from "./style.css";

export const AnotherOrgPanel = () => {
  return (
    <Panel
      className={panel}
      title="Time to collaborate"
      icon={<CheckOnly className={checkIcon} />}
      content={
        <>
          <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
            You're viewing another organization.
          </Text>
        </>
      }
    />
  );
};
