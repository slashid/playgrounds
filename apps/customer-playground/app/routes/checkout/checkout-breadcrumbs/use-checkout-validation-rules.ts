import { PAYMENT_PATH, SHIPPING_PATH, SUMMARY_PATH } from "~/domain/paths";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { useOptimisticPaymentDetails } from "~/hooks/use-optimistic-payment-details";
import { useOptimisticShippingDetails } from "~/hooks/use-optimistic-shipping-details";
import { isFalsy } from "~/utils/utils";
import type { Pathname } from "../steps";

type ValidationRule = {
  pathname: Pathname;
  shouldDisablePath: boolean;
};

/**
 * This hook returns an array of objects containing validation rules for each checkout step.
 */
export function useCheckoutValidationRules(): ValidationRule[] {
  const cartItems = useOptimisticCartItems();
  const shippingDetails = useOptimisticShippingDetails();
  const paymentDetails = useOptimisticPaymentDetails();

  return [
    {
      pathname: SHIPPING_PATH,
      shouldDisablePath: isFalsy(cartItems),
    },
    {
      pathname: PAYMENT_PATH,
      shouldDisablePath: !shippingDetails,
    },
    {
      pathname: SUMMARY_PATH,
      shouldDisablePath: !paymentDetails,
    },
  ];
}
