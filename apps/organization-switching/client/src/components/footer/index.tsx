import { SlashID, Text, vanillaExtract } from "@slashid/ui";
import {
  footer,
  leftText,
  leftTextWrapper,
  logo,
  rightText,
  wrapper,
} from "./style.css";

const { publicVariables } = vanillaExtract;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={footer}>
      <div className={wrapper}>
        <div className={leftTextWrapper}>
          <SlashID
            className={logo}
            slashFill={publicVariables.color.secondary}
            idFill={publicVariables.color.secondary}
          />
          <Text
            className={leftText}
            variant={{ size: "xs", weight: "semibold", color: "secondary" }}
          >
            © {currentYear} SlashID® Inc. All Rights Reserved.
          </Text>
        </div>
        <Text
          className={rightText}
          variant={{ size: "xs", weight: "semibold", color: "secondary" }}
        >
          Demo by SlashID
        </Text>
      </div>
    </footer>
  );
}
