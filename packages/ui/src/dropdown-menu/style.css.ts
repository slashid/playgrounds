import { style, styleVariants } from "@vanilla-extract/css";
import { publicVariables, theme } from "../theme/theme.css";

export const trigger = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  width: "100%",
  borderRadius: publicVariables.border.radius,
  fontFamily: publicVariables.font.fontFamily,
  gap: "6px",

  ":active": {
    border: `1px solid ${publicVariables.color.tertiary}`,
    outline: "none",
  },
  ":hover": {
    border: `1px solid ${publicVariables.color.placeholder}`,
    cursor: "pointer",
    outline: "none",
  },
  ":focus": {
    border: `1px solid ${publicVariables.color.tertiary}`,
    outline: "none",
  },
});

export const chevronDown = style({
  marginTop: "2px",

  selectors: {
    [`${trigger}[data-state='open'] > &`]: {
      transform: "rotate(180deg)",
    },
  },
});

export const labelWrapper = style({
  display: "flex",
  flexDirection: "column",
});

export const label = style({
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.semibold,
  color: publicVariables.color.contrast,

  selectors: {
    [`${trigger} > &:hover`]: {
      color: publicVariables.color.foreground,
    },
  },
});

export const content = style({
  position: "relative",
  padding: "10px",
  backgroundColor: publicVariables.color.panel,
  border: `1px solid ${publicVariables.color.subtle}`,
  boxShadow: theme.color.md,
  borderRadius: "20px",
  overflow: "hidden",
});

export const item = style({
  fontFamily: publicVariables.font.fontFamily,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.size.sm,
  color: publicVariables.color.foreground,
  borderRadius: "12px",
  padding: "16px 12px",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",

  ":hover": {
    color: publicVariables.color.foreground,
    cursor: "pointer",
    border: "none",
    outline: "none",
  },
});

export const subLabel = style({
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.medium,
  color: publicVariables.color.secondary,
});

export const variants = styleVariants({
  default: [
    trigger,
    {
      minWidth: theme.input.minWidth,
      height: theme.input.height,
      padding: `0 ${theme.input.paddingHorizontal}`,
      boxSizing: "border-box",
      backgroundColor: publicVariables.color.offset,
      border: `1px solid ${publicVariables.color.subtle}`,
    },
  ],
  short: [
    trigger,
    {
      height: "22px",
      padding: `0 ${theme.space[2]}`,
      border: "none",
      backgroundColor: "transparent",
    },
  ],
});
