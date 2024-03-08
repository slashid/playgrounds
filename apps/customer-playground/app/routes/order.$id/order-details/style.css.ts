import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

export const wrapper = style({
  marginTop: "12px",
  marginBottom: "32px",
  paddingBottom: "32px",
  borderBottom: `1px solid ${publicVariables.color.subtle}`,
});

export const table = style({
  display: "grid",
  gridTemplateColumns: "repeat(5, auto)",
  gridTemplateRows: "repeat(2, auto)",
  gap: "8px 56px",
  marginTop: "44px",
});
