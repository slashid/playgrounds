import { Text } from "@slashid/ui";
import type { LoaderArgs } from "@vercel/remix";
import { json } from "@vercel/remix";
import { validateRequest } from "~/services/session.server";
import EmptyShoppingCart from "./empty-shopping-cart";
import ItemList from "./item-list";
import ShoppingCartSummary from "./shopping-cart-summary";
import { shoppingCart, title } from "./style.css";

export const config = { runtime: "edge" };

export async function loader({ request }: LoaderArgs) {
  await validateRequest(request);
  return json({});
}

export default function CartPage() {
  return (
    <div className={shoppingCart}>
      <Text
        className={title}
        as="h1"
        variant={{ size: "2xl-title", weight: "bold", color: "foreground" }}
      >
        Shopping cart
      </Text>
      <EmptyShoppingCart />
      <ItemList />
      <ShoppingCartSummary />
    </div>
  );
}
