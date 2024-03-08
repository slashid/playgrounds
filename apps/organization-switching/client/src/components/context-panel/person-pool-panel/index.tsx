import { User, ExternalLink, Panel, Text } from "@slashid/ui";
import { panel } from "./style.css";

export const PersonPoolPanel = () => {
  return (
    <Panel
      className={panel}
      title="Shared person pool"
      icon={<User />}
      content={
        <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
          This organization shares a{" "}
          <ExternalLink href="https://developer.slashid.dev/docs/access/concepts/suborgs#person-pools-and-group-pools">
            <Text
              as="span"
              variant={{ size: "sm", weight: "semibold", color: "contrast" }}
            >
              Person Pool
            </Text>
          </ExternalLink>{" "}
          with the root organization:
          <br />
          <br />
          "SlashID Organization Switching Demo"
          <br />
          <br />
          That means anyone who signs up to this demo can be invited here.
        </Text>
      }
    />
  );
};
