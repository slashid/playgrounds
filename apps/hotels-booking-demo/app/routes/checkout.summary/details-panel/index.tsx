import { Text } from "@slashid/ui";
import { DETAILS_PATH, PAYMENT_PATH } from "~/domain/paths";
import { useOptimisticPaymentDetails } from "~/hooks/use-optimistic-payment-details";
import Panel from "../panel";
import * as styles from "./style.css";
import { useOptimisticCurrentBooking } from "~/hooks/use-optimistic-current-booking";
import { useOptimisticDates } from "~/hooks/use-optimistic-dates";
import ItemCard from "~/routes/_index/item-card";
import dayjs from "dayjs";

export default function DetailsPanel() {
  const booking = useOptimisticCurrentBooking();
  const dates = useOptimisticDates();

  return (
    <Panel pathname={DETAILS_PATH}>
      <Text variant={{ size: "xs", weight: "semibold", color: "secondary" }}>
        Booking details
      </Text>
      <div
        style={{
          display: "flex",
          gap: "32px",
        }}
      >
        <div style={{ maxWidth: 150 }}>
          <ItemCard
            product={booking}
            isSelected={false}
            resetSelection={() => {}}
          />
        </div>

        <div>
          <Text variant={{ weight: "bold", color: "foreground" }}>
            {booking.name}
          </Text>
          <Text as="div" variant={{ weight: "semibold", color: "secondary" }}>
            <div className={styles.details}>
              {dayjs(dates.checkIn).format("DD/MM/YYYY")} -{" "}
              {dayjs(dates.checkOut).format("DD/MM/YYYY")}
            </div>
          </Text>
        </div>
      </div>
    </Panel>
  );
}
