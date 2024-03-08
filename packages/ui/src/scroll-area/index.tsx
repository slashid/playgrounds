import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import clsx from "clsx";
import {
  scrollAreaRoot,
  viewport,
  scrollbar,
  thumb,
  corner,
} from "./style.css";

type Props = RadixScrollArea.ScrollAreaProps & {
  viewportClassName?: string;
};

export const ScrollArea: React.FC<Props> = ({
  className,
  viewportClassName,
  children,
  ...props
}) => {
  return (
    <RadixScrollArea.Root
      className={clsx(scrollAreaRoot, className)}
      {...props}
    >
      <RadixScrollArea.Viewport
        className={clsx(viewport, viewportClassName)}
        // We need to set asChild to true only if viewportClassName prop is passed to override radix viewport inline style
        asChild={!!viewportClassName}
      >
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar orientation="horizontal" className={scrollbar}>
        <RadixScrollArea.Thumb className={thumb} />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar orientation="vertical" className={scrollbar}>
        <RadixScrollArea.Thumb className={thumb} />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner className={corner} />
    </RadixScrollArea.Root>
  );
};
