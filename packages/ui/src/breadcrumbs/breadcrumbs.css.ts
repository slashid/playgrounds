import { style } from "@vanilla-extract/css";
import { publicVariables, theme } from "../theme/theme.css";

export const list = style({
  display: "grid",
  gridAutoFlow: "column",
  gap: "8px",
  width: "max-content",
  fontFamily: publicVariables.font.fontFamily,
  fontSize: theme.font.size.base,
  fontWeight: theme.font.weight.semibold,
});

export const trigger = style({
  all: "unset",

  ":focus-visible": {
    border: `1px solid ${publicVariables.color.tertiary}`,
    outline: "none",
  },

  selectors: {
    '&[data-state="active"]': {
      color: publicVariables.color.foreground,
    },
    '&[data-state="inactive"]': {
      cursor: "pointer",
      color: publicVariables.color.contrast,
    },
    "&:disabled": {
      cursor: "not-allowed",
      color: publicVariables.color.secondary,
    },
  },
});

export const breadcrumb = style({
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  textTransform: "capitalize",
});
