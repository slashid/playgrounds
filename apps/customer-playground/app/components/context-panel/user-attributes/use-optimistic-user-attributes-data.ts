import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { useOptimisticOrders } from "~/hooks/use-optimistic-orders";
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
  const cartItems = useOptimisticCartItems();
  const shippingDetails = useOptimisticShippingDetails();
  const paymentDetails = useOptimisticPaymentDetails();
  const orders = useOptimisticOrders();

  const userAttributes = [
    { dataId: "cartItems", data: cartItems },
    { dataId: "shippingDetails", data: shippingDetails },
    { dataId: "paymentDetails", data: paymentDetails },
    { dataId: "orders", data: orders },
  ];

  // We need to hide the component instead of returning null to trigger the animation on the next update
  const hideComponent = userAttributes.map(({ data }) => data).every(isFalsy);

  return { hideComponent, userAttributes };
};
