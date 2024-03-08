import { publicVariables } from "../theme/theme.css";

type Props = {
  className?: string;
};

export const Email: React.FC<Props> = ({ className }) => (
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
      d="M0.504858 2.83367C0.21875 3.39518 0.21875 4.13025 0.21875 5.60039V8.39637C0.21875 9.86651 0.21875 10.6016 0.504858 11.1631C0.756526 11.657 1.1581 12.0586 1.65202 12.3103C2.21354 12.5964 2.94861 12.5964 4.41875 12.5964H9.58125C11.0514 12.5964 11.7865 12.5964 12.348 12.3103C12.8419 12.0586 13.2435 11.657 13.4951 11.1631C13.7812 10.6016 13.7812 9.86651 13.7812 8.39637V5.60039C13.7812 4.13025 13.7812 3.39518 13.4951 2.83367C13.2435 2.33974 12.8419 1.93817 12.348 1.6865C11.7865 1.40039 11.0514 1.40039 9.58125 1.40039H4.41875C2.94861 1.40039 2.21354 1.40039 1.65202 1.6865C1.1581 1.93817 0.756526 2.33974 0.504858 2.83367ZM3.39101 3.81475C3.10424 3.59879 2.69671 3.6562 2.48076 3.94297C2.26481 4.22974 2.32222 4.63727 2.60899 4.85322L6.45944 7.7528C6.78502 7.99798 7.23373 7.99752 7.5588 7.75165L11.3921 4.8524C11.6784 4.63585 11.735 4.2282 11.5184 3.94189C11.3019 3.65557 10.8942 3.59901 10.6079 3.81556L7.00785 6.5384L3.39101 3.81475Z"
      // HACK: fill color is used as inlined style here to override the color setting from the SDK
      style={{ fill: publicVariables.color.primary300 }}
    />
  </svg>
);