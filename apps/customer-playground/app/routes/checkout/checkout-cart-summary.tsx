import { useFetcher, useLocation } from "@remix-run/react";
import { Button, Text } from "@slashid/ui";
import CartSummary from "~/components/cart-summary";
import {
  ORDER_PATH,
  UPDATE_ORDERS_API_PATH,
  isSummaryPage,
} from "~/domain/paths";
import { PRODUCT_CURRENCY } from "~/domain/product/constants";
import { Action, OrderStatus } from "~/domain/user/constants";
import { appendToActionLog, createOrder } from "~/domain/user/user";
import { useOptimisticActionLogData } from "~/hooks/use-optimistic-action-log-data";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { useOptimisticOrders } from "~/hooks/use-optimistic-orders";
import { useOptimisticShippingDetails } from "~/hooks/use-optimistic-shipping-details";
import { useOptimisticShoppingCartSubtotal } from "~/hooks/use-optimistic-shopping-cart-subtotal";
import { getDate } from "~/utils/date";
import { stringify } from "~/utils/utils";

export default function CheckoutCartSummary() {
  const { pathname } = useLocation();
  const fetcher = useFetcher();
  const orders = useOptimisticOrders();
  const cartItems = useOptimisticCartItems();
  const shippingDetails = useOptimisticShippingDetails();
  const subtotal = useOptimisticShoppingCartSubtotal();
  const actionLog = useOptimisticActionLogData();

  const addNewOrder = () => {
    const newOrder = createOrder({
      cartItems,
      date: getDate(),
      deliveryDate: getDate(7),
      id: "",
      shippingDetails,
      status: OrderStatus.IN_PREPARATION,
      subtotal: {
        amount: subtotal,
        currency: PRODUCT_CURRENCY,
      },
    });
    const updatedOrders = [newOrder, ...orders];

    fetcher.submit(
      {
        orders: stringify(updatedOrders),
        actionLog: stringify(
          appendToActionLog(actionLog, Action.ORDER_COMPLETED)
        ),
        redirectTo: `${ORDER_PATH}/${newOrder.id}`,
      },
      { action: UPDATE_ORDERS_API_PATH, method: "post" }
    );
  };

  const footer = isSummaryPage(pathname) ? (
    <Button
      variant="primaryMedium"
      onClick={addNewOrder}
      loading={fetcher.state !== "idle"}
    >
      <Text
        as="span"
        variant={{
          weight: "semibold",
          color: "white",
        }}
      >
        Complete purchase
      </Text>
    </Button>
  ) : null;

  return <CartSummary header="Your order" footer={footer} />;
}
