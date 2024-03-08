import { useRouteLoaderData } from "./use-route-loader-data";
import { ROOT_ROUTE_ID } from "~/domain/paths";
import type { CurrentBookingLoaderData } from "~/domain/user/types";

export const useOptimisticPastBookings = () => {
  const { pastBookings } =
    useRouteLoaderData<CurrentBookingLoaderData>(ROOT_ROUTE_ID);

  return pastBookings;
};
