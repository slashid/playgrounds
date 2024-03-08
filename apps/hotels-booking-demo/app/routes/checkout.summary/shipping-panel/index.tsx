import { Text } from "@slashid/ui";
import { SHIPPING_PATH } from "~/domain/paths";
import { useOptimisticShippingDetails } from "~/hooks/use-optimistic-shipping-details";
import Panel from "../panel";
import { content, address } from "./style.css";

export default function ShippingPanel() {
  const { firstName, lastName, addressLine1, addressLine2 } =
    useOptimisticShippingDetails();

  return (
    <Panel pathname={SHIPPING_PATH}>
      <div className={content}>
        <Text variant={{ size: "xs", weight: "semibold", color: "secondary" }}>
          Shipping
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
    </Panel>
  );
}
