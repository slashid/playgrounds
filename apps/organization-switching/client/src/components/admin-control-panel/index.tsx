import { useCallback, useState } from "react";
import { useSlashID } from "@slashid/react";
import { useSetAtom } from "jotai";
import { Form, Text, Button, AlertCircle } from "@slashid/ui";
import { alertText, button } from "./styles.css";
import { toastAtom } from "../../atoms";

export const AdminControlPanel = ({
  className = "",
}: {
  className?: string;
}) => {
  const { user } = useSlashID();
  const setToast = useSetAtom(toastAtom);
  const [loading, setLoading] = useState(false);
  const [handle, setHandle] = useState("");

  const addEditor = useCallback(
    async (handle: string) => {
      if (!user) return;

      const headers: HeadersInit = {
        authorization: `Bearer ${user.token}`,
        "content-type": "application/json",
      };

      const body: BodyInit = JSON.stringify({
        handle,
      });

      const init: RequestInit = {
        method: "POST",
        headers,
        body,
      };

      await fetch("/api/editor", init).then(async (response) => {
        if (!response.ok) throw await response.json();
        return response.json();
      });
    },
    [user]
  );

  const inviteEditor: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      setLoading(true);

      try {
        await addEditor(handle);

        setToast({
          type: "success",
          message: `${handle} was invited as collaborator`,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        setToast({
          type: "error",
          message: error.message,
        });
      } finally {
        setHandle("");
        setLoading(false);
      }
    },
    [addEditor, handle, setToast]
  );

  const handleFieldValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHandle(event.target.value);
  };

  const fields = [
    {
      value: handle,
      name: "handle",
      type: "text",
      label: "Email address",
      placeholder: "",
      fullWidth: false,
      valueMissingMsg: "Please enter an email address",
      match: (value: string) => /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/.test(value),
      patternMismatchMsg: "Please enter a valid email address",
    },
  ];

  return (
    <div className={className}>
      <Text
        as="h2"
        variant={{
          size: "xl",
          weight: "semibold",
          color: "foreground",
        }}
      >
        Invite collaborator
      </Text>
      <div className={alertText}>
        <AlertCircle />
        <Text
          as="h3"
          variant={{
            size: "sm",
            color: "secondary",
          }}
        >
          You can see this because you're an admin of this organization.
        </Text>
      </div>
      <Form
        onSubmit={inviteEditor}
        onFieldValueChange={handleFieldValueChange}
        fields={fields}
        submitButton={
          <Button as="span" loading={loading} className={button}>
            Invite
          </Button>
        }
      />
    </div>
  );
};
