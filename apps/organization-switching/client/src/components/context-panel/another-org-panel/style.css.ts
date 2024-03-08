import { style, globalStyle } from "@vanilla-extract/css";

export const panel = style({
  marginBottom: "12px",
});

export const checkIcon = style({
  width: "14px !important" as "14px",
  height: "14px !important" as "14px",
});

globalStyle(`${checkIcon} path`, {
  stroke: "var(--sid-color-primary-300) !important",
});
