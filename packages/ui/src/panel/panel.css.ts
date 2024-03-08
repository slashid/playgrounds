import { style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { publicVariables, theme } from "../theme/theme.css";

export const header = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "6px",
  marginBottom: "6px",
});

export const panel = recipe({
  base: {
    padding: theme.space[5],
    borderRadius: theme.space[4],
    border: `1px solid ${publicVariables.color.colorfulStroke}`,
    background: theme.linearGradient.gradient100,
  },

  variants: {
    borderColor: {
      colorful: {
        borderColor: publicVariables.color.colorfulStroke,
      },
      subtle: {
        borderColor: publicVariables.color.subtle,
      },
    },
    background: {
      colorful: {
        background: theme.linearGradient.gradient100,
      },
      soft: {
        background: publicVariables.color.soft,
      },
    },
    padding: {
      noPaddingLeftRight: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },

  defaultVariants: {
    borderColor: "colorful",
    background: "colorful",
  },
});

export type PanelVariants = RecipeVariants<typeof panel>;
