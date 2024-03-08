import { clsx } from "clsx";

type Props = {
  className?: string;
};

export const AlertCircle: React.FC<Props> = ({ className }) => (
  <svg
    className={clsx(className)}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7ZM7 3.1625C7.35899 3.1625 7.65 3.45352 7.65 3.8125L7.65 7.5625C7.65 7.92148 7.35898 8.2125 7 8.2125C6.64102 8.2125 6.35 7.92148 6.35 7.5625L6.35 3.8125C6.35 3.45351 6.64102 3.1625 7 3.1625ZM7 10.7081C7.46944 10.7081 7.85 10.3276 7.85 9.85812C7.85 9.38868 7.46944 9.00812 7 9.00812C6.53056 9.00812 6.15 9.38868 6.15 9.85812C6.15 10.3276 6.53056 10.7081 7 10.7081Z"
      fill="#FF0042"
    />
  </svg>
);
