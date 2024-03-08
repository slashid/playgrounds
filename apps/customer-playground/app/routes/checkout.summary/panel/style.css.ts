import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

export const panel = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  padding: "20px",
  gap: "10px",
  borderRadius: "24px",
  border: `1px solid ${publicVariables.color.subtle}`,
  backgroundColor: publicVariables.color.offset,
});

export const link = style({
  padding: "6px 12px",
  borderRadius: "12px",

  ":hover": {
    backgroundColor: publicVariables.color.soft,
  },

  ":active": {
    transform: "scale(.98)",
    backgroundColor: publicVariables.color.soft,
  },

  ":focus-visible": {
    outline: `4px solid ${publicVariables.color.smooth}`,
  },
});
