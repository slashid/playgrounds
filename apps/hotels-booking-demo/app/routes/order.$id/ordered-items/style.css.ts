import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

export const wrapper = style({
  marginBottom: "32px",
  paddingBottom: "32px",
  borderBottom: `1px solid ${publicVariables.color.subtle}`,
});

export const items = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  marginTop: "20px",
});
