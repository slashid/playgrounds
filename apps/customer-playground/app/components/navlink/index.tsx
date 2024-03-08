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

const NavLink: React.FC<Props> = ({
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
        <RemixNavLink className={clsx(navLink, buttonLink)} {...props}>
          {children}
        </RemixNavLink>
      </Button>
    );
  }

  return (
    <RemixNavLink className={clsx(navLink, className)} {...props}>
      {children}
    </RemixNavLink>
  );
};

export default NavLink;
