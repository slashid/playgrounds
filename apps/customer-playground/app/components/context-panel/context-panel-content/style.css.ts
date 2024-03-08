import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";
import { Z_INDEX_CONTEXT_PANEL_HEADER } from "../constants";

const { theme, publicVariables } = vanillaExtract;

export const contentWrapper = style({
  width: "430px",
  height: "100%",
  display: "grid",
  gridTemplateRows: "auto 1fr",
});

export const contentHeader = style({
  padding: `${theme.space[6]} 50px ${theme.space[6]} 50px`,
  textAlign: "center",
  backgroundColor: publicVariables.color.background,
  zIndex: Z_INDEX_CONTEXT_PANEL_HEADER,
});
