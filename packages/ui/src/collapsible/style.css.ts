import { style, styleVariants } from "@vanilla-extract/css";

export const trigger = style({
  display: "grid",
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
});

export const content = style({
  overflow: "hidden",
});

export const collapsibleContent = styleVariants({
  vertical: [
    content,
    {
      transition: "height 500ms ease-in-out",
      selectors: {
        '&[data-state="open"]': {
          height: "var(--collapsible-content-height)",
        },
        '&[data-state="closed"]': {
          height: 0,
        },
      },
    },
  ],
  horizontal: [
    content,
    {
      transition: "width 500ms ease-in-out",
      selectors: {
        '&[data-state="open"]': {
          width: "var(--collapsible-content-width)",
        },
        '&[data-state="closed"]': {
          width: 0,
        },
      },
    },
  ],
});
