import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { publicVariables, theme } from "../theme/theme.css";

export const badge = recipe({
  base: {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    width: "max-content",
    height: "18px",
    minWidth: "18px",
    boxSizing: "border-box",
    fontWeight: theme.font.weight.semibold,
  },

  variants: {
    size: {
      short: {
        padding: "2px",
        borderRadius: "50%",
        fontSize: theme.font.size.xs,
        lineHeight: theme.font.size.xs,
      },
      long: {
        padding: "4px 8px",
        borderRadius: "16px",
        fontSize: "10px",
        lineHeight: "10px",
        textTransform: "uppercase",
      },
    },
    state: {
      active: {
        backgroundColor: publicVariables.color.foreground,
        color: publicVariables.color.background,
      },
      inactive: {
        backgroundColor: publicVariables.color.subtle,
        color: "inherit",
      },
    },
  },

  defaultVariants: {
    size: "short",
    state: "active",
  },
});

export type BadgeVariants = RecipeVariants<typeof badge>;
