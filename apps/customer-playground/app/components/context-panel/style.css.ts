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
  paddingBottom: "70px",
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

export const footer = style({
  position: "absolute",
  bottom: 0,
  left: "-1rem",
  display: "flex",
  justifyContent: "flex-end !important",
  gap: 12,
  backgroundColor: "#171625",
  padding: "16px 20px",
  paddingLeft: "calc(20px + 1rem)",
  width: "calc(100% - (20px + 1rem))",
  zIndex: 10,
  borderTop: "1px solid var(--sid-color-subtle)",
});

export const signupCTA = style({
  width: "50%",
});

export const buttonText = style({
  marginRight: 6,
});
