import { ORDER_ID_ROUTE_ID } from "~/domain/paths";
import type { OrderLoaderData } from "~/domain/user/types";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";

/**
 * This hook returns the order that is currently being loaded from the server.
 */
export const useOrder = () => {
  const { order } = useRouteLoaderData<OrderLoaderData>(ORDER_ID_ROUTE_ID);

  return order;
};
