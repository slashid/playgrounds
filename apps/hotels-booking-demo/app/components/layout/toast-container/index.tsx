import { Text, Toast } from "@slashid/ui";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { ROOT_ROUTE_ID } from "~/domain/paths";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";
import { captureException } from "~/services/sentry";
import type { ToastMessage } from "~/services/session.server";
import { toastContainer } from "./style.css";

export default function ToastContainer() {
  const [key, setKey] = useState("");
  const { toastMessage } = useRouteLoaderData<{ toastMessage: ToastMessage }>(
    ROOT_ROUTE_ID
  );

  useEffect(() => {
    if (!toastMessage) return;

    setKey(uuid());
    if (toastMessage.type === "error") {
      captureException(new Error(toastMessage.message));
    }
  }, [toastMessage]);

  return (
    <div className={toastContainer}>
      {!!toastMessage && (
        <Toast
          key={key}
          type={toastMessage.type}
          title={
            <Text
              variant={{
                size: "sm",
                weight: "medium",
                color: "foreground",
              }}
            >
              {toastMessage.message}
            </Text>
          }
        />
      )}
    </div>
  );
}
