import { keyframes, style } from "@vanilla-extract/css";
import { colors, publicVariables } from "../theme/theme.css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";

const rotation = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

// const spinner = style({
//   borderRadius: "50%",
//   border: "3px solid",
//   boxSizing: "border-box",
//   display: "inline-block",
//   animation: `${rotation} 1s linear infinite`,
// });

// export const spinnerVariants = styleVariants({
//   default: [
//     spinner,
//     {
//       width: "24px",
//       height: "24px",
//     },
//   ],
//   short: [
//     spinner,
//     {
//       width: "16px",
//       height: "16px",
//     },
//   ]
// });

export const spinner = recipe({
  base: {
    borderRadius: "50%",
    border: "3px solid",
    boxSizing: "border-box",
    display: "inline-block",
    animation: `${rotation} 1s linear infinite`,
    borderColor: `${colors.white} ${colors.white} transparent ${colors.white}`,
  },

  variants: {
    color: {
      primary: {
        borderColor: `${publicVariables.color.primary} ${publicVariables.color.primary} transparent ${publicVariables.color.primary}`,
      },
      secondary: {
        borderColor: `${publicVariables.color.secondary} ${publicVariables.color.secondary} transparent ${publicVariables.color.secondary}`,
      },
      tertiary: {
        borderColor: `${publicVariables.color.tertiary} ${publicVariables.color.tertiary} transparent ${publicVariables.color.tertiary}`,
      },
      white: {
        borderColor: `${colors.white} ${colors.white} transparent ${colors.white}`,
      },
    },
    size: {
      normal: { width: "24px", height: "24px" },
      small: { width: "16px", height: "16px" },
    },
  },

  defaultVariants: {
    color: "white",
    size: "normal",
  },
});

export type SpinnerColorVariants = RecipeVariants<typeof spinner>;

export const background = style({
  padding: "16px",
  display: "flex",
  width: "fit-content",
  height: "fit-content",
  borderRadius: "50%",
  background:
    "linear-gradient(148.27deg, rgba(42, 106, 255, 0.86) 14.4%, rgba(42, 106, 255, 0.74) 87.37%)",
});
