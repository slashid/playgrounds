import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { FocusEventHandler } from "react";
import { radioGroupItem } from "./style.css";

type Item = {
  id: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
};

type Props = {
  className?: string;
  itemClassName?: string;
  itemBtnClassName?: string;
  items: Item[];
  onValueChange: (value: string) => void;
  value?: string;
  defaultValue?: string;
  onItemBlur?: FocusEventHandler;
};

export const RadioGroup: React.FC<Props> = ({
  className,
  itemClassName,
  itemBtnClassName,
  items,
  defaultValue,
  value,
  onValueChange,
  onItemBlur,
}) => {
  return (
    <RadixRadioGroup.Root
      className={clsx("sid-radio-group", className)}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      aria-label="SlashID Radio Group"
    >
      {items.map(({ id, content, footer }) => (
        <div key={id} className={itemClassName}>
          <RadixRadioGroup.Item
            value={id}
            onBlur={onItemBlur}
            className={clsx(radioGroupItem, itemBtnClassName)}
            asChild
          >
            <div>{content}</div>
          </RadixRadioGroup.Item>
          {footer}
        </div>
      ))}
    </RadixRadioGroup.Root>
  );
};
