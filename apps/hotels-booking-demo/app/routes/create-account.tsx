import { useLoaderData, useSubmit } from "@remix-run/react";
import { useSlashID } from "@slashid/react";
import { Text } from "@slashid/ui";
import type { LoaderArgs, TypedResponse } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { useCallback, useEffect } from "react";
import { LOGIN_PATH } from "~/domain/paths";
import { Action, DefaultBucketName } from "~/domain/user/constants";
import { getCurrentParam, safeRedirect } from "~/utils/utils";

export const config = { runtime: "edge" };

type CreateAccountLoaderData = {
  email: string;
};

type LoaderResponseData = Promise<TypedResponse<CreateAccountLoaderData | {}>>;

export async function loader({ request }: LoaderArgs): LoaderResponseData {
  const email = getCurrentParam(request, "email");
  if (!email) {
    return redirect("/");
  }

  return json({ email });
}

export default function DirectIdPage() {
  const { logIn } = useSlashID();
  const submit = useSubmit();
  const { email } = useLoaderData<CreateAccountLoaderData>();
  const createAccount = useCallback(
    async function () {
      if (email) {
        const user = await logIn({
          handle: {
            type: "email_address",
            value: decodeURIComponent(email),
          },
          factor: { method: "email_link" },
        });
        if (user) {
          const bucket = user.getBucket(DefaultBucketName.end_user_read_write);
          const attributes = await bucket.get();
          const pastBookings = attributes.pastBookings
            ? Number(attributes.pastBookings)
            : 0;
          await bucket.set({
            pastBookings: pastBookings + 1,
            playgroundEmail: email,
          });

          submit(
            {
              token: user?.token,
              redirectTo: "/",
              actionType: user.firstLogin ? Action.SIGN_UP : Action.SIGN_IN,
            },
            { action: LOGIN_PATH, method: "post", replace: true }
          );
        }
      }
    },
    [email, logIn, submit]
  );

  useEffect(() => {
    createAccount();
  }, [createAccount]);

  return (
    <Text
      as="h1"
      variant={{ size: "2xl-title", weight: "bold", color: "foreground" }}
    >
      We have sent an email with magic link to {decodeURIComponent(email)} -
      please use it to create your account.
    </Text>
  );
}
