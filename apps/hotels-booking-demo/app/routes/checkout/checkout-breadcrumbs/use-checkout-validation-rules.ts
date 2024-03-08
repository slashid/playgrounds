import {
  DETAILS_PATH,
  PAYMENT_PATH,
  SHIPPING_PATH,
  SUMMARY_PATH,
} from "~/domain/paths";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { useOptimisticPaymentDetails } from "~/hooks/use-optimistic-payment-details";
import { useOptimisticShippingDetails } from "~/hooks/use-optimistic-shipping-details";
import { isFalsy } from "~/utils/utils";
import type { Pathname } from "../steps";
import { useOptimisticCurrentBooking } from "~/hooks/use-optimistic-current-booking";

type ValidationRule = {
  pathname: Pathname;
  shouldDisablePath: boolean;
};

/**
 * This hook returns an array of objects containing validation rules for each checkout step.
 */
export function useCheckoutValidationRules(): ValidationRule[] {
  const currentBooking = useOptimisticCurrentBooking();
  const shippingDetails = useOptimisticShippingDetails();
  const paymentDetails = useOptimisticPaymentDetails();

  return [
    {
      pathname: DETAILS_PATH,
      shouldDisablePath: false,
    },
    {
      pathname: PAYMENT_PATH,
      shouldDisablePath: false,
    },
    {
      pathname: SUMMARY_PATH,
      shouldDisablePath: false,
    },
  ];
}
