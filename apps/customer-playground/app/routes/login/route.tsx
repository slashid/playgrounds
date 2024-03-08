import { useSearchParams, useSubmit } from "@remix-run/react";
import { ConfigurationProvider, Form } from "@slashid/react";
import { type User } from "@slashid/slashid";
import type { ActionArgs, LoaderArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH, LOGIN_PATH } from "~/domain/paths";
import { Action } from "~/domain/user/constants";
import type { ActionType } from "~/domain/user/types";
import {
  getActionLog,
  getUser,
  getUserAttributes,
  getUserHandle,
  handleLoginSuccess,
  updatePlaygroundEmail,
} from "~/domain/user/user";
import { getEnvValue } from "~/services/environment-variables";
import { identifyUserInSentry } from "~/services/sentry";
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
import { useContext } from "react";
import { CustomisationContext } from "~/context/customisation";

export const config = { runtime: "edge" };

export async function loader({ request }: LoaderArgs) {
  const valid = await validateToken(request);

  if (valid) return redirect(HOME_PATH);
  return json({ headers: await clearSession(request) });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const token = formData.get("token") as string;
  const actionType = formData.get("actionType") as ActionType;
  const redirectTo = getRedirectToFromForm(formData);

  if (!token) return handleFailure(request);

  try {
    const user = getUser(token);
    const userHandle = await getUserHandle(user);
    const userId = user.ID;
    const attributes = await getUserAttributes(token);
    const actionLog = getActionLog(attributes);

    identifyUserInSentry(userId);
    await updatePlaygroundEmail(token, userHandle);
    handleLoginSuccess(token, actionLog, actionType);

    return createUserSession({ request, token, redirectTo });
  } catch (error) {
    return handleActionError(request, error, redirectTo);
  }
}

export default function LoginPage() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const { values } = useContext(CustomisationContext);

  const handleSuccess = async ({ token, firstLogin }: User) => {
    submit(
      {
        token,
        redirectTo: getRedirectToFromParams(searchParams),
        actionType: firstLogin ? Action.SIGN_UP : Action.SIGN_IN,
      },
      { action: LOGIN_PATH, method: "post", replace: true }
    );
  };

  return (
    <ConfigurationProvider
      factors={[
        { method: "email_link" },
        { method: "webauthn" },
        { method: "otp_via_email" },
        { method: "otp_via_sms" },
        { method: "password" },
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
        "initial.title": values.title,
        "initial.subtitle": values.subtitle,
        "initial.submit": values.buttonText,
        "initial.handle.phone.email": "Type your email address",
        "authenticating.retryPrompt": "Didn’t receive the link?",
        "authenticating.retry": "Resend",
        "success.subtitle": "You will be redirected shortly.",
      }}
      storeLastHandle
      logo={values.logoURL}
    >
      <ThemeRoot theme="light">
        <div className={container}>
          <div id="form-wrapper" className={formWrapper}>
            <Form onSuccess={handleSuccess} />
          </div>
        </div>
      </ThemeRoot>
    </ConfigurationProvider>
  );
}
