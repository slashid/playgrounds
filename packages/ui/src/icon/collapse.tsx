import { publicVariables } from "../theme/theme.css";

type Props = {
  className?: string;
};

export const Collapse: React.FC<Props> = ({ className }) => (
  <svg
    className={className}
    width="40"
    height="32"
    viewBox="0 0 40 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.7047 11.235C20.4203 11.5362 20.4339 12.0109 20.735 12.2953L24.6577 16L20.735 19.7047C20.4339 19.9892 20.4203 20.4638 20.7047 20.765C20.9891 21.0661 21.4638 21.0797 21.765 20.7953L26.265 16.5453C26.415 16.4036 26.5 16.2063 26.5 16C26.5 15.7937 26.415 15.5964 26.265 15.4547L21.765 11.2047C21.4638 10.9203 20.9891 10.9339 20.7047 11.235Z"
      fill={publicVariables.color.foreground}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.7047 11.235C14.4203 11.5362 14.4339 12.0109 14.735 12.2953L18.6577 16L14.735 19.7047C14.4339 19.9892 14.4203 20.4638 14.7047 20.765C14.9891 21.0661 15.4638 21.0797 15.765 20.7953L20.265 16.5453C20.415 16.4036 20.5 16.2063 20.5 16C20.5 15.7937 20.415 15.5964 20.265 15.4547L15.765 11.2047C15.4638 10.9203 14.9891 10.9339 14.7047 11.235Z"
      fill={publicVariables.color.foreground}
    />
    <rect
      x="0.5"
      y="0.5"
      width="39"
      height="31"
      rx="11.5"
      stroke={publicVariables.color.foreground}
      strokeOpacity="0.12"
    />
  </svg>
);
