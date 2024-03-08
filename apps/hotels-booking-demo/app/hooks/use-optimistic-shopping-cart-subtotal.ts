import { useMemo } from "react";
import { calculateSubtotal } from "~/domain/user/user";
import { useOptimisticCartItems } from "./use-optimistic-cart-items";
import { useProducts } from "./use-products";

/**
 * This hook returns the optimistic shopping cart subtotal that is currently either being submitted/loaded to/from the server.
 */
export const useOptimisticShoppingCartSubtotal = () => {
  const products = useProducts();
  const cartItems = useOptimisticCartItems();
  const subtotal = useMemo(
    () => calculateSubtotal(cartItems, products),
    [cartItems, products]
  );

  return subtotal;
};
