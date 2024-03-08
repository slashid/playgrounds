import { SlashID, Text } from "@slashid/ui";
import { root, logo, logoText } from "./style.css";

export const SlashIDLogo = () => {
  return (
    <div className={root}>
      <SlashID className={logo} />
      <Text
        className={logoText}
        variant={{ size: "xl", weight: "semibold", color: "tertiary" }}
      >
        notes
      </Text>
    </div>
  );
};
