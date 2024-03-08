import { SlashID, Text } from "@slashid/ui";
import clsx from "clsx";
import { HOME_PATH } from "~/domain/paths";
import NavLink from "../navlink";
import { logo, logoLink, logoText } from "./style.css";

interface Props {
  className?: string;
}

export default function SlashIDLogoLink({ className }: Props) {
  return (
    <NavLink
      to={HOME_PATH}
      prefetch="intent"
      className={clsx(logoLink, className)}
    >
      <SlashID className={logo} />
      <Text
        className={logoText}
        variant={{ size: "xl", weight: "semibold", color: "tertiary" }}
      >
        hotels
      </Text>
    </NavLink>
  );
}
