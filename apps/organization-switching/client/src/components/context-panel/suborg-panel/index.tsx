import { ExternalLink, Panel, Text } from "@slashid/ui";
import { panel } from "./style.css";

export const SubOrgPanel = () => {
  return (
    <Panel
      className={panel}
      title="Suborganizations"
      // icon={<User />}
      content={
        <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
          You're signing in to the demo root organization:
          <br />
          <br />
          "SlashID Organization Switching Demo"
          <br />
          <br />
          Once sign in is complete a personal organization will be created for
          you and you'll land there.
          <br />
          <br />
          This is known as a{" "}
          <ExternalLink href="https://developer.slashid.dev/docs/access/concepts/suborgs">
            <Text
              as="span"
              variant={{ size: "sm", weight: "semibold", color: "contrast" }}
            >
              Suborganization
            </Text>
          </ExternalLink>{" "}
          .
        </Text>
      }
    />
  );
};
