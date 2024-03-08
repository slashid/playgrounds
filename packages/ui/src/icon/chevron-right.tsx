import { publicVariables } from "../theme/theme.css";

type Props = {
  className?: string;
};

export const ChevronRight: React.FC<Props> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.20474 12.765C4.92033 12.4638 4.93389 11.9891 5.23503 11.7047L9.1577 8L5.23503 4.29526C4.93389 4.01085 4.92033 3.53617 5.20474 3.23503C5.48915 2.93389 5.96383 2.92033 6.26497 3.20474L10.765 7.45474C10.915 7.59642 11 7.79365 11 8C11 8.20634 10.915 8.40358 10.765 8.54526L6.26497 12.7953C5.96383 13.0797 5.48915 13.0661 5.20474 12.765Z"
      fill={publicVariables.color.foreground}
    />
  </svg>
);
