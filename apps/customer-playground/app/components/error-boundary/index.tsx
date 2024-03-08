import { useLocation, useRouteError } from "@remix-run/react";
import { ExternalLink, Text } from "@slashid/ui";
import { useEffect } from "react";
import { captureException } from "~/services/sentry";
import NavLink from "../navlink";
import { link, wrapper } from "./style.css";

export const ErrorBoundary = () => {
  const { pathname } = useLocation();
  const error = useRouteError();

  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <div className={wrapper}>
      <Text as="h1">An unexpected error happened!</Text>
      <br />
      <Text>
        Try{" "}
        <NavLink to={pathname} prefetch="intent" className={link}>
          reloading
        </NavLink>{" "}
        the application or{" "}
        <ExternalLink href="mailto:contact@slashid.dev">
          <Text as="span" variant={{ color: "contrast" }}>
            contacting us
          </Text>
        </ExternalLink>{" "}
        for support.
      </Text>
    </div>
  );
};
