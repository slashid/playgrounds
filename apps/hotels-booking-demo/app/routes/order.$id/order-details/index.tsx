import { Text } from "@slashid/ui";
import { formatOrderSubtotal } from "~/domain/user/user";
import { formatDate } from "~/utils/date";
import { useOrder } from "../use-order";
import { table, wrapper } from "./style.css";

export default function OrderDetails() {
  const { id, date, status, deliveryDate, subtotal } = useOrder();

  return (
    <div className={wrapper}>
      <Text variant={{ weight: "semibold", color: "secondary" }}>
        Order details
      </Text>
      <div className={table}>
        <Text variant={{ weight: "semibold", color: "secondary" }}>Date</Text>
        <Text variant={{ weight: "semibold", color: "secondary" }}>
          Order ID
        </Text>
        <Text variant={{ weight: "semibold", color: "secondary" }}>Status</Text>
        <Text variant={{ weight: "semibold", color: "secondary" }}>
          Delivery
        </Text>
        <Text variant={{ weight: "semibold", color: "secondary" }}>Total</Text>

        <Text variant={{ weight: "semibold", color: "foreground" }}>
          {formatDate(date)}
        </Text>
        <Text variant={{ weight: "semibold", color: "foreground" }}>{id}</Text>
        <Text variant={{ weight: "semibold", color: "foreground" }}>
          {status}
        </Text>
        <Text variant={{ weight: "semibold", color: "foreground" }}>
          {formatDate(deliveryDate)}
        </Text>
        <Text variant={{ weight: "semibold", color: "foreground" }}>
          {formatOrderSubtotal(subtotal)}
        </Text>
      </div>
    </div>
  );
}
