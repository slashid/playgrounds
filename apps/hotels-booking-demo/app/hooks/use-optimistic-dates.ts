import { useRouteLoaderData } from "./use-route-loader-data";
import { useOptimisticFormFieldValue } from "./use-optimistic-form-field-value";
import { BOOK_NOW_API_PATH, ROOT_ROUTE_ID } from "~/domain/paths";
import type { CurrentBookingLoaderData } from "~/domain/user/types";
import type { Dates, Room } from "~/domain/product/types";

export const useOptimisticDates = () => {
  const { dates } = useRouteLoaderData<CurrentBookingLoaderData>(ROOT_ROUTE_ID);
  const submittedCurrentBooking = useOptimisticFormFieldValue<Dates>(
    "dates",
    "/update-dates"
  );

  const optimisticCartItems = submittedCurrentBooking || dates || null;

  return optimisticCartItems;
};
