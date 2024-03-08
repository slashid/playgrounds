import { style } from "@vanilla-extract/css";

export const content = style({
  display: "grid",
  gap: "8px",
});

export const cardNumber = style({
  padding: "2px 0",
});

export const details = style({
  display: "grid",
  gap: "12px",
  gridTemplateColumns: "auto auto",
  width: "max-content",
});
