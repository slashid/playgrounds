import clsx from "clsx";
import * as styles from "./style.css";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: styles.BadgeVariants;
};

export const Badge: React.FC<Props> = ({
  children,
  className,
  variant = { size: "short", state: "active" },
}) => {
  return (
    <span
      className={clsx(
        "sid-badge",
        `sid-badge--${variant.size}--${variant.state}`,
        styles.badge(variant),
        className
      )}
    >
      {children}
    </span>
  );
};
