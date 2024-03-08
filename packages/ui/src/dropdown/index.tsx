import * as Select from "@radix-ui/react-select";
import { clsx } from "clsx";
import { Check } from "../icon/check";
import { ChevronDown } from "../icon/chevron-down";
import * as styles from "./dropdown.css";

type Item = {
  label: string;
  subLabel?: string;
  value: string;
};

type Props = {
  label?: string;
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
  contentProps?: Select.SelectContentImplProps;
  type?: "text" | "email" | "tel";
  items: Item[];
  defaultValue?: string;
  variant?: keyof typeof styles.variants;
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  label,
  placeholder,
  items,
  defaultValue,
  variant = "default",
  onChange,
  triggerClassName,
  contentClassName,
  contentProps,
}) => {
  return (
    <div className="sid-dropdown">
      <Select.Root onValueChange={onChange} defaultValue={defaultValue}>
        <Select.Trigger
          className={clsx(
            styles.trigger,
            styles.variants[variant],
            triggerClassName
          )}
        >
          <div>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.input} placeholder={placeholder}>
              <Select.Value />
            </div>
          </div>
          <ChevronDown className={styles.chevronDown} />
        </Select.Trigger>

        <Select.Content
          className={clsx(styles.content, contentClassName)}
          {...contentProps}
        >
          <Select.Viewport className={styles.viewport}>
            <Select.Group>
              {items.map(({ label, value, subLabel }) => (
                <Select.Item className={styles.item} key={label} value={value}>
                  <div className={styles.labelWrapper}>
                    <Select.ItemText>{label}</Select.ItemText>
                    {subLabel && (
                      <Select.Label className={styles.subLabel}>
                        {subLabel}
                      </Select.Label>
                    )}
                  </div>
                  <Select.ItemIndicator>
                    <Check />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Root>
    </div>
  );
};
