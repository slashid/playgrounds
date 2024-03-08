import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables, theme } = vanillaExtract;

export const navLink = style({
  all: "unset",
  cursor: "pointer",

  ":focus-visible": {
    outline: `4px solid ${publicVariables.color.smooth}`,
  },
});

export const disabledLink = style({
  opacity: 0.4,
});

export const buttonLink = style({
  display: "grid",
  width: "100%",
  placeItems: "center",
  padding: "14px 16px",
  fontWeight: theme.font.weight.semibold,
  lineHeight: "122%",
});
