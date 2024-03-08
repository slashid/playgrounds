import { Button, LinkButton } from "@slashid/ui";
import clsx from "clsx";
import NavLink from "~/components/navlink";
import { useNavPaths } from "../use-nav-paths";
import { hide, next, previous } from "./style.css";

export function BackButton() {
  const { previousPathname, previousNestedPathname } = useNavPaths();

  return (
    <LinkButton
      variant="back"
      className={clsx(previous, { [hide]: !previousPathname })}
      as="span"
    >
      <NavLink to={previousNestedPathname} prefetch="intent">
        Back to {previousPathname}
      </NavLink>
    </LinkButton>
  );
}

export function NextButton({ loading = false }) {
  const { nextPathname } = useNavPaths();

  return (
    <Button
      as="span"
      variant="primaryMedium"
      loading={loading}
      className={clsx(next, { [hide]: !nextPathname })}
    >
      Continue
    </Button>
  );
}
