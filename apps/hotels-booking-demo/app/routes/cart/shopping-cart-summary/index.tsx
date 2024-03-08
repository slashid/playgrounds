import { Text } from "@slashid/ui";
import CartSummary from "~/components/cart-summary";
import NavLink from "~/components/navlink";
import { SHIPPING_PATH } from "~/domain/paths";
import { useOptimisticSumOfCartItemQuantities } from "~/hooks/use-optimistic-sum-of-cart-item-quantities";
import { summary } from "./style.css";

export default function ShoppingCartSummary() {
  const sumOfCartItemQuantities = useOptimisticSumOfCartItemQuantities();

  if (sumOfCartItemQuantities === 0) return null;

  return (
    <CartSummary
      className={summary}
      header={`${sumOfCartItemQuantities} items`}
      footer={
        <NavLink to={SHIPPING_PATH} prefetch="intent" as="button">
          <Text
            as="span"
            variant={{
              weight: "semibold",
              color: "white",
            }}
          >
            Go to checkout
          </Text>
        </NavLink>
      }
    />
  );
}
