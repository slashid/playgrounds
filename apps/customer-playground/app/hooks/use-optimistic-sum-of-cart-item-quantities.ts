import { useMemo } from "react";
import { calculateSumOfQuantities } from "~/domain/user/user";
import { useOptimisticCartItems } from "./use-optimistic-cart-items";

/**
 * This hook returns the sum of quantities of the optimistic cart items.
 */
export const useOptimisticSumOfCartItemQuantities = () => {
  const cartItems = useOptimisticCartItems();

  const sumOfCartItemQuantities = useMemo(
    () => calculateSumOfQuantities(cartItems),
    [cartItems]
  );

  return sumOfCartItemQuantities;
};
