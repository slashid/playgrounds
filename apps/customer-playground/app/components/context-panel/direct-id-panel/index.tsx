import { User, ExternalLink, Panel, Text } from "@slashid/ui";
import { panel } from "./style.css";

const DirectIdPanel = () => {
  return (
    <Panel
      className={panel}
      title="DirectID"
      icon={<User />}
      content={
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
          .
          <br />
          <br />
          These single use tokens can be created both{" "}
          <ExternalLink href="https://developer.slashid.dev/docs/api/core/get-direct-id-value-for-a-person">
            <Text
              as="span"
              variant={{ size: "sm", weight: "semibold", color: "contrast" }}
            >
              server side
            </Text>
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink href="https://developer.slashid.dev/docs/access/sdk/classes/Types.BaseUser#createdirectid">
            <Text
              as="span"
              variant={{ size: "sm", weight: "semibold", color: "contrast" }}
            >
              client side
            </Text>
          </ExternalLink>
          , letting your users land on target pages already authenticated.
        </Text>
      }
    />
  );
};

export default DirectIdPanel;
