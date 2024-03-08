import { ROOT_ROUTE_ID, UPDATE_CART_API_PATH } from "~/domain/paths";
import type { CartItems, CartItemsLoaderData } from "~/domain/user/types";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";
import { useOptimisticFormFieldValue } from "./use-optimistic-form-field-value";

/**
 * This hook returns the optimistic cart items that are currently either being submitted/loaded to/from the server.
 */
export const useOptimisticCartItems = () => {
  const { cartItems } = useRouteLoaderData<CartItemsLoaderData>(ROOT_ROUTE_ID);
  const submittedCartItems = useOptimisticFormFieldValue<CartItems>(
    "cartItems",
    UPDATE_CART_API_PATH
  );

  const optimisticCartItems = submittedCartItems || cartItems || [];

  return optimisticCartItems;
};
