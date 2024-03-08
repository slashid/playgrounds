import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

export const summary = style({
  display: "grid",
  width: "290px",
  height: "max-content",
  gap: "8px",
});

export const summaryTable = style({
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "20px",
  borderTop: `1px solid ${publicVariables.color.subtle}`,
  padding: "16px 0 24px 0",
});

export const rightCol = style({
  justifySelf: "right",
});
