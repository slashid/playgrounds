import ItemCard from "~/components/item-card";
import { CART_PATH } from "~/domain/paths";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import Panel from "../panel";
import { content, item } from "./style.css";

export default function ShoppingCartPanel() {
  const cartItems = useOptimisticCartItems();

  return (
    <Panel pathname={CART_PATH}>
      <div className={content}>
        {cartItems.map((cartItem) => (
          <div key={cartItem.id} className={item}>
            <ItemCard cartItem={cartItem} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
