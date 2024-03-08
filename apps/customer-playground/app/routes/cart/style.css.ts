import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme } = vanillaExtract;

export const shoppingCart = style({
  display: "grid",
  gridTemplate: `
    "a a"
    "b c" 1fr
  `,
  gridAutoRows: "max-content",
  gap: "32px 40px",
  height: "100%",
  padding: `${theme.space[10]} 0`,
  boxSizing: "border-box",
});

export const title = style({
  gridArea: "a",
});
