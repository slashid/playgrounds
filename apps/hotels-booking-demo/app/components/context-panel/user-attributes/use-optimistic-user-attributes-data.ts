import { useIsLoggedIn } from "~/hooks/use-is-logged-in";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { useOptimisticCurrentBooking } from "~/hooks/use-optimistic-current-booking";
import { useOptimisticDates } from "~/hooks/use-optimistic-dates";
import { useOptimisticOrders } from "~/hooks/use-optimistic-orders";
import { useOptimisticPastBookings } from "~/hooks/use-optimistic-past-bookings";
import { useOptimisticPaymentDetails } from "~/hooks/use-optimistic-payment-details";
import { useOptimisticShippingDetails } from "~/hooks/use-optimistic-shipping-details";
import { isFalsy } from "~/utils/utils";

type UserAttribute = {
  dataId: string;
  data: any;
};

type UserAttributesData = {
  hideComponent: boolean;
  userAttributes: UserAttribute[];
};

/**
 * This hook returns the optimistic user attributes that are currently either being submitted/loaded to/from the server.
 */
export const useOptimisticUserAttributesData = (): UserAttributesData => {
  const { isLoggedIn } = useIsLoggedIn();
  // const cartItems = useOptimisticCartItems();
  // const shippingDetails = useOptimisticShippingDetails();
  const paymentDetails = useOptimisticPaymentDetails();
  // const orders = useOptimisticOrders();
  const currentBooking = useOptimisticCurrentBooking();
  const dates = useOptimisticDates();
  const pastBookings = useOptimisticPastBookings();

  const userAttributes = [
    // { dataId: "cartItems", data: cartItems },
    { dataId: "currentBooking", data: currentBooking },
    { dataId: "dates", data: dates },
    // { dataId: "shippingDetails", data: shippingDetails },
    { dataId: "paymentDetails", data: paymentDetails },
    // { dataId: "orders", data: orders },
    ...(isLoggedIn ? [{ dataId: "pastBookings", data: pastBookings }] : []),
  ];

  // We need to hide the component instead of returning null to trigger the animation on the next update
  const hideComponent = userAttributes.map(({ data }) => data).every(isFalsy);

  return { hideComponent, userAttributes };
};
