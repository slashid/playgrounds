import clsx from "clsx";
import { Text } from "../text";
import * as styles from "./panel.css";

type Props = {
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  variant?: styles.PanelVariants;
};

const Panel: React.FC<Props> = ({
  className,
  title,
  icon,
  content,
  variant,
}) => {
  return (
    <div className={clsx("sid-panel", styles.panel(variant), className)}>
      {title && (
        <div className={styles.header}>
          {icon}
          <Text
            variant={{ size: "sm", weight: "semibold", color: "foreground" }}
          >
            {title}
          </Text>
        </div>
      )}
      {content}
    </div>
  );
};

export default Panel;
