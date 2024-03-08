import { useEffect, useState } from "react";
import { useIsLoggedIn } from "./use-is-logged-in";
import { useSlashID } from "@slashid/react";

const DISCOUNT_RATES = {
  DIRECT_ID: 10,
  PER_BOOKING: 5,
  THRESHOLD: 25,
};

function calculateDiscount(nOfBookings: number, applyDirectID: boolean) {
  let discount = Math.min(
    nOfBookings * DISCOUNT_RATES.PER_BOOKING,
    DISCOUNT_RATES.THRESHOLD
  );
  const reasons = nOfBookings > 0 ? [`Past bookings: ${discount}%`] : [];

  if (applyDirectID) {
    discount += DISCOUNT_RATES.DIRECT_ID;
    reasons.push(`Promo: ${DISCOUNT_RATES.DIRECT_ID}%`);
  }

  return { value: discount, reasons };
}

type PastBookingsAttribute = {
  pastBookings: number;
};

export function useDiscount() {
  const [status, setStatus] = useState<"initial" | "loading" | "ready">(
    "initial"
  );
  const [discount, setDiscount] = useState<{
    value: number;
    reasons: string[];
  }>({ value: 0, reasons: [] });
  const { isLoggedIn, isLoggedInWithDirectID } = useIsLoggedIn();
  const { user } = useSlashID();

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    async function fetchDiscount() {
      setStatus("loading");
      try {
        const bucket = user?.getBucket();
        const pastBookingsAttribute =
          await bucket?.get<PastBookingsAttribute>();
        const nOfBookings =
          pastBookingsAttribute &&
          pastBookingsAttribute.hasOwnProperty("pastBookings")
            ? pastBookingsAttribute["pastBookings"]
            : 0;

        setDiscount(calculateDiscount(nOfBookings, isLoggedInWithDirectID));
      } catch (error) {
        console.error(error);
      } finally {
        setStatus("ready");
      }
    }

    fetchDiscount();
  }, [isLoggedIn, isLoggedInWithDirectID, user]);

  if (!isLoggedIn) {
    return { value: 0, reasons: [], status: "ready" };
  }

  return { ...discount, status };
}
