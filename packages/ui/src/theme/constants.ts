export const classNames = {
  root: "sid-theme-root",
  getThemeVariant: (theme: "light" | "dark") => `${classNames.root}__${theme}`,
};
