import { clsx } from "clsx";
import {
  toggle,
  toggleActive,
  toggleDisabled,
  toggleReadOnly,
} from "./toggle-button.css";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  testId?: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
  disabled?: boolean;
  active?: boolean;
};

export const ToggleButton: React.FC<Props> = ({
  onClick,
  children,
  className,
  testId,
  style,
  readOnly = false,
  disabled = false,
  active = false,
}) => {
  return (
    <button
      data-testid={testId}
      disabled={disabled}
      type="button"
      className={clsx(
        "sid-toggle-button",
        { [toggleReadOnly]: readOnly },
        { [toggleDisabled]: disabled },
        { [toggleActive]: active },
        toggle,
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};
