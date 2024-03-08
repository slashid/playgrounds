import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";
import {
  Z_INDEX_CONTEXT_PANEL,
  Z_INDEX_CONTEXT_PANEL_TRIGGER,
} from "./constants";

const { theme, publicVariables } = vanillaExtract;

export const contextPanel = style({
  position: "sticky",
  top: 0,
  minWidth: "80px",
  maxWidth: "450px",
  height: "100vh",
  overflow: "hidden",
  padding: `0 0 ${theme.space[4]} ${theme.space[5]}`,
  boxSizing: "border-box",
  color: publicVariables.color.foreground,
  backgroundColor: publicVariables.color.background,
  boxShadow: theme.boxShadow.shadow200,
  borderRadius: "26px 0 0 26px",
  zIndex: Z_INDEX_CONTEXT_PANEL,
});

export const collapsible = style({
  height: "100%",
  display: "grid",
});

export const trigger = style({
  position: "absolute",
  marginTop: theme.space[4],
  zIndex: Z_INDEX_CONTEXT_PANEL_TRIGGER,
});
