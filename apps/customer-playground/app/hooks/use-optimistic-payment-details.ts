import { ROOT_ROUTE_ID, UPDATE_PAYMENT_API_PATH } from "~/domain/paths";
import type {
  PaymentDetails,
  PaymentDetailsLoaderData,
} from "~/domain/user/types";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";
import { useOptimisticFormFieldValue } from "./use-optimistic-form-field-value";

/**
 * This hook returns the optimistic payment details that are currently either being submitted/loaded to/from the server.
 */
export const useOptimisticPaymentDetails = (
  emptyPaymentDetails?: PaymentDetails
) => {
  const { paymentDetails } =
    useRouteLoaderData<PaymentDetailsLoaderData>(ROOT_ROUTE_ID);
  const submittedPaymentDetails = useOptimisticFormFieldValue<PaymentDetails>(
    "paymentDetails",
    UPDATE_PAYMENT_API_PATH
  );

  const optimisticPaymentDetails =
    submittedPaymentDetails || paymentDetails || emptyPaymentDetails;

  return optimisticPaymentDetails;
};
