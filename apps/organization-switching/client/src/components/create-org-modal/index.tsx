import { useSlashID } from "@slashid/react";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { Modal } from "@mui/material";
import { Text, Form, Button, ThemeRoot } from "@slashid/ui";
import { button, heading, modal } from "./styles.css";
import { toastAtom } from "../../atoms";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateOrgModal = ({ open, onClose }: Props) => {
  const { user } = useSlashID();
  const setToast = useSetAtom(toastAtom);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const postOrg = useCallback(
    async (name: string) => {
      if (!user) return;

      const headers: HeadersInit = {
        authorization: `Bearer ${user.token}`,
        "content-type": "application/json",
      };

      const body: BodyInit = JSON.stringify({
        name,
      });

      const init: RequestInit = {
        method: "POST",
        headers,
        body,
      };

      await fetch("/api/org", init).then(async (response) => {
        if (!response.ok) throw await response.json();
        return response.json();
      });
    },
    [user]
  );

  const createOrg: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      setLoading(true);

      try {
        await postOrg(name);

        setToast({
          type: "success",
          message: `${name} was created`,
        });
        onClose();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setToast({
          type: "error",
          message: error.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [name, postOrg, setToast, onClose]
  );

  const handleFieldValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const fields = [
    {
      value: name,
      name: "name",
      type: "text",
      label: "Organization name",
      placeholder: "",
      fullWidth: true,
      valueMissingMsg: "Please enter an organization name",
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      container={() => document.getElementById("content")}
    >
      <ThemeRoot theme="light">
        <div className={modal}>
          <Text
            as="h1"
            variant={{
              size: "2xl-title",
              weight: "semibold",
              color: "foreground",
            }}
            className={heading}
          >
            New Organization
          </Text>
          <Form
            onSubmit={createOrg}
            onFieldValueChange={handleFieldValueChange}
            fields={fields}
            submitButton={
              <Button as="span" loading={loading} className={button}>
                Create
              </Button>
            }
          />
        </div>
      </ThemeRoot>
    </Modal>
  );
};
