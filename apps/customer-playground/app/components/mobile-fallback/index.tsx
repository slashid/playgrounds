import { Text } from "@slashid/ui";
import SlashIDLogoLink from "~/components/slash-id-logo-link";
import { DirectIDForm } from "./directid-form";
import { formContainer, mobileFallback } from "./style.css";

export default function MobileFallback() {
  return (
    <div className={mobileFallback}>
      <SlashIDLogoLink />
      <Text
        as="h1"
        variant={{ size: "2xl-title", weight: "bold", color: "foreground" }}
      >
        Ooops...
      </Text>
      <Text variant={{ weight: "semibold", color: "contrast" }}>
        Please resume browsing on a bigger screen. The SlashID e-commerce
        playground was designed to display the inner workings of our SDK through
        a side panel. Unfortunately, it doesn't fit on a small mobile screen, so
        please view it on a laptop or a tablet. Thank you!
      </Text>
      <div className={formContainer}>
        <Text variant={{ weight: "semibold", color: "contrast" }}>
          Type your email below and receive a link to access the demo on a
          different device:
        </Text>
        <DirectIDForm />
      </div>
    </div>
  );
}
