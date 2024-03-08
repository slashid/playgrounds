import { Outlet } from "@remix-run/react";
import { Text } from "@slashid/ui";
import type { LoaderArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH, MFA_PATH } from "~/domain/paths";
import { getProducts } from "~/domain/product/product";
import {
  getCartItems,
  getMfaThreshold,
  getUserAttributes,
  hasSingleAuthenticationOnly,
  hasSubtotalGreaterThanMfaThreshold,
} from "~/domain/user/user";
import { getBooleanEnvValue } from "~/services/environment-variables";
import { getToken, validateRequest } from "~/services/session.server";
import { isFalsy } from "~/utils/utils";
import CheckoutBreadcrumbs from "./checkout-breadcrumbs";
import CheckoutCartSummary from "./checkout-cart-summary";
import { contentWrapper, wrapper } from "./style.css";

export const config = { runtime: "edge" };

export async function loader({ request }: LoaderArgs) {
  await validateRequest(request);

  const token = await getToken(request);
  // TODO: find a way to use cached UserAttributes from the root loader
  const attributes = await getUserAttributes(token);
  const cartItems = getCartItems(attributes);
  const products = getProducts();
  const mfaThreshold = getMfaThreshold(attributes);

  const shouldRedirectToHomePage = isFalsy(cartItems);
  const shouldRedirectToMfaPage =
    getBooleanEnvValue("MFA_ENABLED") &&
    hasSubtotalGreaterThanMfaThreshold(cartItems, products, mfaThreshold) &&
    hasSingleAuthenticationOnly(token);

  if (shouldRedirectToHomePage) return redirect(HOME_PATH);

  if (shouldRedirectToMfaPage) {
    const { pathname } = new URL(request.url);
    return redirect(`${MFA_PATH}?redirectTo=${pathname}`);
  }

  return json({});
}

export default function CheckoutPage() {
  return (
    <div className={wrapper}>
      <Text
        as="h1"
        variant={{ size: "2xl-title", weight: "bold", color: "foreground" }}
      >
        Checkout
      </Text>
      <CheckoutBreadcrumbs />
      <div className={contentWrapper}>
        <div>
          <Outlet />
        </div>
        <CheckoutCartSummary />
      </div>
    </div>
  );
}
