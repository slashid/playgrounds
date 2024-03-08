import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

// This is used to only target the direct basicChildStyle child of the container
export const container = style({});

export const basicChildStyle = style({
  margin: "0 0 1px 20px",
  padding: "3px 0",
  selectors: {
    [`${container} > &`]: {
      position: "relative",
      marginLeft: "0",
      zIndex: 1,
    },
  },
});

export const expander = style({
  cursor: "pointer",
});

export const value = style({
  color: publicVariables.color.foreground,
  wordBreak: "break-all",
});

export const label = style({
  color: publicVariables.color.primary300,
  marginRight: "10px",
});
