import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

export const item = style({
  display: "grid",
  gridTemplateAreas: `
    "a b"
    "a c"
  `,
  alignItems: "center",
  gap: "24px",
  width: "max-content",
});

export const imageWrapper = style({
  gridArea: "a",
  display: "grid",
  maxWidth: "136px",
  borderRadius: "16px",
  border: `1px solid ${publicVariables.color.subtle}`,
  backgroundColor: publicVariables.color.offset,
  boxSizing: "border-box",
  aspectRatio: "1 / 1",
});

export const image = style({
  width: "100%",
  aspectRatio: "1 / 1",
});

export const header = style({
  gridArea: "b",
  display: "grid",
  gap: "8px",
});

export const details = style({
  gridArea: "c",
  display: "grid",
  gridTemplateAreas: `
    "a b c"
    "d f g"
  `,
  gap: "8px 20px",
});
