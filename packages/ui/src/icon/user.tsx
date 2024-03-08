import { publicVariables } from "../theme/theme.css";

type Props = {
  className?: string;
};

export const User: React.FC<Props> = ({ className }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 7.24401C8.933 7.24401 10.5 5.73431 10.5 3.872C10.5 2.0097 8.933 0.5 7 0.5C5.067 0.5 3.5 2.0097 3.5 3.872C3.5 5.73431 5.067 7.24401 7 7.24401ZM5.4592 8.36352H7H8.5408C8.73504 8.36352 8.83217 8.36352 8.91425 8.36737C10.7181 8.45212 12.1614 9.89538 12.2461 11.6993C12.25 11.7813 12.25 11.8785 12.25 12.0727C12.25 12.1213 12.25 12.1456 12.249 12.1661C12.2278 12.6171 11.867 12.9779 11.4161 12.9991C11.3955 13 11.3713 13 11.3227 13H2.6773C2.62874 13 2.60446 13 2.58394 12.9991C2.13297 12.9779 1.77215 12.6171 1.75096 12.1661C1.75 12.1456 1.75 12.1213 1.75 12.0727C1.75 11.8785 1.75 11.7813 1.75386 11.6993C1.8386 9.89538 3.28187 8.45212 5.08575 8.36737C5.16783 8.36352 5.26496 8.36352 5.4592 8.36352Z"
      // HACK: fill color is used as inlined style here to override the color setting from the SDK
      style={{ fill: publicVariables.color.primary300 }}
    />
  </svg>
);
