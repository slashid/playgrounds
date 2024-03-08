import { Panel, Text, Chat } from "@slashid/ui";
import { panel } from "./style.css";

export const InviteACollaboratorPanel = () => {
  return (
    <Panel
      className={panel}
      title="Invite a collaborator"
      icon={<Chat />}
      content={
        <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
          Enter an email address and press 'Invite'.
          <br />
          <br />
          We'll send an invite email to your collaborator with a pre-authenticated link.
          <br />
          <br />
          Once they've followed the link, they're a member of this organization too!
        </Text>
      }
    />
  );
};
