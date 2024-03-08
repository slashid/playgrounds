import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

export const uiTheme = style({
  fontFamily: publicVariables.font.fontFamily,
});
