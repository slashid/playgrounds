import { style } from "@vanilla-extract/css";
import { publicVariables } from "../theme/theme.css";

export const fieldWrapper = style({
  display: "grid",
  gridTemplateRows: "auto auto",
  gap: "2px",
  padding: "12px 16px",
  borderRadius: "16px",
  border: `1px solid ${publicVariables.color.subtle}`,
  backgroundColor: publicVariables.color.offset,
});

export const formGroup = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px 12px",
});

export const input = style({
  all: "unset",
  width: "100%",

  "::placeholder": {
    color: publicVariables.color.placeholder,
  },
});

export const submitButton = style({
  all: "unset",
});

export const field = style({
  display: "grid",
  gap: "8px",
  gridAutoRows: "max-content",
});
