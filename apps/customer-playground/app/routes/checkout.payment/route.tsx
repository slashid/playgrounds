import type { LoaderArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { SHIPPING_PATH } from "~/domain/paths";
import { getShippingDetails, getUserAttributes } from "~/domain/user/user";
import { getToken } from "~/services/session.server";
import { PaymentForm } from "./payment-form";

export async function loader({ request }: LoaderArgs) {
  const token = await getToken(request);
  // TODO: find a way to use cached UserAttributes from the root loader
  const attributes = await getUserAttributes(token);

  if (!getShippingDetails(attributes)) return redirect(SHIPPING_PATH);
  return json({});
}

export default function PaymentPage() {
  return <PaymentForm />;
}
