import { style } from "@vanilla-extract/css";

export const welcome = style({
  width: "370px",
});

export const subtitle = style({
  padding: "20px 0",
  flex: 1,
});

export const subtitleContainer = style({
  display: "flex",
  alignItems: "center",
  columnGap: "8px",
});

export const welcomeContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});
