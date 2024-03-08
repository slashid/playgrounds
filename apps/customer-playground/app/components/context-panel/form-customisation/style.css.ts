import { style } from "@vanilla-extract/css";

export const wrapper = style({
  marginBottom: 16,
});

export const panel = style({
  marginTop: "14px",
});

export const header = style({
  marginTop: 16,
  display: "grid",
  gap: "2px",
});

export const content = style({
  display: "grid",
  gap: "10px",
});

export const colorPicker = style({
  paddingLeft: "18px",
  display: "flex",
  gap: "4px",
  flexDirection: "column",
});
