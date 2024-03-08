import { useMemo } from "react";
import { useOptimisticCartItems } from "./use-optimistic-cart-items";

/**
 * This hook returns the number of optimistic cart items.
 */
export const useOptimisticCartItemsCount = () => {
  const cartItems = useOptimisticCartItems();
  const cartItemsCount = useMemo(() => cartItems.length || 0, [cartItems]);

  return cartItemsCount;
};
