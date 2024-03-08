import { User, ExternalLink, Panel, Text } from "@slashid/ui";
import { panel } from "./style.css";

const LoginPanel = () => {
  return (
    <Panel
      className={panel}
      title="SlashID Login"
      icon={<User />}
      content={
        <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
          We used the {`<Form>`} component from the{" "}
          <ExternalLink href="https://github.com/slashid/javascript/tree/main">
            <Text
              as="span"
              variant={{ size: "sm", weight: "medium", color: "contrast" }}
            >
              SlashID React SDK
            </Text>
          </ExternalLink>{" "}
          to implement this page.
          <br />
          <br />
          The form can be customised to match your brand -{" "}
          <ExternalLink href="https://developer.slashid.dev/docs/access/react-sdk/reference/components/react-sdk-reference-form">
            <Text
              as="span"
              variant={{ size: "sm", weight: "medium", color: "contrast" }}
            >
              check out the docs
            </Text>
          </ExternalLink>
          .
        </Text>
      }
    />
  );
};

export default LoginPanel;
