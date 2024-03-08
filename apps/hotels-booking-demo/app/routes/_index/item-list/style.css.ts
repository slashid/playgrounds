import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme } = vanillaExtract;

export const itemList = style({
  padding: theme.space[10],
});

export const itemListRadioGroup = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: `${theme.space[20]} ${theme.space[6]}`,
});

export const itemCard = style({
  maxWidth: "632px",
  display: "grid",
  gridTemplateRows: "1fr auto",
  gap: "16px",
});

export const itemCardFooter = style({
  display: "grid",
  gridTemplateRows: "auto auto",
  gap: "6px",
});

export const itemCardBtn = style({
  aspectRatio: "1 / 1",
});

export const text = style({
  textAlign: "center",
});
