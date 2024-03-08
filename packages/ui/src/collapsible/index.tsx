import * as RadixCollapsible from "@radix-ui/react-collapsible";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "../icon/chevron-down";
import { ChevronLeft } from "../icon/chevron-left";
import { ChevronRight } from "../icon/chevron-right";
import { ChevronUp } from "../icon/chevron-up";
import { collapsibleContent, trigger } from "./style.css";

type Props = {
  content: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  defaultOpen?: boolean;
  variant?: keyof typeof collapsibleContent;
  triggerLeft?: React.ReactNode;
  triggerRight?: React.ReactNode;
  triggerDown?: React.ReactNode;
  triggerUp?: React.ReactNode;
};

export const Collapsible: React.FC<Props> = ({
  content,
  className,
  triggerClassName,
  defaultOpen = false,
  variant = "vertical",
  triggerLeft = <ChevronLeft />,
  triggerRight = <ChevronRight />,
  triggerDown = <ChevronDown />,
  triggerUp = <ChevronUp />,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentElement = contentRef.current!;
    const { offsetWidth, offsetHeight } = contentElement;

    // Set width and height CSS variables for the content element transition animation
    contentElement?.style.setProperty(
      "--collapsible-content-width",
      `${offsetWidth}px`
    );
    contentElement?.style.setProperty(
      "--collapsible-content-height",
      `${offsetHeight}px`
    );
  }, []);

  if (!content) return null;

  const isVertical = variant === "vertical";
  const openTrigger = isVertical ? triggerUp : triggerRight;
  const closeTrigger = isVertical ? triggerDown : triggerLeft;

  return (
    <RadixCollapsible.Root
      className={clsx("sid-collapsible", className)}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={setOpen}
    >
      <RadixCollapsible.Trigger className={clsx(trigger, triggerClassName)}>
        {open ? openTrigger : closeTrigger}
      </RadixCollapsible.Trigger>
      <div
        ref={contentRef}
        data-state={open ? "open" : "closed"}
        className={collapsibleContent[variant]}
      >
        {content}
      </div>
    </RadixCollapsible.Root>
  );
};
