import { Text, Toast } from "@slashid/ui";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { toastContainer } from "./style.css";
import { useAtomValue } from "jotai";
import { toastAtom } from "../../atoms";

export default function ToastContainer() {
  const [key, setKey] = useState("");
  const toast = useAtomValue(toastAtom);

  useEffect(() => {
    if (!toast) return;

    setKey(uuid());
  }, [toast]);

  return (
    <div className={toastContainer}>
      {!!toast && (
        <Toast
          key={key}
          type={toast.type}
          title={
            <Text
              variant={{
                size: "sm",
                weight: "medium",
                color: "foreground",
              }}
            >
              {toast.message}
            </Text>
          }
        />
      )}
    </div>
  );
}
