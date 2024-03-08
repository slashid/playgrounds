import { style, globalStyle } from "@vanilla-extract/css";
import { vanillaExtract } from "@slashid/ui";

export const button = style({
  minWidth: "115px",
  marginTop: "20px",
});

export const heading = style({
  paddingBottom: "20px",
});

export const modal = style({
  borderRadius: "4px",
  background: vanillaExtract.colors.white,
  padding: "40px",
  minWidth: "400px",
});

globalStyle(".MuiModal-root", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute !important" as "absolute",
  zIndex: "500 !important" as unknown as 500,
});
