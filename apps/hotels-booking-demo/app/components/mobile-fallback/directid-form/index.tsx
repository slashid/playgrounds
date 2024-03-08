import { useFetcher } from "@remix-run/react";
import { Button, Form, Text } from "@slashid/ui";
import { useEffect, useState } from "react";
import { MOBILE_FALLBACK_DIRECT_ID_PATH } from "~/domain/paths";
import { form, formFooter, submitButton } from "./style.css";

export function DirectIDForm() {
  const fetcher = useFetcher();

  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleFieldValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    setIsSent(true);
    fetcher.submit(
      {
        to: email,
      },
      { action: MOBILE_FALLBACK_DIRECT_ID_PATH, method: "post" }
    );
    event.preventDefault();
  };

  const showForm = !isSent && !isError;

  useEffect(() => {
    if (fetcher.state !== "loading") return;

    const emailIsSent = !!fetcher.data?.emailIsSent;

    setIsSent(emailIsSent);
    setIsError(!emailIsSent);
  }, [fetcher]);

  return (
    <>
      {showForm && (
        <Form
          className={form}
          onSubmit={handleSubmit}
          onFieldValueChange={handleFieldValueChange}
          fields={[
            {
              value: email,
              name: "email",
              type: "email",
              label: "email",
              showLabel: false,
              placeholder: "Email",
            },
          ]}
          submitButton={
            <Button
              as="span"
              variant="primarySmall"
              className={submitButton}
              loading={fetcher.state !== "idle"}
            >
              Submit
            </Button>
          }
          footerClassName={formFooter}
        />
      )}
      {isSent && (
        <Text variant={{ size: "sm", weight: "semibold", color: "foreground" }}>
          Please, check your email.
        </Text>
      )}
      {isError && (
        <Text variant={{ size: "sm", weight: "semibold", color: "error" }}>
          Something went wrong. Please try again.
        </Text>
      )}
    </>
  );
}
