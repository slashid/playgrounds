import { style } from "@vanilla-extract/css";

export const emptyShoppingCart = style({
  display: "grid",
  placeItems: "center",
  gridColumnStart: 1,
  gridColumnEnd: 3,
  gridRowStart: 1,
  gridRowEnd: 3,
});

export const emptyShoppingCartWrapper = style({
  display: "grid",
  maxWidth: "232px",
  gap: "24px",
  placeItems: "center",
  textAlign: "center",
});

export const navigationBtn = style({
  maxWidth: "max-content",
});
