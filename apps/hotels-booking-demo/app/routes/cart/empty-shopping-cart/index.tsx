import { Text } from "@slashid/ui";
import NavLink from "~/components/navlink";
import { HOME_PATH } from "~/domain/paths";
import { useOptimisticCartItemsCount } from "~/hooks/use-optimistic-cart-items-count";
import {
  emptyShoppingCart,
  emptyShoppingCartWrapper,
  navigationBtn,
} from "./style.css";

export default function EmptyShoppingCart() {
  const cartItemsCount = useOptimisticCartItemsCount();

  if (cartItemsCount > 0) return null;

  return (
    <div className={emptyShoppingCart}>
      <div className={emptyShoppingCartWrapper}>
        <Text
          variant={{
            size: "2xl-title",
            weight: "bold",
            color: "placeholder",
          }}
        >
          Your shopping cart is empty.
        </Text>
        <NavLink
          className={navigationBtn}
          to={HOME_PATH}
          prefetch="intent"
          as="button"
        >
          <Text
            as="span"
            variant={{
              weight: "semibold",
              color: "white",
            }}
          >
            Go shopping
          </Text>
        </NavLink>
      </div>
    </div>
  );
}
