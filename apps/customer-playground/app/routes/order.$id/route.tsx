import { Text } from "@slashid/ui";
import type { LoaderArgs, TypedResponse } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import NavLink from "~/components/navlink";
import { HOME_PATH } from "~/domain/paths";
import type { OrderLoaderData } from "~/domain/user/types";
import {
  findOrderById,
  getOrders,
  getUserAttributes,
} from "~/domain/user/user";
import { getToken, validateRequest } from "~/services/session.server";
import OrderDetails from "./order-details";
import OrderedItems from "./ordered-items";
import ShippingDetails from "./shipping-details";
import { footer, wrapper } from "./style.css";

export const config = { runtime: "edge" };

type LoaderResponseData = Promise<TypedResponse<OrderLoaderData | {}>>;

export async function loader({
  request,
  params: { id },
}: LoaderArgs): LoaderResponseData {
  if (!id) return redirect(HOME_PATH);

  await validateRequest(request);

  const token = await getToken(request);
  // TODO: find a way to use cached UserAttributes from the root loader
  const attributes = await getUserAttributes(token);
  const orders = getOrders(attributes);

  return json({ order: findOrderById(orders, id) });
}

export default function OrderPage() {
  return (
    <div className={wrapper}>
      <Text
        as="h1"
        variant={{ size: "2xl-title", weight: "bold", color: "foreground" }}
      >
        Purchase completed!
      </Text>
      <OrderDetails />
      <OrderedItems />
      <ShippingDetails />
      <div className={footer}>
        <NavLink to={HOME_PATH} prefetch="intent" as="button">
          <Text
            as="span"
            variant={{
              weight: "semibold",
              color: "white",
            }}
          >
            Continue shopping
          </Text>
        </NavLink>
      </div>
    </div>
  );
}
