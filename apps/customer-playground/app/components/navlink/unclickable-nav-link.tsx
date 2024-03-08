import type { LinkProps } from "@remix-run/react";
import { NavLink as RemixNavLink } from "@remix-run/react";
import { Button } from "@slashid/ui";
import clsx from "clsx";
import { buttonLink, disabledLink, navLink } from "./style.css";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
  as?: "button";
  disabled?: boolean;
};

/**
 * UnclickableNavLink is a wrapper around Remix's NavLink component that prevents the link from being clicked.
 * This is useful for when you want to show a link inside a button, but you need the button to be clickable instead of the link.
 * A more common use case is when you want to show a link with prefetch="intent" to preload the page on hover, but you don't want the link to be clickable.
 */
const UnclickableNavLink: React.FC<Props> = ({
  children,
  className,
  as,
  disabled = false,
  ...props
}) => {
  if (disabled) {
    return (
      <span
        className={clsx(className, {
          [disabledLink]: disabled,
        })}
        {...props}
      >
        {children}
      </span>
    );
  }

  if (as === "button") {
    return (
      <Button className={className} as="span" variant="primaryNoPadding">
        <RemixNavLink
          className={clsx(navLink, buttonLink)}
          tabIndex={-1}
          onClick={(e) => e.preventDefault()}
          {...props}
        >
          {children}
        </RemixNavLink>
      </Button>
    );
  }

  return (
    <RemixNavLink
      className={clsx(navLink, className)}
      tabIndex={-1}
      onClick={(e) => e.preventDefault()}
      {...props}
    >
      {children}
    </RemixNavLink>
  );
};

export default UnclickableNavLink;
