import { Text } from "@slashid/ui";
import clsx from "clsx";
import { formatSubtotal } from "~/domain/user/user";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { useOptimisticShoppingCartSubtotal } from "~/hooks/use-optimistic-shopping-cart-subtotal";
import { isFalsy } from "~/utils/utils";
import { rightCol, summary, summaryTable } from "./style.css";
import { useOptimisticCurrentBooking } from "~/hooks/use-optimistic-current-booking";
import { useOptimisticDates } from "~/hooks/use-optimistic-dates";
import dayjs from "dayjs";
import { useDiscount } from "~/hooks/use-discount";
import { useMemo } from "react";

interface Props {
  header: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function CartSummary({ header, footer, className }: Props) {
  const cartItems = useOptimisticCartItems();
  const currentBooking = useOptimisticCurrentBooking();
  const dates = useOptimisticDates();
  const discount = useDiscount();
  const subtotal = currentBooking.price.amount;
  const total = useMemo(() => {
    let amount = dates
      ? dayjs(dates.checkOut).diff(dates.checkIn, "days") * subtotal
      : 0;

    if (discount.status === "ready" && discount.value !== 0) {
      amount = amount - (amount * discount.value) / 100;
    }

    return amount;
  }, [dates, discount.status, discount.value, subtotal]);

  if (isFalsy(currentBooking)) return null;

  return (
    <div className={clsx(summary, className)}>
      <Text
        variant={{
          size: "xl",
          weight: "semibold",
          color: "foreground",
        }}
      >
        {header}
      </Text>
      <div className={summaryTable}>
        <Text
          variant={{
            weight: "semibold",
            color: "secondary",
          }}
        >
          Room
        </Text>
        <Text
          className={rightCol}
          variant={{
            weight: "semibold",
            color: "foreground",
          }}
        >
          {currentBooking.name}
        </Text>
        <Text
          variant={{
            weight: "semibold",
            color: "secondary",
          }}
        >
          Price per night
        </Text>
        <Text
          className={rightCol}
          variant={{
            weight: "semibold",
            color: "foreground",
          }}
        >
          {formatSubtotal(subtotal)}
        </Text>
        {dates ? (
          <>
            <Text
              variant={{
                weight: "semibold",
                color: "secondary",
              }}
            >
              Nights
            </Text>
            <Text
              className={rightCol}
              variant={{
                weight: "semibold",
                color: "foreground",
              }}
            >
              {dayjs(dates.checkOut).diff(dates.checkIn, "days")}
            </Text>
          </>
        ) : null}
        {discount.status === "ready" && discount.value !== 0 ? (
          <>
            <>
              <Text
                variant={{
                  weight: "semibold",
                  color: "secondary",
                }}
              >
                Discount
              </Text>
              <Text
                className={rightCol}
                variant={{
                  weight: "semibold",
                  color: "foreground",
                }}
              >
                {`${discount.value}%`}
              </Text>
            </>
          </>
        ) : null}
        {total ? (
          <>
            <>
              <Text
                variant={{
                  weight: "semibold",
                  color: "secondary",
                }}
              >
                Total
              </Text>
              <Text
                className={rightCol}
                variant={{
                  weight: "semibold",
                  color: "foreground",
                }}
              >
                {formatSubtotal(total)}
              </Text>
            </>
          </>
        ) : null}
      </div>
      {footer}
    </div>
  );
}
