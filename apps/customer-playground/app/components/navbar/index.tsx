import { Badge, Button, ShoppingCart } from "@slashid/ui";
import { useEffect, useRef } from "react";
import { CART_PATH } from "~/domain/paths";
import { useIsLoggedIn } from "~/hooks/use-is-logged-in";
import { useOptimisticSumOfCartItemQuantities } from "~/hooks/use-optimistic-sum-of-cart-item-quantities";
import NavLink from "../navlink";
import SlashIDLogoLink from "../slash-id-logo-link";
import {
  longBadge,
  navbar,
  pinnedNavbar,
  shoppingCartLink,
  shortBadge,
  rightLinks,
} from "./style.css";
import UserDropdown from "./user-dropdown";

export default function Navbar() {
  const sumOfCartItemQuantities = useOptimisticSumOfCartItemQuantities();
  const { isLoggedIn } = useIsLoggedIn();
  const navbarRef = useRef<HTMLDivElement>(null);

  const hasCartItems = sumOfCartItemQuantities > 0;
  const hasLongBadge = sumOfCartItemQuantities > 9;

  useEffect(() => {
    const navbarElement = navbarRef.current!;

    // this toggles a class when scrolling
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle(pinnedNavbar, e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(navbarElement);

    return () => observer.unobserve(navbarElement);
  }, []);

  return (
    <nav className={navbar} ref={navbarRef}>
      <SlashIDLogoLink />
      <div className={rightLinks}>
        {isLoggedIn && (
          <>
            <UserDropdown />
            <NavLink
              to={CART_PATH}
              prefetch="intent"
              className={shoppingCartLink}
            >
              <ShoppingCart />
              {hasCartItems && (
                <Badge
                  className={hasLongBadge ? longBadge : shortBadge}
                  variant={{ size: hasLongBadge ? "long" : "short" }}
                >
                  {sumOfCartItemQuantities}
                </Badge>
              )}
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
