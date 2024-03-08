import { style } from "@vanilla-extract/css";

export const logoText = style({
  paddingTop: "2px",
});

export const logo = style({
  width: "32px",
  height: "32px",
});

export const root = style({
  width: "max-content",
  display: "grid",
  gridTemplateColumns: "auto auto",
  alignItems: "center",
  gap: "6px",
  textDecoration: "none",
});
