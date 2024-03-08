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

export function ShippingForm() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { nextNestedPathname } = useNavPaths();

  const actionLog = useOptimisticActionLogData();
  const shippingDetails = useOptimisticShippingDetails();
  const [shippingDetailsFormData, setShippingDetailsFormData] = useState(
    shippingDetails || getEmptyShippingDetails()
  );
  const [key, setKey] = useState("");

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
    if (isEqual(shippingDetailsFormData, shippingDetails)) {
      // prevent form submission if no changes were made
      navigate(nextNestedPathname);
      event.preventDefault();
      return;
    }

    const updatedShippingDetails = mapFormDataToShippingDetails(
      new FormData(event.currentTarget)
    );

    fetcher.submit(
      {
        shippingDetails: stringify(updatedShippingDetails),
        actionLog: stringify(
          appendToActionLog(actionLog, Action.SHIPPING_DETAILS_UPDATED)
        ),
        redirectTo: nextNestedPathname,
      },
      { action: UPDATE_SHIPPING_API_PATH, method: "post" }
    );
    event.preventDefault();
  };

  const handleFillForm = () => {
    setShippingDetailsFormData(getDummyShippingDetails());
    // TODO: revisit this, forces a re-render to update form fields validation state
    setKey(uuid());
  };

  usePubSub(EventName.FILL_CHECKOUT_FORM, handleFillForm);

  return (
    <Form
      key={key}
      onSubmit={handleSubmit}
      onFieldValueChange={handleFieldValueChange}
      fields={mapShippingDetailsToFormFields(shippingDetailsFormData)}
      submitButton={<NextButton loading={fetcher.state !== "idle"} />}
      backButton={<BackButton />}
      footerClassName={formFooter}
    />
  );
}
