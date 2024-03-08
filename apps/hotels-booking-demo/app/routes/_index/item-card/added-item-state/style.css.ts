import { style } from "@vanilla-extract/css";

export const addedWrapper = style({
  transition: "opacity var(--x-transition-duration) ease-in-out",
  selectors: {
    '&[data-state="open"]': {
      opacity: 1,
    },
    '&[data-state="closed"]': {
      opacity: 0,
    },
  },
});

export const addedText = style({
  display: "grid",
  gridTemplateColumns: "auto auto",
  placeItems: "center",
  justifyContent: "center",
});
