import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme, publicVariables } = vanillaExtract;

export const pageWrapper = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  minHeight: "100vh",
  width: "100%",
  margin: 0,
  backgroundColor: publicVariables.color.background,

  "@media": {
    // small screen breakpoint
    "screen and (max-width: 1024px)": {
      overflow: "hidden",
    },
  },
});

export const mainContentWrapper = style({
  display: "grid",
  gridTemplateRows: "auto auto 1fr",
  height: "100vh",
});

export const mainContent = style({
  padding: `${theme.space[4]} ${theme.space[8]}`,
});

export const scrollAreaWrapper = style({
  overflow: "hidden",
  position: "relative",
});

export const mainContentViewport = style({
  // HACK: We need "!important" here to override radix viewport inline style which breaks minHeight
  // more details in this issue https://github.com/radix-ui/primitives/issues/926#issuecomment-1015279283
  display: "grid !important",
  gridTemplateRows: "1fr auto",
  minHeight: "100%",
});
