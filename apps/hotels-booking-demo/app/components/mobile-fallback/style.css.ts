import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { publicVariables } = vanillaExtract;

export const mobileFallback = style({
  // hide mobile fallback on desktop
  display: "none",

  "@media": {
    // small screen breakpoint
    "screen and (max-width: 1024px)": {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      gap: "40px",
      height: "100%",
      width: "100%",
      margin: 0,
      padding: "15px",
      boxSizing: "border-box",
      backgroundColor: publicVariables.color.background,
      zIndex: 2,
    },
  },
});

export const formContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});
