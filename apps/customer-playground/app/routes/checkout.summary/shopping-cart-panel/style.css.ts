import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

export const content = style({
  display: "grid",
  gap: "20px",
});

export const item = style({
  selectors: {
    "&:not(:last-child)": {
      borderBottom: `1px solid ${publicVariables.color.subtle}`,
      paddingBottom: "20px",
    },
  },
});
