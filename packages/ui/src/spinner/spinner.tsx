import clsx from "clsx";
import * as styles from "./spinner.css";

type Props = {
  className?: string;
  variant?: styles.SpinnerColorVariants;
};

export const Spinner: React.FC<Props> = ({ className, variant }) => (
  <div className={clsx(styles.spinner(variant), className)} />
);
