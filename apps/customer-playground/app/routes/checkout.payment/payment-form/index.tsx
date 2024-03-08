import { useFetcher, useNavigate } from "@remix-run/react";
import { Form } from "@slashid/ui";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { UPDATE_PAYMENT_API_PATH } from "~/domain/paths";
import { Action } from "~/domain/user/constants";
import {
  appendToActionLog,
  getDefaultPaymentDetails,
  getDummyPaymentDetails,
} from "~/domain/user/user";
import { useOptimisticActionLogData } from "~/hooks/use-optimistic-action-log-data";
import { useOptimisticPaymentDetails } from "~/hooks/use-optimistic-payment-details";
import { useOptimisticShippingDetails } from "~/hooks/use-optimistic-shipping-details";
import { EventName, usePubSub } from "~/hooks/use-pub-sub";
import { BackButton, NextButton } from "~/routes/checkout/nav-buttons";
import { useNavPaths } from "~/routes/checkout/use-nav-paths";
import { isEqual, stringify } from "~/utils/utils";
import { formFooter } from "./style.css";
import {
  mapFormDataToPaymentDetails,
  mapPaymentDetailsToFormFields,
} from "./utils";

export function PaymentForm() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { nextNestedPathname } = useNavPaths();

  const actionLog = useOptimisticActionLogData();
  const paymentDetails = useOptimisticPaymentDetails();
  const shippingDetails = useOptimisticShippingDetails();
  const [paymentDetailsFormData, setPaymentDetailsFormData] = useState(
    paymentDetails || getDefaultPaymentDetails(shippingDetails)
  );
  const [key, setKey] = useState("");

  const handleFieldValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setPaymentDetailsFormData((oldFormData) => ({
      ...oldFormData,
      [fieldName]: event.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    if (isEqual(paymentDetailsFormData, paymentDetails)) {
      // prevent form submission if no changes were made
      navigate(nextNestedPathname);
      event.preventDefault();
      return;
    }

    const updatedPaymentDetails = mapFormDataToPaymentDetails(
      new FormData(event.currentTarget)
    );

    fetcher.submit(
      {
        paymentDetails: stringify(updatedPaymentDetails),
        actionLog: stringify(
          appendToActionLog(actionLog, Action.PAYMENT_DETAILS_UPDATED)
        ),
        redirectTo: nextNestedPathname,
      },
      { action: UPDATE_PAYMENT_API_PATH, method: "post" }
    );
    event.preventDefault();
  };

  const handleFillForm = () => {
    setPaymentDetailsFormData(getDummyPaymentDetails());
    // TODO: revisit this, forces a re-render to update form fields validation state
    setKey(uuid());
  };

  usePubSub(EventName.FILL_CHECKOUT_FORM, handleFillForm);

  return (
    <Form
      key={key}
      onSubmit={handleSubmit}
      onFieldValueChange={handleFieldValueChange}
      fields={mapPaymentDetailsToFormFields(paymentDetailsFormData)}
      submitButton={<NextButton loading={fetcher.state !== "idle"} />}
      backButton={<BackButton />}
      footerClassName={formFooter}
    />
  );
}
