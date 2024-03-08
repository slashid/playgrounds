import { ExternalLink, Panel, Text } from "@slashid/ui";
import { panel } from "./style.css";

export const SwitchingOrgPanel = () => {
  return (
    <Panel
      className={panel}
      title="Switching organization"
      content={
        <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
          We implemented the {"<OrganizationSwitcher>"} component from the{" "}
          <ExternalLink href="https://github.com/slashid/javascript/tree/main">
            <Text
              as="span"
              variant={{ size: "sm", weight: "semibold", color: "contrast" }}
            >
              SlashID React SDK
            </Text>
          </ExternalLink>{" "}
          in the top left of this page.
          <br />
          <br />
          This component is used to switch between organizations which you are a
          member of.
          <br />
          <br />
          New organizations you create will appear here for selection.
        </Text>
      }
    />
  );
};
