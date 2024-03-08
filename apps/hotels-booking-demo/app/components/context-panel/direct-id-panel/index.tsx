import { User, ExternalLink, Panel, Text } from "@slashid/ui";
import { panel } from "./style.css";

const DirectIdPanel = () => {
  return (
    <Panel
      className={panel}
      title="DirectID"
      icon={<User />}
      content={
        <div>
          <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
            You were logged in seamlessly by following a link that contained a{" "}
            <ExternalLink href="https://developer.slashid.dev/docs/access/sdk#login-a-user-with-direct-id">
              <Text
                as="span"
                variant={{ size: "sm", weight: "semibold", color: "contrast" }}
              >
                SlashID DirectID token
              </Text>
            </ExternalLink>
          </Text>

          <br />
          <Text variant={{ size: "sm", weight: "bold", color: "foreground" }}>
            Any booking you make now will include a 10% discount!
          </Text>
        </div>
      }
    />
  );
};

export default DirectIdPanel;
