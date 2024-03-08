import { useFetcher } from "@remix-run/react";
import { Button, Email, Panel, Text } from "@slashid/ui";
import { useEffect, useState } from "react";
import { ABANDONED_CART_API_PATH, ROOT_ROUTE_ID } from "~/domain/paths";
import type { TokenLoaderData } from "~/domain/user/types";
import { usePlaygroundEmail } from "~/hooks/use-playground-email";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";
import { abandonedCartFlowPanel, panel } from "./style.css";

const AbandonedCartFlowPanel = () => {
  const fetcher = useFetcher();
  const playgroundEmail = usePlaygroundEmail();
  const { token } = useRouteLoaderData<TokenLoaderData>(ROOT_ROUTE_ID);

  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleClick = async () => {
    setIsSent(true);
    fetcher.submit(
      {
        to: playgroundEmail,
        token,
      },
      { action: ABANDONED_CART_API_PATH, method: "post" }
    );
  };

  const showButton = !isSent && !isError;

  useEffect(() => {
    if (fetcher.state !== "loading") return;

    const emailIsSent = !!fetcher.data?.emailIsSent;

    setIsSent(emailIsSent);
    setIsError(!emailIsSent);
  }, [fetcher]);

  return (
    <Panel
      className={panel}
      title="Abandoned cart flow"
      icon={<Email />}
      content={
        <div className={abandonedCartFlowPanel}>
          <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
            Customers will get an email after x hours with a link that allows
            them to automatically log in and finish their checkout.
          </Text>
          {showButton && (
            <div style={{ width: "max-content" }}>
              <Button variant="primarySmall" onClick={handleClick}>
                Test now
              </Button>
            </div>
          )}
          {isSent && (
            <Text
              variant={{ size: "sm", weight: "semibold", color: "foreground" }}
            >
              Please, check your email.
            </Text>
          )}
          {isError && (
            <Text variant={{ size: "sm", weight: "semibold", color: "error" }}>
              Something went wrong. Please try again.
            </Text>
          )}
        </div>
      }
    />
  );
};

export default AbandonedCartFlowPanel;
