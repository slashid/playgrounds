import { Text } from "@slashid/ui";
import { SlashIDLogo } from "../slash-id-logo";
import { EmailForm } from "./email-form";
import { formContainer, mobileFallback } from "./style.css";

export default function MobileFallback() {
  return (
    <div className={mobileFallback}>
      <SlashIDLogo />
      <Text
        as="h1"
        variant={{ size: "2xl-title", weight: "bold", color: "foreground" }}
      >
        Oops...
      </Text>
      <Text variant={{ weight: "semibold", color: "contrast" }}>
        Please resume browsing on a bigger screen.
        <br/><br/>
        The SlashID Notes multitenancy demo was designed to guide
        you using an informational sidebar. Unfortunately, it
        doesn't fit on a small mobile screen, so please view the demo
        using a desktop, laptop, or tablet. Thank you!
      </Text>
      <div className={formContainer}>
        <Text variant={{ weight: "semibold", color: "contrast" }}>
          Type your email below and receive a link to access the demo on a
          different device:
        </Text>
        <EmailForm />
      </div>
    </div>
  );
}
