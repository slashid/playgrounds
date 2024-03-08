import { style, globalStyle } from "@vanilla-extract/css";

export const placeholder = style({
  height: "358px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
});

export const editorContainer = style({
  position: "relative",
  zIndex: 0,
  minHeight: "360px",
  width: "100%",
});

globalStyle(`${editorContainer} .ProseMirror`, {
  minHeight: "250px",
});

export const savingIndicator = style({
  display: "flex",
  columnGap: "8px",
  alignItems: "center",
});
