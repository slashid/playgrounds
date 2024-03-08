import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { colors, publicVariables, theme } from "../theme/theme.css";

export const text = recipe({
  base: {
    fontFamily: publicVariables.font.fontFamily,
    fontWeight: theme.font.weight.medium,
    fontSize: theme.font.size.base,
    color: publicVariables.color.foreground,
    margin: 0,
    lineHeight: "100%",
  },

  variants: {
    fontFamily: {
      inter: { fontFamily: theme.font.fontFamily.inter },
      sourceCodePro: {
        fontFamily: theme.font.fontFamily.sourceCodePro,
      },
    },
    size: {
      xs: { fontSize: "12px", lineHeight: "118%" },
      sm: { fontSize: "14px", lineHeight: "112%" },
      base: { fontSize: "16px", lineHeight: "122%" },
      xl: { fontSize: "20px" },
      "2xl-title": { fontSize: "24px", lineHeight: "118%" },
      "3xl-title": { fontSize: "56px", lineHeight: "108%" },
    },
    weight: {
      medium: { fontWeight: "500" },
      semibold: { fontWeight: "600" },
      bold: { fontWeight: "700" },
    },
    color: {
      contrast: { color: publicVariables.color.contrast },
      tertiary: { color: publicVariables.color.tertiary },
      secondary: { color: publicVariables.color.secondary },
      foreground: { color: publicVariables.color.foreground },
      primary: { color: publicVariables.color.primary },
      placeholder: { color: publicVariables.color.placeholder },
      error: { color: publicVariables.color.error },
      // KYC
      white: { color: colors.white },
      success: { color: publicVariables.color.foregroundSuccess },
      failure: { color: publicVariables.color.foregroundFailure },
    },
  },

  defaultVariants: {
    size: "base",
    weight: "medium",
  },
});

export type TextVariants = RecipeVariants<typeof text>;
