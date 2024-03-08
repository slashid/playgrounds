import { ROOT_ROUTE_ID, UPDATE_SHIPPING_API_PATH } from "~/domain/paths";
import type {
  ShippingDetails,
  ShippingDetailsLoaderData,
} from "~/domain/user/types";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";
import { useOptimisticFormFieldValue } from "./use-optimistic-form-field-value";

/**
 * This hook returns the optimistic shipping details that are currently either being submitted/loaded to/from the server.
 */
export const useOptimisticShippingDetails = (
  emptyShippingDetails?: ShippingDetails
) => {
  const { shippingDetails } =
    useRouteLoaderData<ShippingDetailsLoaderData>(ROOT_ROUTE_ID);
  const submittedShippingDetails = useOptimisticFormFieldValue<ShippingDetails>(
    "shippingDetails",
    UPDATE_SHIPPING_API_PATH
  );

  const optimisticShippingDetails =
    submittedShippingDetails || shippingDetails || emptyShippingDetails;

  return optimisticShippingDetails;
};
