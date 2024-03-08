import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme, publicVariables } = vanillaExtract;

export const wrapper = style({
  minHeight: "100vh",
  padding: `${theme.space[4]} ${theme.space[8]}`,
  boxSizing: "border-box",
  backgroundColor: publicVariables.color.background,
});

export const link = style({
  textDecoration: "underline",
});
