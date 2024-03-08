import { vanillaExtract } from "@slashid/ui";
import { style } from "@vanilla-extract/css";

const { theme, publicVariables } = vanillaExtract;

export const navbar = style({
  display: "grid",
  gridTemplateColumns: "1fr auto auto",
  justifyItems: "start",
  gap: "10px",
  position: "sticky",
  top: "-1px",
  padding: `${theme.space[4]} ${theme.space[10]}`,
  boxSizing: "border-box",
  backgroundColor: publicVariables.color.background,
  zIndex: 1,
});

export const pinnedNavbar = style({
  boxShadow: theme.boxShadow.shadow100,
});

export const dropdown = style({
  display: "grid",
  alignItems: "center",
});

export const dropdownContent = style({
  minWidth: "240px",
});

export const shoppingCartLink = style({
  position: "relative",
  display: "grid",
  placeItems: "center",
  width: "40px",
  height: "38px",
  padding: theme.space[1],
  borderRadius: "12px",
  boxSizing: "border-box",
  backgroundColor: publicVariables.color.primary,
  textDecoration: "none",
});

export const longBadge = style({
  position: "absolute",
  top: "-4px",
  right: 0,
  transform: "translateX(50%)",
});

export const shortBadge = style({
  position: "absolute",
  top: "-4px",
  right: "-4px",
});

export const rightLinks = style({
  display: "flex",
  gap: 8,
});
