import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { publicVariables } from "../theme/theme.css";

const hide = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const slideIn = keyframes({
  "0%": { transform: "translateY(-5vh)", opacity: 0 },
  "50%": { opacity: 0 },
  "1000%": { transform: "translateY(0)", opacity: 1 },
});

const swipeOut = keyframes({
  from: { transform: "translateY(var(--radix-toast-swipe-end-y))" },
  to: { transform: `translateY(-5vh)` },
});

const animationDuration = "1s";

export const base = style({
  width: "max-content",
  padding: "12px 16px",
  borderRadius: "14px",
  border: `1px solid ${publicVariables.color.positiveSmooth}`,
  backgroundColor: publicVariables.color.backgroundSuccess,
  listStyle: "none",

  selectors: {
    '&[data-state="open"]': {
      animation: `${slideIn} ${animationDuration} ease-in-out`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} ${animationDuration} ease-in forwards`,
    },
    '&[data-swipe="move"]': {
      transform: "translateY(var(--radix-toast-swipe-move-y))",
    },
    '&[data-swipe="cancel"]': {
      transform: "translateY(0)",
      transition: `transform ${animationDuration} ease-out`,
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} ${animationDuration} ease-out forwards`,
    },
  },
});

export const toast = styleVariants({
  success: [base],
  error: [
    base,
    {
      border: `1px solid ${publicVariables.color.error}`,
      backgroundColor: publicVariables.color.backgroundFailure,
    },
  ],
});

export const title = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "9px",
});

export const viewport = style({
  all: "unset",
  position: "absolute",
  top: 0,
  width: "100%",
  display: "grid",
  placeContent: "center",
});

export type Variants = keyof typeof toast;
