import { style } from "@vanilla-extract/css";
import { publicVariables, theme } from "../theme/theme.css";

export const toggle = style({
  fontFamily: publicVariables.font.fontFamily,
  fontWeight: theme.font.weight.medium,
  fontSize: theme.font.size.base,
  padding: 0,
  width: "40px",
  height: "32px",
  borderRadius: "12px",
  border: `1px solid ${publicVariables.color.smooth}`,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  lineHeight: "118%",

  ":hover": {
    cursor: "pointer",
    border: `1px solid ${publicVariables.color.placeholder}`,
  },

  ":active": {
    transform: "scale(.98)",
  },

  ":focus-visible": {
    outline: `3px solid ${publicVariables.color.smooth}`,
  },
});

export const toggleDisabled = style({
  opacity: "0.4",

  ":hover": {
    cursor: "not-allowed",
    border: `1px solid ${publicVariables.color.smooth}`,
  },
});

export const toggleReadOnly = style({
  opacity: "1",
});

export const toggleActive = style({
  border: `1px solid ${publicVariables.color.secondary}`,
});
