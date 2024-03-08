import { useFetcher } from "@remix-run/react";
import { Button, Form } from "@slashid/ui";
import { useState } from "react";
import { UPDATE_MFA_THRESHOLD_API_PATH } from "~/domain/paths";
import { Action } from "~/domain/user/constants";
import { appendToActionLog } from "~/domain/user/user";
import { useOptimisticActionLogData } from "~/hooks/use-optimistic-action-log-data";
import { useOptimisticMfaThreshold } from "~/hooks/use-optimistic-mfa-threshold";
import { stringify } from "~/utils/utils";
import { form, submitButton } from "./style.css";
import { getFormFields } from "./utils";

export function MfaForm() {
  const fetcher = useFetcher();
  const actionLog = useOptimisticActionLogData();
  const mfaThreshold = useOptimisticMfaThreshold();
  const [mfaThresholdFormValue, setMfaThresholdFormValue] = useState(
    mfaThreshold.toString()
  );

  const handleFieldValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMfaThresholdFormValue(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    fetcher.submit(
      {
        mfaThreshold: mfaThresholdFormValue,
        actionLog: stringify(
          appendToActionLog(actionLog, Action.MFA_THRESHOLD_UPDATED)
        ),
      },
      { action: UPDATE_MFA_THRESHOLD_API_PATH, method: "post" }
    );
    event.preventDefault();
  };

  return (
    <Form
      className={form}
      onSubmit={handleSubmit}
      onFieldValueChange={handleFieldValueChange}
      fields={getFormFields(mfaThresholdFormValue)}
      submitButton={
        <Button
          as="span"
          variant="primarySmall"
          loading={fetcher.state !== "idle"}
          className={submitButton}
        >
          Submit
        </Button>
      }
    />
  );
}
