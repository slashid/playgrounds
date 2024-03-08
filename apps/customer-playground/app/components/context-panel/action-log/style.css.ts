import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";
import { Z_INDEX_POPOVER_CONTAINER, Z_INDEX_TEXT } from "../constants";

const { publicVariables } = vanillaExtract;

export const panel = style({
  marginTop: "14px",
});

export const header = style({
  display: "grid",
  gap: "2px",
});

export const actionItem = style({
  display: "grid",
  padding: "8px 0",
});

export const popoverContainer = style({
  zIndex: Z_INDEX_POPOVER_CONTAINER,
  position: "absolute",
});

export const popoverContent = style({
  borderRadius: "10px",
  padding: "12px 26px",
  marginLeft: "10px",
  marginTop: "7px",
  backgroundColor: publicVariables.color.floating,
});

export const popoverContentWrapper = style({
  margin: "0 -14px",
});

export const popoverTrigger = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "10px",
  cursor: "pointer",

  ":focus-visible": {
    outline: `4px solid ${publicVariables.color.smooth}`,
  },
});

export const actionTimestamp = style({
  zIndex: Z_INDEX_TEXT,
  minWidth: "40px",
});

export const actionWrapper = style({
  display: "flex",
  gap: "6px",
  zIndex: Z_INDEX_TEXT,
});

export const actionText = style({
  selectors: {
    [`${popoverTrigger}[data-state='open'] &, ${popoverTrigger}:hover &`]: {
      color: publicVariables.color.foreground,
    },
  },
});

export const eyeIcon = style({
  display: "none",

  selectors: {
    [`${popoverTrigger}[data-state='open'] &, ${popoverTrigger}:hover &`]: {
      display: "block",
    },
  },
});

export const highlightedActionItem = style({
  marginTop: "0",
  marginBottom: "0",
  paddingRight: "5px",
  paddingLeft: "5px",
});

export const actionLog = style({
  marginTop: "24px",
  marginBottom: "24px",
});

export const actionItems = style({
  display: "grid",
  gap: "1px",
  maxHeight: "20vh",
  padding: "0 10px 0 20px",
});
