import { publicVariables } from "../theme/theme.css";

type Props = {
  className?: string;
};

export const Slash: React.FC<Props> = ({ className }) => (
  <svg
    className={className}
    width="9"
    height="12"
    viewBox="0 0 9 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.33933 0L0 12H1.89717L8.2365 0H6.33933Z"
      fill={publicVariables.color.foreground}
      fillOpacity="0.5"
    />
  </svg>
);
