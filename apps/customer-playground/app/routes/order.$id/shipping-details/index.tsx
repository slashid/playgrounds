import { Text } from "@slashid/ui";
import { useOrder } from "../use-order";
import { address, content } from "./style.css";

export default function ShippingDetails() {
  const {
    shippingDetails: { firstName, lastName, addressLine1, addressLine2 },
  } = useOrder();

  return (
    <div className={content}>
      <Text variant={{ size: "xs", weight: "semibold", color: "secondary" }}>
        Delivery to
      </Text>
      <Text variant={{ weight: "bold", color: "foreground" }}>
        {firstName} {lastName}
      </Text>
      <Text
        className={address}
        variant={{ weight: "semibold", color: "secondary" }}
      >
        {addressLine1}
        {addressLine2 ? `, ${addressLine2}` : ""}
      </Text>
    </div>
  );
}
