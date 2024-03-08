import { Text } from "@slashid/ui";
import { PAYMENT_PATH } from "~/domain/paths";
import { useOptimisticPaymentDetails } from "~/hooks/use-optimistic-payment-details";
import Panel from "../panel";
import * as styles from "./style.css";

const hideCardNumber = (cardNumber: string) =>
  `**** **** **** ${cardNumber.slice(-4)}`;

export default function PaymentPanel() {
  const { cardHolderName, cardNumber, expirationDate, cvc } =
    useOptimisticPaymentDetails();

  return (
    <Panel pathname={PAYMENT_PATH}>
      <div className={styles.content}>
        <Text variant={{ size: "xs", weight: "semibold", color: "secondary" }}>
          Payment
        </Text>
        <Text variant={{ weight: "bold", color: "foreground" }}>
          {cardHolderName}
        </Text>
        <Text as="div" variant={{ weight: "semibold", color: "secondary" }}>
          <div className={styles.cardNumber}>{hideCardNumber(cardNumber)}</div>
          <div className={styles.details}>
            <span>{expirationDate}</span>
            <span>{cvc}</span>
          </div>
        </Text>
      </div>
    </Panel>
  );
}
