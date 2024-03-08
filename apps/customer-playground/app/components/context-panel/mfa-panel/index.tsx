import { ExternalLink, Panel, Text, User } from "@slashid/ui";
import { useOptimisticMfaThreshold } from "~/hooks/use-optimistic-mfa-threshold";
import { MfaForm } from "./mfa-form";
import { formContainer, mfaCtaPanel, panel } from "./style.css";

type Props = {
  children: React.ReactNode;
};

const MfaCtaPanel = ({ children }: Props) => {
  return (
    <Panel
      className={panel}
      title="Multi Factor Authentication"
      icon={<User />}
      content={
        <div className={mfaCtaPanel}>
          <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
            {children}
          </Text>
          <div className={formContainer}>
            <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
              You can change the threshold that triggers the step up MFA:
            </Text>
            <MfaForm />
          </div>
        </div>
      }
    />
  );
};

export const MfaCtaPanelWithSubtotalLessOrEqualThanMfaThreshold = () => {
  const mfaThreshold = useOptimisticMfaThreshold();
  return (
    <MfaCtaPanel>
      Once the total value of your shopping cart exceeds ${mfaThreshold}, multi
      factor authentication will be required to proceed to the checkout.
    </MfaCtaPanel>
  );
};

export const MfaCtaPanelWithSubtotalGreaterThanMfaThreshold = () => {
  const mfaThreshold = useOptimisticMfaThreshold();
  return (
    <MfaCtaPanel>
      The total value of your shopping cart exceeds ${mfaThreshold} so multi
      factor authentication will be required to proceed to the checkout.
    </MfaCtaPanel>
  );
};

export const MfaExplanationPanel = () => {
  return (
    <Panel
      className={panel}
      title="Multi Factor Authentication"
      icon={<User />}
      content={
        <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
          We used the {"<StepUpAuth>"} component from the{" "}
          <ExternalLink href="https://developer.slashid.dev/docs/access/react-sdk/reference/components/react-sdk-reference-step-up-auth">
            <Text
              as="span"
              variant={{ size: "sm", weight: "semibold", color: "contrast" }}
            >
              SlashID React SDK
            </Text>
          </ExternalLink>{" "}
          to implement this page.
          <br />
          <br />
          Check out our{" "}
          <ExternalLink href="https://developer.slashid.dev/docs/access/react-sdk/tutorials/react-sdk-tutorials-mfa">
            <Text
              as="span"
              variant={{ size: "sm", weight: "semibold", color: "contrast" }}
            >
              Multi Factor Authentication tutorial
            </Text>
          </ExternalLink>{" "}
          for more details.
        </Text>
      }
    />
  );
};
