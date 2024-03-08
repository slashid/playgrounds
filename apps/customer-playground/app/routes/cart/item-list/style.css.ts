import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme } = vanillaExtract;

export const itemList = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: `${theme.space[20]} ${theme.space[6]}`,
  gridArea: "b",
});
