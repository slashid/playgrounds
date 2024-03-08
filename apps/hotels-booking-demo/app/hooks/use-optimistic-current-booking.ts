import { useRouteLoaderData } from "./use-route-loader-data";
import { useOptimisticFormFieldValue } from "./use-optimistic-form-field-value";
import { BOOK_NOW_API_PATH, ROOT_ROUTE_ID } from "~/domain/paths";
import type { CurrentBookingLoaderData } from "~/domain/user/types";
import type { Room } from "~/domain/product/types";

export const useOptimisticCurrentBooking = () => {
  const { currentBooking } =
    useRouteLoaderData<CurrentBookingLoaderData>(ROOT_ROUTE_ID);
  const submittedCurrentBooking = useOptimisticFormFieldValue<Room>(
    "currentBooking",
    BOOK_NOW_API_PATH
  );

  const optimisticCartItems = submittedCurrentBooking || currentBooking || null;

  return optimisticCartItems;
};
