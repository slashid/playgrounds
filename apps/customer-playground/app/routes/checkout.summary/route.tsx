import type { LoaderArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { PAYMENT_PATH } from "~/domain/paths";
import { getPaymentDetails, getUserAttributes } from "~/domain/user/user";
import { getToken } from "~/services/session.server";
import { BackButton } from "../checkout/nav-buttons";
import PaymentPanel from "./payment-panel";
import ShippingPanel from "./shipping-panel";
import ShoppingCartPanel from "./shopping-cart-panel";
import { footer, summary } from "./style.css";

export async function loader({ request }: LoaderArgs) {
  const token = await getToken(request);
  // TODO: find a way to use cached UserAttributes from the root loader
  const attributes = await getUserAttributes(token);

  if (!getPaymentDetails(attributes)) return redirect(PAYMENT_PATH);
  return json({});
}

export default function SummaryPage() {
  return (
    <div className={summary}>
      <ShoppingCartPanel />
      <ShippingPanel />
      <PaymentPanel />
      <div className={footer}>
        <BackButton />
      </div>
    </div>
  );
}
