import { useSearchParams, useSubmit } from "@remix-run/react";
import { ConfigurationProvider, Form } from "@slashid/react";
import { User } from "@slashid/slashid";
import type { ActionArgs, LoaderArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH, LOGIN_PATH } from "~/domain/paths";
import { Action } from "~/domain/user/constants";
import { getEnvValue } from "~/services/environment-variables";
import {
  clearSession,
  createUserSession,
  handleActionError,
  handleFailure,
  validateToken,
} from "~/services/session.server";
import { getRedirectToFromForm, getRedirectToFromParams } from "~/utils/utils";
import { container, formWrapper } from "./style.css";
import { ThemeRoot } from "@slashid/ui";
import { useCallback } from "react";

export const config = { runtime: "edge" };

export async function loader({ request }: LoaderArgs) {
  const valid = await validateToken(request);

  if (valid) return redirect(HOME_PATH);
  return json({ headers: await clearSession(request) });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const token = formData.get("token") as string;
  const redirectTo = getRedirectToFromForm(formData);

  if (!token) return handleFailure(request);

  try {
    /* const user = getUser(token);
    const userHandle = await getUserHandle(user);
    const userId = user.ID;
    const attributes = await getUserAttributes(token, request);
    // const actionLog = getActionLog(attributes);

    // identifyUserInSentry(userId);
    await updatePlaygroundEmail(token, userHandle);
    handleLoginSuccess(token, null, actionType); */

    return createUserSession({ request, token, redirectTo });
  } catch (error) {
    return handleActionError(request, error, redirectTo);
  }
}

export default function LoginPage() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  const handleSuccess = useCallback(
    async ({ token, firstLogin }: User) => {
      submit(
        {
          token,
          redirectTo: getRedirectToFromParams(searchParams),
          actionType: firstLogin ? Action.SIGN_UP : Action.SIGN_IN,
        },
        { action: LOGIN_PATH, method: "post", replace: true }
      );
    },
    [searchParams, submit]
  );

  return (
    <ConfigurationProvider
      factors={[
        { method: "email_link" },
        { method: "webauthn" },
        { method: "otp_via_email" },
        { method: "otp_via_sms" },
        {
          method: "oidc",
          options: {
            client_id: getEnvValue("SLASHID_OIDC_CLIENT_ID"),
            provider: "google",
            ux_mode: "popup",
          },
        },
      ]}
      text={{
        "initial.title": "Welcome to SlashId Store",
        "initial.handle.phone.email": "Type your email address",
        "authenticating.retryPrompt": "Didn’t receive the link?",
        "authenticating.retry": "Resend",
        "success.subtitle": "You will be redirected shortly.",
      }}
      storeLastHandle
    >
      <ThemeRoot theme="light">
        <div className={container}>
          <div className={formWrapper}>
            <Form onSuccess={handleSuccess} />
          </div>
        </div>
      </ThemeRoot>
    </ConfigurationProvider>
  );
}
