import { vanillaExtract } from "@slashid/ui";
import { style, globalStyle } from "@vanilla-extract/css";

export const button = style({
  minWidth: "115px",
  marginTop: "20px",
});

export const alertText = style({
  display: "flex",
  columnGap: "4px",
  alignItems: "center",
  paddingBottom: "20px",
  paddingTop: "8px",
});

globalStyle(`${alertText} svg path`, {
  fill: vanillaExtract.publicVariables.color.secondary,
});
