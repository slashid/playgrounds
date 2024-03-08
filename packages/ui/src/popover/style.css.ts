import { style } from "@vanilla-extract/css";

export const content = style({
  width: "var(--radix-popover-trigger-width)",
  maxHeight: "var(--radix-popover-content-available-height)",
  outline: "none",
});

export const anchor = style({
  width: "100%",
});
