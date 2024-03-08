import { clsx } from "clsx";
import * as styles from "./text.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: styles.TextVariants;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
};

export const Text: React.FC<Props> = ({
  children,
  className,
  variant,
  as = "p",
}) => {
  const Component = as;

  return (
    <Component
      className={clsx(
        "sid-text",
        `sid-text--${as}`,
        styles.text(variant),
        className
      )}
    >
      {children}
    </Component>
  );
};
