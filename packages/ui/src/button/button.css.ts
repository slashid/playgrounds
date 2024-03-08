import { colors, publicVariables, theme } from "../theme/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

const base = style({
  fontFamily: publicVariables.font.fontFamily,
  borderRadius: publicVariables.border.radius,
  fontWeight: theme.font.weight.medium,
  fontSize: theme.font.size.base,
  height: theme.input.height,
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "19px 22px",
  userSelect: "none",
  lineHeight: "118%",
  boxSizing: "border-box",

  ":hover": {
    cursor: "pointer",
  },

  ":active": {
    transform: "scale(.98)",
  },

  ":focus-visible": {
    outline: `4px solid ${publicVariables.color.smooth}`,
  },
});

export const button = styleVariants({
  primary: [
    base,
    {
      backgroundColor: publicVariables.color.primary,
      color: colors.white,
      border: "none",

      ":hover": {
        backgroundColor: publicVariables.color.primaryHover,
      },
    },
  ],
  primaryNoPadding: [
    base,
    {
      height: "auto",
      backgroundColor: publicVariables.color.primary,
      color: colors.white,
      border: "none",
      padding: 0,

      ":hover": {
        backgroundColor: publicVariables.color.primaryHover,
      },
    },
  ],
  primarySmall: [
    base,
    {
      height: "auto",
      padding: "12px 16px",
      borderRadius: "14px",
      fontSize: theme.font.size.sm,
      lineHeight: "100%",
      backgroundColor: publicVariables.color.primary,
      color: colors.white,
      border: "none",

      ":hover": {
        backgroundColor: publicVariables.color.primaryHover,
      },
    },
  ],
  primaryMedium: [
    base,
    {
      height: "auto",
      padding: "14px 16px",
      fontWeight: theme.font.weight.semibold,
      lineHeight: "122%",
      backgroundColor: publicVariables.color.primary,
      color: colors.white,
      border: "none",

      ":hover": {
        backgroundColor: publicVariables.color.primaryHover,
      },
    },
  ],
  secondary: [
    base,
    {
      backgroundColor: publicVariables.color.panel,
      color: publicVariables.color.foreground,
      border: `1px solid ${publicVariables.color.smooth}`,

      ":hover": {
        backgroundColor: publicVariables.color.soft,
      },
    },
  ],
});

export const buttonDisabled = style({
  opacity: "0.6",
  ":hover": {
    backgroundColor: publicVariables.color.primary,
    cursor: "not-allowed",
  },
});

export const icon = style({
  marginRight: "22px",
  display: "flex",
  alignItems: "center",
});
