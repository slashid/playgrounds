import { publicVariables } from "../theme/theme.css";

type Props = {
  className?: string;
};

export const Expand: React.FC<Props> = ({ className }) => (
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
      d="M20.2953 11.235C20.5797 11.5362 20.5661 12.0109 20.265 12.2953L16.3423 16L20.265 19.7047C20.5661 19.9892 20.5797 20.4638 20.2953 20.765C20.0109 21.0661 19.5362 21.0797 19.235 20.7953L14.735 16.5453C14.585 16.4036 14.5 16.2063 14.5 16C14.5 15.7937 14.585 15.5964 14.735 15.4547L19.235 11.2047C19.5362 10.9203 20.0109 10.9339 20.2953 11.235Z"
      fill={publicVariables.color.foreground}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.2953 11.235C26.5797 11.5362 26.5661 12.0109 26.265 12.2953L22.3423 16L26.265 19.7047C26.5661 19.9892 26.5797 20.4638 26.2953 20.765C26.0109 21.0661 25.5362 21.0797 25.235 20.7953L20.735 16.5453C20.585 16.4036 20.5 16.2063 20.5 16C20.5 15.7937 20.585 15.5964 20.735 15.4547L25.235 11.2047C25.5362 10.9203 26.0109 10.9339 26.2953 11.235Z"
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
