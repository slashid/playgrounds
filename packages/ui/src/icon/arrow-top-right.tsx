import { publicVariables } from "../theme/theme.css";

type Props = {
  className?: string;
  fill?: string;
};

export const ArrowTopRight: React.FC<Props> = ({
  className,
  fill = publicVariables.color.foreground,
}) => (
  <svg
    className={className}
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.39616 0C1.03372 0 0.73991 0.293813 0.73991 0.65625C0.73991 1.01869 1.03372 1.3125 1.39616 1.3125H3.75809L0.192211 4.87838C-0.0640704 5.13466 -0.0640704 5.55017 0.192211 5.80645C0.448493 6.06273 0.864007 6.06273 1.12029 5.80645L4.68615 2.24059V4.60249C4.68615 4.96493 4.97996 5.25874 5.3424 5.25874C5.70484 5.25874 5.99865 4.96493 5.99865 4.60249V0.65625C5.99865 0.293813 5.70484 0 5.3424 0H1.39616Z"
      fill={fill}
      fillOpacity="0.8"
    />
  </svg>
);
