import { ROOT_ROUTE_ID, UPDATE_PAYMENT_API_PATH } from "~/domain/paths";
import type {
  PaymentDetails,
  PaymentDetailsLoaderData,
} from "~/domain/user/types";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";
import { useOptimisticFormFieldValue } from "./use-optimistic-form-field-value";
import { useSlashID } from "@slashid/react";

/**
 * This hook returns the optimistic payment details that are currently either being submitted/loaded to/from the server.
 */
export const useOptimisticEmail = () => {
  const { email } = useRouteLoaderData<string>(ROOT_ROUTE_ID);
  const submittedEmail = useOptimisticFormFieldValue<string>(
    "email",
    UPDATE_PAYMENT_API_PATH,
    true
  );

  const optimisticEmail = submittedEmail || email || "";

  return optimisticEmail;
};
