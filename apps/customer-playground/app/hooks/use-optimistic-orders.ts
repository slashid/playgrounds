import { ROOT_ROUTE_ID, UPDATE_ORDERS_API_PATH } from "~/domain/paths";
import type { Orders, OrdersLoaderData } from "~/domain/user/types";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";
import { useOptimisticFormFieldValue } from "./use-optimistic-form-field-value";

/**
 * This hook returns the optimistic orders that are currently either being submitted/loaded to/from the server.
 */
export const useOptimisticOrders = () => {
  const { orders } = useRouteLoaderData<OrdersLoaderData>(ROOT_ROUTE_ID);
  const submittedOrders = useOptimisticFormFieldValue<Orders>(
    "orders",
    UPDATE_ORDERS_API_PATH
  );

  const optimisticOrders = submittedOrders || orders || [];

  return optimisticOrders;
};
