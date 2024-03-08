import { Button, Form, Text } from "@slashid/ui";
import { useState } from "react";
import { form, formFooter, submitButton } from "./style.css";

export function EmailForm() {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await fetch("/api/fallback", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email,
      })
    }).then(response => {
      if (!response.ok) {
        setIsSent(false);
        setIsError(true);
      } else {
        setIsSent(true);
        setIsError(false);
      }
    })

    setIsLoading(false)
  }

  const showForm = !isSent;

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
              loading={isLoading}
            >
              Submit
            </Button>
          }
          footerClassName={formFooter}
        />
      )}
      {isSent && (
        <Text variant={{ size: "base", weight: "semibold", color: "foreground" }}>
          Please check your email.
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
