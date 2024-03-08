import { createVar, style } from "@vanilla-extract/css";
import { publicVariables, theme } from "../theme/theme.css";

const scrollbarSize = createVar();

export const scrollAreaRoot = style({
  height: "100%",
  overflow: "hidden",
  paddingRight: theme.space[5],
  vars: {
    [scrollbarSize]: "6px",
  },
});

export const viewport = style({
  width: "100%",
  height: "100%",
});

export const scrollbar = style({
  overflow: "hidden",
  display: "flex",
  userSelect: "none",
  touchAction: "none",
  backgroundColor: "transparent",

  selectors: {
    '&[data-orientation="vertical"]': {
      width: scrollbarSize,
      marginRight: scrollbarSize,
    },
    '&[data-orientation="horizontal"]': {
      flexDirection: "column",
      height: scrollbarSize,
      marginBottom: scrollbarSize,
    },
  },
});

export const thumb = style({
  position: "relative",
  flex: 1,
  backgroundColor: publicVariables.color.placeholder,
  borderRadius: scrollbarSize,
  transition: "background-color 160ms ease-out",

  ":before": {
    content: "",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: "44px",
    minHeight: "44px",
  },

  ":hover": {
    filter: "brightness(0.6)",
  },
});

export const corner = style({
  backgroundColor: publicVariables.color.placeholder,
});
