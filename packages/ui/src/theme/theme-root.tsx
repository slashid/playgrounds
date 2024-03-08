import { clsx } from "clsx";
import { darkTheme, themeClass } from "./theme.css";
import { classNames } from "./constants";

type Props = {
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
};

/**
 * This component is to be rendered as close as the app root.
 * It sets the proper class names so that child components on all levels can use the theming properties.
 */
export function ThemeRoot({ children, theme = "light", className }: Props) {
  return (
    <div
      className={clsx(
        classNames.root,
        classNames.getThemeVariant(theme),
        themeClass,
        { [darkTheme]: theme === "dark" },
        className
      )}
    >
      {children}
    </div>
  );
}
