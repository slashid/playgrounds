import { useFetcher, useLocation, useNavigate } from "@remix-run/react";
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
import { FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import { useOptimisticEmail } from "~/hooks/use-optimistic-email";
import { useIsLoggedIn } from "~/hooks/use-is-logged-in";

export default function CheckoutCartSummary() {
  const { pathname } = useLocation();
  const fetcher = useFetcher();
  const orders = useOptimisticOrders();
  const cartItems = useOptimisticCartItems();
  const shippingDetails = useOptimisticShippingDetails();
  const subtotal = useOptimisticShoppingCartSubtotal();
  const actionLog = useOptimisticActionLogData();
  const [createAccount, setCreateAccount] = useState(false);
  const navigate = useNavigate();
  const email = useOptimisticEmail();
  const { isLoggedIn } = useIsLoggedIn();

  const addNewOrder = () => {
    fetcher.submit(
      {
        createAccount: stringify(createAccount),
        email,
      },
      { action: "/create-booking", method: "post" }
    );
  };

  const footer = isSummaryPage(pathname) ? (
    <>
      {!isLoggedIn ? (
        <FormControlLabel
          control={
            <Checkbox
              value={createAccount}
              onChange={() => setCreateAccount(!createAccount)}
            />
          }
          label="Create account to collect rewards"
        />
      ) : null}

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
    </>
  ) : null;

  return <CartSummary header="Your booking" footer={footer} />;
}
