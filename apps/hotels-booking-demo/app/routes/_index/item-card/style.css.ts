import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme, publicVariables } = vanillaExtract;

export const card = style({
  position: "relative",
  display: "grid",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  borderRadius: "32px",
  border: `1px solid ${publicVariables.color.smooth}`,
  overflow: "hidden",

  ":hover": {
    cursor: "pointer",
    boxShadow: theme.boxShadow.shadow400,
  },
});

export const boxShadow = style({
  boxShadow: theme.boxShadow.shadow400,
});

export const itemStateWrapper = style({
  position: "absolute",
  bottom: 0,
  width: "100%",
  padding: theme.space[5],
  boxSizing: "border-box",
  borderRadius: "0",
  backgroundColor: "rgba(243, 243, 245, 0.9)",
});
