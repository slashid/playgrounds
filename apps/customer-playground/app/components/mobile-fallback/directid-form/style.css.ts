import { style } from "@vanilla-extract/css";

export const form = style({
  display: "grid",
  gridAutoRows: "1fr",
  gap: "10px",
});

export const formFooter = style({
  display: "grid",
  width: "100%",
});

export const submitButton = style({
  minHeight: "100%",
});
