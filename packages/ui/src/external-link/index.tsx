import clsx from "clsx";
import React from "react";
import { ArrowTopRight } from "../icon/arrow-top-right";
import { link } from "./style.css";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export const ExternalLink: React.FC<Props> = ({
  children,
  href,
  className,
}) => {
  return (
    <a
      className={clsx("sid-external-link", link, className)}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span>{children}</span>
      <ArrowTopRight />
    </a>
  );
};
