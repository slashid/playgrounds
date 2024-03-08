import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme, publicVariables } = vanillaExtract;

export const card = style({
  position: "relative",
  display: "grid",
  borderRadius: "24px",
  border: `1px solid ${publicVariables.color.subtle}`,
  boxSizing: "border-box",
  overflow: "hidden",
  aspectRatio: "1 / 1",
});

export const deleteBtn = style({
  position: "absolute",
  right: "12px",
  top: "12px",
  padding: "8px 12px",
});

export const itemCardFooter = style({
  display: "grid",
  gridTemplateAreas: `
    "a b"
    "c d"
  `,
  gap: "12px",
  marginTop: "16px",
});

export const title = style({
  gridArea: "a",
  justifySelf: "left",
});

export const price = style({
  gridArea: "b",
  justifySelf: "right",
});

export const toggleWrapper = style({
  gridArea: "c",
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "6px",
  justifySelf: "left",
});

export const quantityWrapper = style({
  width: "max-content",
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  gridArea: "d",
  gap: "4px",
  placeItems: "center",
  justifySelf: "right",
});

export const quantityText = style({
  minWidth: theme.space[5],
  textAlign: "center",
});

export const colorBox = style({
  width: "32px",
  height: "24px",
  borderRadius: "8px",
});
