import { useFetcher, useNavigate } from "@remix-run/react";
import { Form } from "@slashid/ui";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { UPDATE_SHIPPING_API_PATH } from "~/domain/paths";
import { Action } from "~/domain/user/constants";
import {
  appendToActionLog,
  getDummyShippingDetails,
  getEmptyShippingDetails,
} from "~/domain/user/user";
import { useOptimisticActionLogData } from "~/hooks/use-optimistic-action-log-data";
import { useOptimisticShippingDetails } from "~/hooks/use-optimistic-shipping-details";
import { EventName, usePubSub } from "~/hooks/use-pub-sub";
import { BackButton, NextButton } from "~/routes/checkout/nav-buttons";
import { useNavPaths } from "~/routes/checkout/use-nav-paths";
import { isEqual, stringify } from "~/utils/utils";
import { formFooter } from "./style.css";
import {
  mapFormDataToShippingDetails,
  mapShippingDetailsToFormFields,
} from "./utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useOptimisticCurrentBooking } from "~/hooks/use-optimistic-current-booking";
import ItemCard from "../../_index/item-card";
import { formatRoomPrice } from "~/domain/product/product";
import dayjs from "dayjs";
import { useOptimisticDates } from "~/hooks/use-optimistic-dates";

export function DetailsForm() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { nextNestedPathname } = useNavPaths();

  const actionLog = useOptimisticActionLogData();
  const currentBooking = useOptimisticCurrentBooking();
  const dates = useOptimisticDates();
  const shippingDetails = useOptimisticShippingDetails();
  const [shippingDetailsFormData, setShippingDetailsFormData] = useState(
    shippingDetails || getEmptyShippingDetails()
  );
  const [key, setKey] = useState("");
  const [checkIn, setCheckIn] = useState<dayjs.Dayjs | null>(
    dates ? dayjs(dates.checkIn) : dayjs()
  );
  const [checkOut, setCheckOut] = useState<dayjs.Dayjs | null>(
    dates ? dayjs(dates.checkOut) : dayjs().add(3, "day")
  );

  const handleFieldValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setShippingDetailsFormData((oldFormData) => ({
      ...oldFormData,
      [fieldName]: event.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    // if (isEqual(shippingDetailsFormData, shippingDetails)) {
    // prevent form submission if no changes were made
    submit();
    // navigate(nextNestedPathname);
    event.preventDefault();
    // return;
    // }

    const updatedShippingDetails = mapFormDataToShippingDetails(
      new FormData(event.currentTarget)
    );

    // fetcher.submit(
    //   {
    //     shippingDetails: stringify(updatedShippingDetails),
    //     actionLog: stringify(
    //       appendToActionLog(actionLog, Action.SHIPPING_DETAILS_UPDATED)
    //     ),
    //     redirectTo: nextNestedPathname,
    //   },
    //   { action: UPDATE_SHIPPING_API_PATH, method: "post" }
    // );
    event.preventDefault();
  };

  const handleFillForm = () => {
    setShippingDetailsFormData(getDummyShippingDetails());
    // TODO: revisit this, forces a re-render to update form fields validation state
    setKey(uuid());
  };

  const submit = async () => {
    fetcher.submit(
      {
        currentBooking: stringify(currentBooking),
        dates: stringify({
          checkIn: checkIn?.toISOString(),
          checkOut: checkOut?.toISOString(),
        }),
        redirectTo: nextNestedPathname,
      },
      { action: "/update-dates", method: "post" }
    );
  };

  usePubSub(EventName.FILL_CHECKOUT_FORM, handleFillForm);

  return (
    <>
      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
        <div
          style={{
            maxWidth: 250,
          }}
        >
          {currentBooking && (
            <ItemCard
              product={currentBooking}
              isSelected={false}
              resetSelection={() => {}}
            />
          )}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              marginBottom: "16px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Check in"
                value={checkIn}
                onChange={(v) => setCheckIn(v)}
                maxDate={checkOut ? checkOut.subtract(1, "day") : undefined}
              />{" "}
              -{" "}
              <DatePicker
                label="Check out"
                value={checkOut}
                onChange={(v) => setCheckOut(v)}
                minDate={checkIn ? checkIn.add(1, "day") : undefined}
              />
            </LocalizationProvider>
          </div>
          <h3>{currentBooking?.name}</h3>
          <p>{currentBooking && formatRoomPrice(currentBooking)}</p>
          {checkIn && checkOut ? (
            <>
              <p>{checkOut.diff(checkIn, "days")} nights</p>
              <p>
                ${checkOut.diff(checkIn, "days") * currentBooking.price.amount}{" "}
                total{" "}
              </p>
            </>
          ) : null}
        </div>
      </div>
      <Form
        key={key}
        onSubmit={handleSubmit}
        onFieldValueChange={handleFieldValueChange}
        fields={[]}
        submitButton={<NextButton loading={fetcher.state !== "idle"} />}
        backButton={<BackButton />}
        footerClassName={formFooter}
      />
    </>
  );
}
