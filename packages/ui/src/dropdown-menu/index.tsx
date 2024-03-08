import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import { ReactNode } from "react";
import { ChevronDown } from "../icon/chevron-down";
import * as styles from "./style.css";

type Item = {
  content: ReactNode;
  subLabel?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

type Props = {
  label: string;
  items: Item[];
  variant?: keyof typeof styles.variants;
  triggerClassName?: string;
  contentClassName?: string;
  contentProps?: RadixDropdownMenu.DropdownMenuContentProps;
};

export const DropdownMenu: React.FC<Props> = ({
  label,
  items,
  variant = "default",
  triggerClassName,
  contentClassName,
  contentProps,
}) => {
  return (
    <div className="sid-dropdown-menu">
      <RadixDropdownMenu.Root>
        <RadixDropdownMenu.Trigger
          className={clsx(
            styles.trigger,
            styles.variants[variant],
            triggerClassName
          )}
        >
          <span className={styles.label}>{label}</span>
          <ChevronDown className={styles.chevronDown} />
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Content
          className={clsx(styles.content, contentClassName)}
          {...contentProps}
        >
          {items.map(({ content, subLabel, onClick }, index) => (
            <RadixDropdownMenu.Item
              className={styles.item}
              key={index}
              onClick={onClick}
            >
              <div className={styles.labelWrapper}>
                <div>{content}</div>
                {subLabel && <div className={styles.subLabel}>{subLabel}</div>}
              </div>
            </RadixDropdownMenu.Item>
          ))}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Root>
    </div>
  );
};
