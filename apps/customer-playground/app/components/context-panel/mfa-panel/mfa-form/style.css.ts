import { style } from "@vanilla-extract/css";

export const submitButton = style({
  minWidth: "100px",
  minHeight: "48px",
});

export const form = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "20px",
});
