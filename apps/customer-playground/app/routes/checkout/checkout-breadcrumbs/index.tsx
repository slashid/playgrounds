import { useLocation, useNavigate } from "@remix-run/react";
import { Breadcrumbs } from "@slashid/ui";
import UnclickableNavLink from "~/components/navlink/unclickable-nav-link";
import { getFlatPathname, getNestedPathname, isValidPathname } from "../steps";
import * as styles from "./style.css";
import { useCheckoutValidationRules } from "./use-checkout-validation-rules";

export default function CheckoutBreadcrumbs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const validationRules = useCheckoutValidationRules();

  const breadcrumbs = validationRules.map(({ pathname, shouldDisablePath }) => {
    const name = getFlatPathname(pathname);
    return {
      name,
      content: (
        <UnclickableNavLink
          to={pathname}
          disabled={shouldDisablePath}
          prefetch="intent"
        >
          {name}
        </UnclickableNavLink>
      ),
      disabled: shouldDisablePath,
    };
  });

  const currentPathname = getFlatPathname(pathname);

  const handleNavigation = (path: string) => {
    if (!isValidPathname(path)) return;
    navigate(getNestedPathname(path));
  };

  return (
    <Breadcrumbs
      // key here is needed to force the breadcrumbs to re-render when the defaultValue changes
      key={currentPathname}
      className={styles.breadcrumbs}
      defaultValue={currentPathname}
      onValueChange={handleNavigation}
      breadcrumbs={breadcrumbs}
    />
  );
}
