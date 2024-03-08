import { useLocation } from "@remix-run/react";
import { ScrollArea, Text } from "@slashid/ui";
import { Fragment, useMemo } from "react";
import { useIsLoggedIn } from "~/hooks/use-is-logged-in";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { useOptimisticMfaThreshold } from "~/hooks/use-optimistic-mfa-threshold";
import { useOptimisticPaymentDetails } from "~/hooks/use-optimistic-payment-details";
import { useOptimisticShippingDetails } from "~/hooks/use-optimistic-shipping-details";
import { useProducts } from "~/hooks/use-products";
import { getBooleanEnvValue } from "~/services/environment-variables";
import type { HandlerContext } from "./handlers";
import { contentHandlers } from "./handlers";
import { contentHeader, contentWrapper } from "./style.css";

export default function ContextPanelContent() {
  const { isLoggedIn, isLoggedInWithDirectID } = useIsLoggedIn();
  const { pathname } = useLocation();
  const cartItems = useOptimisticCartItems();
  const products = useProducts();
  const shippingDetails = useOptimisticShippingDetails();
  const paymentDetails = useOptimisticPaymentDetails();
  const mfaThreshold = useOptimisticMfaThreshold();
  const isMfaEnabled = getBooleanEnvValue("MFA_ENABLED");

  const content = useMemo(() => {
    const handlerContext: HandlerContext = {
      pathname,
      isLoggedIn,
      isLoggedInWithDirectID,
      cartItems,
      products,
      shippingDetails,
      paymentDetails,
      mfaThreshold,
      isMfaEnabled,
    };

    const filteredContent = contentHandlers
      .filter((handler) => handler.test(handlerContext))
      .map(({ id, content }) => <Fragment key={id}>{content}</Fragment>);

    return filteredContent;
  }, [
    pathname,
    isLoggedIn,
    isLoggedInWithDirectID,
    cartItems,
    products,
    shippingDetails,
    paymentDetails,
    mfaThreshold,
    isMfaEnabled,
  ]);

  return (
    <div className={contentWrapper}>
      <Text
        className={contentHeader}
        variant={{ size: "sm", weight: "semibold", color: "foreground" }}
      >
        Context panel
      </Text>
      <ScrollArea type="scroll">{content}</ScrollArea>
    </div>
  );
}
