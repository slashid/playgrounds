import { style } from "@vanilla-extract/css";

export const wrapper = style({
  margin: "40px 0",
});

export const contentWrapper = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "0 40px",
  margin: "40px 0",
});
