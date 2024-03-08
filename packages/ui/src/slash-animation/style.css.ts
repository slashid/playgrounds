import { style } from "@vanilla-extract/css";
import { publicVariables, theme } from "../theme/theme.css";

export const root = style({
  width: "100%",
  maxWidth: "95vw",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
});

export const inner = style({
  position: "relative",
  padding: "10px 0",
});

export const hidden = style({
  opacity: 0,
  padding: "0 5px",
});

export const fontSlashAnimation = style({
  fontSize: `clamp(${theme.font.size["2xl-title"]}, 6vw, ${theme.font.size["5xl"]})`,
  fontWeight: theme.font.weight.bold,
  lineHeight: 1.05,
  letterSpacing: "-.022em",
});

export const title = style({
  color: publicVariables.color.foreground,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(to right, rgba(41, 105, 255, 0), rgba(41, 105, 255, 0.15))",
  clipPath:
    "polygon(0 0, var(--x-percentage) 0, var(--x-percentage) 120%, 0 120%)",
  width: "100%",
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "0 calc(var(--x-percentage) - 100% + 2px)",
  borderRadius: "0 0 10px 0",
});

export const dots = style({
  color: publicVariables.color.tertiary,
  clipPath:
    "polygon(var(--x-percentage) 0, 100% 0, 100% 120%, var(--x-percentage) 120%)",
  width: "100%",
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const slash = style({
  width: "12px",
  height: "100%",
  top: "50%",
  backgroundColor: publicVariables.color.primary,
  borderRadius: "3.2px",
  position: "absolute",
  left: "var(--x-percentage)",
  transform: "skewX(-8deg) translateX(-10px) translateY(-50%)",
  boxShadow: theme.boxShadow.shadow300,
});
