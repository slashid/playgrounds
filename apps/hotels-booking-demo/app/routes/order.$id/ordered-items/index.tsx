import { Text } from "@slashid/ui";
import ItemCard from "~/components/item-card";
import { useOrder } from "../use-order";
import { items, wrapper } from "./style.css";

export default function OrderedItems() {
  const { cartItems } = useOrder();

  return (
    <div className={wrapper}>
      <Text variant={{ weight: "semibold", color: "secondary" }}>
        Your ordered items
      </Text>
      <div className={items}>
        {cartItems.map((cartItem) => (
          <ItemCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
    </div>
  );
}
