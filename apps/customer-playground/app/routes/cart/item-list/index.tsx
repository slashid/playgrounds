import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { isFalsy } from "~/utils/utils";
import ItemCard from "../item-card";
import { itemList } from "./style.css";

function ItemList() {
  const cartItems = useOptimisticCartItems();

  if (isFalsy(cartItems)) return null;

  return (
    <div className={itemList}>
      {cartItems.map((cartItem) => (
        <ItemCard key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
}

export default ItemList;
