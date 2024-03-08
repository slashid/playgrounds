import * as RadixPopover from "@radix-ui/react-popover";
import clsx from "clsx";
import React from "react";
import * as styles from "./style.css";

type Props = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  container?: HTMLElement;
  className?: string;
  modal?: boolean;
};

export const Popover: React.FC<Props> = ({
  children,
  trigger,
  container,
  className,
  modal = false,
}) => {
  return (
    <RadixPopover.Root modal={modal}>
      <RadixPopover.Anchor asChild>
        <div className={styles.anchor}>
          <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
        </div>
      </RadixPopover.Anchor>
      <RadixPopover.Portal container={container}>
        <RadixPopover.Content
          className={clsx("sid-popover", styles.content, className)}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
