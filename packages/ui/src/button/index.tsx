import { ReactNode } from "react";
import { clsx } from "clsx";
import * as styles from "./button.css";
import { Spinner } from "../spinner/spinner";

type Props = {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  as?: "button" | "span";
  type?: "button" | "submit";
  variant?: keyof typeof styles.button;
  icon?: ReactNode;
  testId?: string;
  disabled?: boolean;
  loading?: boolean;
};

export const Button: React.FC<Props> = ({
  children,
  onClick,
  className,
  as = "button",
  type = "button",
  variant = "primary",
  testId,
  icon,
  disabled = false,
  loading = false,
}) => {
  const Component = as;
  return (
    <Component
      data-testid={testId}
      type={type}
      disabled={disabled}
      className={clsx(
        "sid-button",
        `sid-button--${variant}`,
        styles.button[variant],
        { [styles.buttonDisabled]: disabled },
        className
      )}
      onClick={onClick}
    >
      {loading ? (
        <Spinner variant={{ size: "small" }} />
      ) : (
        <>
          {icon ? <i className={styles.icon}>{icon}</i> : null}
          {children}
        </>
      )}
    </Component>
  );
};
