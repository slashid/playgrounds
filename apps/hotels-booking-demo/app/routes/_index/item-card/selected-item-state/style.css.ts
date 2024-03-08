import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme } = vanillaExtract;

export const selectedWrapper = style({
  display: "grid",
  gridTemplateAreas: `
    "a b c"
    "d e f"
    "g g g"
  `,
  justifyContent: "space-between",
  // rowGap: "8px",
  bottom: "0",
  transition: "transform 400ms ease-in-out",
  selectors: {
    '&[data-state="open"]': {
      transform: "translateY(0)",
    },
    '&[data-state="closed"]': {
      transform: "translateY(100%)",
    },
  },
});

export const colorWrapper = style({
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "4px",
});

export const sizeWrapper = style({
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  gap: "4px",
});

export const quantityWrapper = style({
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  gap: "4px",
  placeItems: "center",
});

export const addToCartBtn = style({
  gridArea: "g",
  // marginTop: "12px",
});

export const quantityText = style({
  minWidth: theme.space[5],
  textAlign: "center",
});

export const colorBox = style({
  width: "32px",
  height: "24px",
  borderRadius: "8px",
});
