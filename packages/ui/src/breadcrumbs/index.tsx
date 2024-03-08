import { clsx } from "clsx";
import * as RadixTabs from "@radix-ui/react-tabs";
import * as styles from "./breadcrumbs.css";
import { Slash } from "../icon/slash";
import { Badge } from "../badge";
import { useState } from "react";

type Breadcrumb = {
  name: string;
  content?: React.ReactNode;
  disabled?: boolean;
};

type Props = {
  breadcrumbs: Breadcrumb[];
  className?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

export const Breadcrumbs: React.FC<Props> = ({
  className,
  breadcrumbs,
  onValueChange,
  defaultValue = breadcrumbs[0].name,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (value: string) => {
    setValue(value);
    onValueChange?.(value);
  };

  if (!breadcrumbs.length) return null;

  return (
    <RadixTabs.Root
      className={clsx("sid-breadcrumbs", className)}
      defaultValue={defaultValue}
      value={value}
      onValueChange={handleValueChange}
    >
      <RadixTabs.List className={styles.list} aria-label="SlashID Breadcrumbs">
        {breadcrumbs.map(({ name, content, disabled = false }, index) => (
          <RadixTabs.Trigger
            key={name}
            value={name}
            className={styles.trigger}
            disabled={disabled}
          >
            <span className={styles.breadcrumb}>
              <Badge
                variant={{
                  size: "short",
                  state: value === name ? "active" : "inactive",
                }}
              >
                {index + 1}
              </Badge>
              {content || name}
              {index < breadcrumbs.length - 1 && <Slash />}
            </span>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};
