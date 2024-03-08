import { clsx } from "clsx";

type Props = {
  className?: string;
};

export const CheckOnly: React.FC<Props> = ({ className }) => (
  <svg
    className={clsx(className)}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8.69424L5.5 12.0429C5.57942 12.1492 5.73688 12.1549 5.82368 12.0544L13 3.75"
      stroke="#142049"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
