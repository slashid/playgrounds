import { useLoaderData, useSubmit } from "@remix-run/react";
import { useSlashID } from "@slashid/react";
import { Text } from "@slashid/ui";
import type { LoaderArgs, TypedResponse } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { useCallback, useEffect } from "react";
import { LOGIN_PATH } from "~/domain/paths";
import { Action } from "~/domain/user/constants";
import { clearSession, validateToken } from "~/services/session.server";
import { getCurrentParam, safeRedirect } from "~/utils/utils";

export const config = { runtime: "edge" };

type DirectIdLoaderData = {
  redirectTo: string;
};

type LoaderResponseData = Promise<TypedResponse<DirectIdLoaderData | {}>>;

export async function loader({ request }: LoaderArgs): LoaderResponseData {
  const valid = await validateToken(request);
  const redirectTo = safeRedirect(getCurrentParam(request, "redirectTo"));

  if (valid) return redirect(redirectTo);
  return json({ redirectTo, headers: await clearSession(request) });
}

export default function DirectIdPage() {
  const { user } = useSlashID();
  const submit = useSubmit();
  const { redirectTo } = useLoaderData<DirectIdLoaderData>();

  const handleSignIn = useCallback(async () => {
    if (!user?.token) return;

    submit(
      {
        token: user.token,
        redirectTo,
        actionType: Action.SIGN_IN,
      },
      { action: LOGIN_PATH, method: "post", replace: true }
    );
  }, [submit, user?.token, redirectTo]);

  useEffect(() => {
    handleSignIn();
  }, [handleSignIn]);

  return (
    <Text
      as="h1"
      variant={{ size: "2xl-title", weight: "bold", color: "foreground" }}
    >
      We will redirect you in a moment
    </Text>
  );
}
