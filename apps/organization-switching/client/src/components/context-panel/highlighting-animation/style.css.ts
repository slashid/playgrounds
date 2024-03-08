import { vanillaExtract } from "@slashid/ui";
import { keyframes, style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

const createHighlighting = (color: string) =>
  keyframes({
    "0%": { borderColor: color },
    "20%": { borderColor: "transparent" },
    "40%": { borderColor: "transparent" },
    "60%": { borderColor: color },
    "80%": { borderColor: color },
    "100%": { borderColor: "transparent" },
  });

const primaryStrokeHighlight = createHighlighting(
  publicVariables.color.primaryStroke
);

const colorfulStrokeHighlight = createHighlighting(
  publicVariables.color.colorfulStroke
);

const animationProps =
  "var(--x-animation-duration) var(--x-animation-delay) ease-in-out forwards";

export const highlightedElement = style({
  position: "relative",
  margin: "-10px",
  padding: "5px",
  border: "5px solid transparent",
  borderRadius: "16px",
  borderColor: publicVariables.color.colorfulStroke,
  animation: `${colorfulStrokeHighlight} ${animationProps}`,

  selectors: {
    "&:before": {
      content: "''",
      position: "absolute",
      inset: "0",
      border: "1px solid transparent",
      borderRadius: "14px",
      margin: "-1px",
      borderColor: publicVariables.color.primaryStroke,
      animation: `${primaryStrokeHighlight} ${animationProps}`,
    },
  },
});
