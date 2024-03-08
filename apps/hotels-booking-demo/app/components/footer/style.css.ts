import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme, publicVariables } = vanillaExtract;

export const footer = style({
  padding: `0 ${theme.space[10]}`,
});

export const wrapper = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  padding: `${theme.space[5]} 0`,
  borderTop: `1px solid ${publicVariables.color.smooth}`,
});

export const logo = style({
  width: "24px",
  height: "24px",
});

export const leftTextWrapper = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "12px",
  alignItems: "center",
});

export const leftText = style({
  paddingTop: "4px",
});

export const rightText = style({
  display: "grid",
  alignItems: "center",
  paddingTop: "4px",
});
