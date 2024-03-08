import { publicVariables } from "../theme/theme.css";

type Props = {
  className?: string;
};

export const ChevronUp: React.FC<Props> = ({ className }) => (
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
      d="M8 5C8.20635 5 8.40358 5.08502 8.54526 5.23503L12.7953 9.73503C13.0797 10.0362 13.0661 10.5109 12.765 10.7953C12.4638 11.0797 11.9892 11.0661 11.7047 10.765L8 6.8423L4.29526 10.765C4.01085 11.0661 3.53617 11.0797 3.23503 10.7953C2.9339 10.5109 2.92033 10.0362 3.20474 9.73503L7.45474 5.23503C7.59642 5.08502 7.79366 5 8 5Z"
      stroke={publicVariables.color.foreground}
    />
  </svg>
);
